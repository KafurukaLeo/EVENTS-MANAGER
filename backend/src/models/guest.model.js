import db from "../config/database.js";

const Guest = {
  async create(data) {
    const result = await db.query(
      `
        INSERT INTO guests
        (
          event_id,
          user_id,
          name,
          email,
          phone
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
      [data.event_id, data.user_id, data.name, data.email, data.phone],
    );

    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(`
        SELECT *
        FROM guests
        ORDER BY created_at DESC
      `);

    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `
        SELECT *
        FROM guests
        WHERE id = $1
        `,
      [id],
    );

    return result.rows[0];
  },

  async update(id, data) {
    const result = await db.query(
      `
        UPDATE guests
        SET
          name =
            COALESCE($1,name),
          email =
            COALESCE($2,email),
          phone =
            COALESCE($3,phone)
        WHERE id = $4
        RETURNING *
        `,
      [data.name, data.email, data.phone, id],
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query(
      `
        DELETE FROM guests
        WHERE id = $1
        RETURNING id
        `,
      [id],
    );

    return result.rows[0];
  },
};

export default Guest;
