import * as GuestModel from "../models/Guest.model.js";
import * as EventModel from "../models/Event.model.js";

/*
 * Create a new guest
 */
export const createGuest = async (guestData, userId) => {
  const {
    eventId,
    firstName,
    lastName,
    email,
    phone,
    organization,
    guestType,
  } = guestData;

  // Check that event exists
  const event = await EventModel.findEventById(eventId);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if guest already exists for this event
  const existingGuest = await GuestModel.findGuestByEmailAndEvent(
    email,
    eventId,
  );

  if (existingGuest) {
    const error = new Error(
      "A guest with this email is already registered for this event",
    );

    error.statusCode = 409;
    throw error;
  }

  // Create guest
  const guest = await GuestModel.createGuest({
    eventId,
    firstName,
    lastName,
    email,
    phone,
    organization,
    guestType,
    createdBy: userId,
  });

  return guest;
};

/*
 * Get all guests
 *
 * Optional:
 * eventId
 */
export const getGuests = async (eventId = null) => {
  if (eventId) {
    const event = await EventModel.findEventById(eventId);

    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    return await GuestModel.findGuestsByEventId(eventId);
  }

  return await GuestModel.findAllGuests();
};

/*
 * Get one guest by ID
 */
export const getGuestById = async (guestId) => {
  const guest = await GuestModel.findGuestById(guestId);

  if (!guest) {
    const error = new Error("Guest not found");
    error.statusCode = 404;
    throw error;
  }

  return guest;
};

/*
 * Update guest
 */
export const updateGuest = async (guestId, guestData) => {
  const existingGuest = await GuestModel.findGuestById(guestId);

  if (!existingGuest) {
    const error = new Error("Guest not found");
    error.statusCode = 404;
    throw error;
  }

  /*
   * Only update fields that were supplied
   */
  const updateData = {
    firstName: guestData.firstName ?? existingGuest.first_name,

    lastName: guestData.lastName ?? existingGuest.last_name,

    email: guestData.email ?? existingGuest.email,

    phone: guestData.phone ?? existingGuest.phone,

    organization: guestData.organization ?? existingGuest.organization,

    guestType: guestData.guestType ?? existingGuest.guest_type,
  };

  /*
   * If email is being changed,
   * make sure another guest does not use it.
   */
  if (guestData.email && guestData.email !== existingGuest.email) {
    const duplicate = await GuestModel.findGuestByEmailAndEvent(
      guestData.email,
      existingGuest.event_id,
    );

    if (duplicate && duplicate.id !== guestId) {
      const error = new Error(
        "Another guest with this email already exists for this event",
      );

      error.statusCode = 409;
      throw error;
    }
  }

  return await GuestModel.updateGuest(guestId, updateData);
};

/*
 * Delete guest
 */
export const deleteGuest = async (guestId) => {
  const guest = await GuestModel.findGuestById(guestId);

  if (!guest) {
    const error = new Error("Guest not found");
    error.statusCode = 404;
    throw error;
  }

  await GuestModel.deleteGuest(guestId);

  return true;
};
