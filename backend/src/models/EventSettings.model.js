import db from "../config/database.js";

const EventSetting = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO event_settings
        (
          event_id,
          registration_required,
          payment_required
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
      [data.event_id, data.registration_required, data.payment_required],
    );

    return result.rows[0];
  },

  async findByEvent(eventId) {
    const result = await db.query(
      `
        SELECT *
        FROM event_settings
        WHERE event_id = $1
        `,
      [eventId],
    );

    return result.rows[0];
  },

  async update(eventId, data) {
    const result = await db.query(
      `
        UPDATE event_settings
        SET
          registration_required =
            COALESCE(
              $1,
              registration_required
            ),
          payment_required =
            COALESCE(
              $2,
              payment_required
            )
        WHERE event_id = $3
        RETURNING *
        `,
      [data.registration_required, data.payment_required, eventId],
    );

    return result.rows[0];
  },
};

export default EventSetting;
