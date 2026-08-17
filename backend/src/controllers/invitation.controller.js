import Invitation from "../models/Invitation.model.js";
import invitationService from "../services/invitation.service.js";

export const createInvitation = async (req, res, next) => {
  try {
    const invitation = await invitationService.createInvitation({
      ...req.body,
      sender_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: invitation,
    });
  } catch (error) {
    next(error);
  }
};

export const getInvitations = async (req, res, next) => {
  try {
    const invitations = await Invitation.findByUser(req.user.id);

    res.json({
      success: true,
      data: invitations,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptInvitation = async (req, res, next) => {
  try {
    const invitation = await invitationService.acceptInvitation(
      req.params.token,
    );

    res.json({
      success: true,
      message: "Invitation accepted",
      data: invitation,
    });
  } catch (error) {
    next(error);
  }
};
