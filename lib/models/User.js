const pool = require('../utils/pool');
const Role = require('./Role');
// const bcrypt = require('bcryptjs');

module.exports = class User {
    id;
    email;
    passwordHash;
    role;

    constructor(row) {
        this.id = row.id
        this.email = row.email
        this.passwordHash = row.password_hash
        this.role = row.role;
    }

    static async insert({ email, passwordHash, roleTitle}) {
        const rock = await Role.findByTitle(roleTitle)

        const { rows } = await pool.query(
            'INSERT INTO users (email, password_hash, role.id) VALUES ($1, $2) RETURNING *',
            [email, passwordHash, rock.id]
        );
        // console.log('AT INSERT', new User(rows[0]) )
        return new User({...rows[0], role: rock.title})
    }

    static async findEmails(email) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]);

        if(!rows[0]) return null;
        return new User({...rows[0], role: rock.title});
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE id= $1', 
            [id]);
            if(!rows[0]) return null;
            return new User(rows[0]);
    }

    toJSON() {
        return {
          id: this.id,
          email: this.email,
        };
      }
}