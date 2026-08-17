import db from "../config/database.js";

const Notification = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO notifications
        (
          user_id,
          title,
          message
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
      [data.user_id, data.title, data.message],
    );

    return result.rows[0];
  },

  async findByUser(userId) {
    const result = await db.query(
      `
        SELECT *
        FROM notifications
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
      [userId],
    );

    return result.rows;
  },

  async markAsRead(id, userId) {
    const result = await db.query(
      `
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = $1
          AND user_id = $2
        RETURNING *
        `,
      [id, userId],
    );

    return result.rows[0];
  },
};

export default Notification;
