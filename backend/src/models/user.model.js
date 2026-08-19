import db from "../config/database.js";

const userModel = {
  async findAll() {
    const result = await db.query(
      `SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, name, email, role, created_at FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
  },

  async create({ name, email, password, role }) {
    const result = await db.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role]
    );
    return result.rows[0];
  },

  async updateRole(id, role) {
    const result = await db.query(
      `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role, created_at`,
      [role, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rows[0];
  },

  // Keep legacy methods for backwards compat
  async findByIdEmail(email) {
    return this.findByEmail(email);
  },
};

export default userModel;
