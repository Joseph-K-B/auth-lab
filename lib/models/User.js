const pool = require('../utils/pool');
const bcrypt = require('bcryptjs');

module.exports = class User {
    id;
    email;
    passwordHash;

    constructor(row) {
        this.id = row.id
        this.email = row.email
        this.passwordHash = row.password_hash
    }

    static async insert({ email, passwordHash}) {

        const { rows } = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
            [email, passwordHash]
        );
        return new User(rows[0])
    }

    static async findEmails(email) {
        const { rows } = await pool.query('SELECT * FROM urers WHERE email=$1', [email])

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