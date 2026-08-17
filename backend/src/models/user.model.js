import db from "../config/database.js";

const user = {
  async create({ name, email, password, role }) {
    const result = await db.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role],
    );
    return result.rows[0];
  },
  
  async findByIdEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  },
  
  async findById(id) {
    const result = await db.query(
      `SELECT id, name, email, role, created_at FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  },
};

export default user;
