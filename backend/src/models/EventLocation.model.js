import db from "../config/database.js";

const EventLocation = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO event_locations
        (
          event_id,
          venue,
          address,
          city
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
      [data.event_id, data.venue, data.address, data.city],
    );

    return result.rows[0];
  },

  async findByEvent(eventId) {
    const result = await db.query(
      `
        SELECT *
        FROM event_locations
        WHERE event_id = $1
        `,
      [eventId],
    );

    return result.rows[0];
  },
};

export default EventLocation;
