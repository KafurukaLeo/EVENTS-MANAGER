import db from "../config/database.js";

const Ticket = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO tickets
        (
          registration_id,
          user_id,
          event_id,
          ticket_number
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
        `,
      [data.registration_id, data.user_id, data.event_id, data.ticket_number],
    );

    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await db.query(
      `
        SELECT
          t.*,
          e.name AS event_name
        FROM tickets t
        JOIN events e
          ON e.id = t.event_id
        WHERE t.user_id = $1
        ORDER BY t.created_at DESC
        `,
      [userId],
    );

    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `
        SELECT *
        FROM tickets
        WHERE id = $1
        `,
      [id],
    );

    return result.rows[0];
  },
};

export default Ticket;
