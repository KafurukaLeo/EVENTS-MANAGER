import db from "../config/database.js";

const Event = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO events
        (
          name,
          description,
          event_date,
          start_time,
          end_time,
          organizer_id,
          capacity
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
      [
        data.name,
        data.description,
        data.event_date,
        data.start_time,
        data.end_time,
        data.organizer_id,
        data.capacity,
      ],
    );

    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(`
        SELECT *
        FROM events
        ORDER BY event_date ASC
      `);

    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `
        SELECT *
        FROM events
        WHERE id = $1
        `,
      [id],
    );

    return result.rows[0];
  },

  async update(id, data) {
    const result = await db.query(
      `
        UPDATE events
        SET
          name =
            COALESCE($1, name),
          description =
            COALESCE($2, description),
          event_date =
            COALESCE($3, event_date),
          start_time =
            COALESCE($4, start_time),
          end_time =
            COALESCE($5, end_time),
          capacity =
            COALESCE($6, capacity),
          updated_at = NOW()
        WHERE id = $7
        RETURNING *
        `,
      [
        data.name,
        data.description,
        data.event_date,
        data.start_time,
        data.end_time,
        data.capacity,
        id,
      ],
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query(
      `
        DELETE FROM events
        WHERE id = $1
        RETURNING id
        `,
      [id],
    );

    return result.rows[0];
  },
};

export default Event;
