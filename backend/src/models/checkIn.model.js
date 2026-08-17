import db from "../config/database.js";

const checkIn = {
  async create(data) {
    const result = await db.query(
      ` INSERT INTO checkins(ticket_id,checked_in_id) VALUES ($1, $2) RETURNING`,
      [data.ticket_id, data.ticket_in_id],
    );

    return result.rows[0];
  },
  async findAll() {
    const result = await db.query(`
                
                SELECT
          c.*,
          t.ticket_number
        FROM checkins c
        JOIN tickets t
          ON t.id = c.ticket_id
        ORDER BY c.checked_in_at DESC `);

    return result.rows[0];
  },
};
export default checkIn;
