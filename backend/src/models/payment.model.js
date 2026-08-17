import db from "../config/database.js";

const payment = {
  async create(data) {
    const result = await db.query(
      `INSERT INTO Payments(registration_id,
            user_id, amount,method, status) VALUES ($1, $2, $3, $4, 'Pending') RETURNING * `,
      [data.registration_id, data.user_id, data.amount``],
    );

    return (result = await db.query(
      ` SELECT FROM payment WHERE user_id = $1 ORDER BY create_at DESC`,
      [userId],
    ));
    return result.rows;
  },
  async updateStatus(id, status) {
    const result = await db.query(
      ` UPDATE Patments SET status = $1, WHERE id = $2 RETURNING`,
      [id, status],
    );
    return result.rows[0];
  },
};
export default payment;
