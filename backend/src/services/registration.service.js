import * as RegistrationModel from "../models/Registration.model.js";

import * as EventModel from "../models/Event.model.js";

import * as GuestModel from "../models/Guest.model.js";

/*
 * Create event registration
 */
export const createRegistration = async (registrationData, userId) => {
  const { eventId, guestId } = registrationData;

  /*
   * Check whether event exists
   */
  const event = await EventModel.findEventById(eventId);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  /*
   * Check event status
   */
  if (event.status && event.status !== "PUBLISHED") {
    const error = new Error("Registration is not available for this event");

    error.statusCode = 400;
    throw error;
  }

  /*
   * Check registration deadline
   */
  if (
    event.registration_deadline &&
    new Date() > new Date(event.registration_deadline)
  ) {
    const error = new Error("Registration deadline has passed");

    error.statusCode = 400;
    throw error;
  }

  /*
   * If guestId was supplied,
   * verify that guest exists.
   */
  if (guestId) {
    const guest = await GuestModel.findGuestById(guestId);

    if (!guest) {
      const error = new Error("Guest not found");
      error.statusCode = 404;
      throw error;
    }

    /*
     * Make sure guest belongs to this event
     */
    if (guest.event_id !== eventId) {
      const error = new Error("Guest does not belong to this event");

      error.statusCode = 400;
      throw error;
    }
  }

  /*
   * Check if user is already registered
   */
  const existingRegistration =
    await RegistrationModel.findRegistrationByUserAndEvent(userId, eventId);

  if (existingRegistration) {
    const error = new Error("You are already registered for this event");

    error.statusCode = 409;
    throw error;
  }

  /*
   * Check event capacity
   */
  if (event.capacity) {
    const registrationCount =
      await RegistrationModel.countRegistrationsByEvent(eventId);

    if (registrationCount >= event.capacity) {
      const error = new Error("This event has reached its maximum capacity");

      error.statusCode = 400;
      throw error;
    }
  }

  /*
   * Create registration
   */
  const registration = await RegistrationModel.createRegistration({
    eventId,
    userId,
    guestId: guestId || null,
    status: "CONFIRMED",
  });

  return registration;
};

/*
 * Get registrations
 */
export const getRegistrations = async (userId) => {
  return await RegistrationModel.findRegistrationsByUserId(userId);
};

/*
 * Get registration by ID
 */
export const getRegistrationById = async (registrationId) => {
  const registration =
    await RegistrationModel.findRegistrationById(registrationId);

  if (!registration) {
    const error = new Error("Registration not found");

    error.statusCode = 404;
    throw error;
  }

  return registration;
};

/*
 * Cancel registration
 */
export const cancelRegistration = async (registrationId, userId) => {
  const registration =
    await RegistrationModel.findRegistrationById(registrationId);

  if (!registration) {
    const error = new Error("Registration not found");

    error.statusCode = 404;
    throw error;
  }

  /*
   * Make sure the registration belongs
   * to the logged-in user.
   */
  if (registration.user_id !== userId) {
    const error = new Error("You are not allowed to cancel this registration");

    error.statusCode = 403;
    throw error;
  }

  /*
   * Prevent cancelling an already cancelled
   * registration.
   */
  if (registration.status === "CANCELLED") {
    const error = new Error("Registration is already cancelled");

    error.statusCode = 400;
    throw error;
  }

  return await RegistrationModel.cancelRegistration(registrationId);
};
