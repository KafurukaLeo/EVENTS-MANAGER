import db from "../config/database.js";

const reportService = {
  async eventReport() {
    const result = await db.query(`
        SELECT
          COUNT(*) AS total_events
        FROM events
      `);

    return result.rows[0];
  },

  async paymentReport() {
    const result = await db.query(`
        SELECT
          COUNT(*) AS total_payments,
          COALESCE(
            SUM(amount),
            0
          ) AS total_amount
        FROM payments
      `);

    return result.rows[0];
  },

  async attendanceReport() {
    const result = await db.query(`
        SELECT
          COUNT(*) AS total_checkins
        FROM checkins
      `);

    return result.rows[0];
  },
};

export default reportService;
