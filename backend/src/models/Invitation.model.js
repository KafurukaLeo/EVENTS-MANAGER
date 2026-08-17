import db from "../config/database.js";

const Invitation = {
  async create(data) {
    const result = await db.query(
      ` INSERT INTO invitations(event_id, email, sender_id, token ) VALUES($1,$2,$3,$4) RETURNING *
            `,
      [data.event_id, data.email, data.sender_id, data.token],
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

  async findByToken(token) {
    const result = await db.query(
      `
        SELECT *
        FROM invitations
        WHERE token = $1
        `,
      [token],
    );

    return result.rows[0];
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
