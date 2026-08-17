import db from "../config/database.js";

const PaymentProof = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO payment_proofs
        (
          payment_id,
          file_path
        )
        VALUES ($1,$2)
        RETURNING *
        `,
      [data.payment_id, data.file_path],
    );

    return result.rows[0];
  },

  async findByPayment(paymentId) {
    const result = await db.query(
      `
        SELECT *
        FROM payment_proofs
        WHERE payment_id = $1
        ORDER BY uploaded_at DESC
        `,
      [paymentId],
    );

    return result.rows;
  },
};

export default PaymentProof;
