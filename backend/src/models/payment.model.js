import db from "../config/database.js";

const Payment = {
  async create(data) {
    const result = await db.query(
      `
      INSERT INTO payments (registration_id, user_id, amount, method, status)
      VALUES ($1, $2, $3, $4, 'Pending')
      RETURNING *
      `,
      [data.registration_id, data.user_id, data.amount, data.method],
    );
    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await db.query(
      `
      SELECT * FROM payments
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId],
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `
      SELECT * FROM payments
      WHERE id = $1
      `,
      [id]
    );
    return result.rows[0];
  },

  async updateStatus(id, status) {
    const result = await db.query(
      `
      UPDATE payments
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
      `,
      [status, id],
    );
    return result.rows[0];
  },
};

export default Payment;
