import db from "../config/database.js";

const Invitation = {
  async create(data) {
    const result = await db.query(
      ` INSERT INTO invitation(event_id, email, send_id, token ) VALUES($1,$2,$3,$4) RETURNING *
            `,
      [data.event_id, data.email, data.send_id, data.token],
    );

    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await db.query(
      `
        SELECT *
        FROM invitations
        WHERE sender_id = $1
        ORDER BY created_at DESC
        `,
      [userId],
    );

    return result.rows;
  },

  async accept(token) {
    const result = await db.query(
      `
        UPDATE invitations
        SET
          status = 'accepted'
        WHERE token = $1
          AND status = 'pending'
        RETURNING *
        `,
      [token],
    );

    return result.rows[0];
  },
};

export default Invitation;
