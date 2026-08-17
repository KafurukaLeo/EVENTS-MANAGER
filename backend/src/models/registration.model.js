import db from "../config/database.js";

const Registration = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO registrations
        (
          event_id,
          user_id,
          status
        )
        VALUES
        ($1,$2,'registered')
        RETURNING *
        `,
      [data.event_id, data.user_id],
    );

    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await db.query(
      `
        SELECT
          r.*,
          e.name AS event_name
        FROM registrations r
        JOIN events e
          ON e.id = r.event_id
        WHERE r.user_id = $1
        ORDER BY r.created_at DESC
        `,
      [userId],
    );

    return result.rows;
  },

  async cancel(id) {
    const result = await db.query(
      `
        UPDATE registrations
        SET status = 'cancelled'
        WHERE id = $1
        RETURNING *
        `,
      [id],
    );

    return result.rows[0];
  },
};

export default Registration;
