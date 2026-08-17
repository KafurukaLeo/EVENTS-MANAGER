import crypto from "crypto";

import Invitation from "../models/Invitation.model.js";

const invitationService = {
  async createInvitation(data) {
    const token = crypto.randomBytes(32).toString("hex");

    return await Invitation.create({
      ...data,
      token,
    });
  },

  async getInvitations(userId) {
    return await Invitation.findByUser(userId);
  },

  async acceptInvitation(token) {
    return await Invitation.accept(token);
  },
};

export default invitationService;
