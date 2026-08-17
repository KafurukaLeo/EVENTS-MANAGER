import Event from "../models/event.model.js";

const eventService = {

  createEvent: (data) => Event.create(data),

  getEvents: () => Event.findAll(),

  getEvent: (id) => Event.findById(id),

  updateEvent: (id, data) => Event.update(id, data),

  deleteEvent: (id) => Event.delete(id),
  
};

export default eventService;
