import Guest from "../models/guest.model.js";
export const createGuest = async (req, res, next) => {
  try {
    const guest = await User.create({
      ...req.body,
      user_id: req.user.id,
    });
    res.status(201).json({
      success: true,
      data: guest,
    });
  } catch (erro) {
    next(error);
  }
};

export const getGuests = async (req, res, next) => {
  try {
    const guests = await Guest.findAll();
    res.json({
      success: true,
      data: guests,
    });
    7;
  } catch (error) {
    next(error);
  }
};
export const getGuest = async (req, res, next) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }
    res.json({
      success: true,
      data: guest,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGuest = async (req, res, next) => {
  try {
    const guest = await guest.update(req.params.id, req.body);
    res.json({
      success: true,
      data: guest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGuest = async (req, res, next) => {
  try {
    await Guest.delete(req.params.id);
    res.json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
