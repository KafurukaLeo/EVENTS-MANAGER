import userModel from "../models/user.model.js";

const VALID_ROLES = ["admin", "eventmanager", "guest"];

/**
 * GET /api/users
 * Admin: list all users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Admin: get a single user by ID
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/users/:id/role
 * Admin: change a user's role
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role || !VALID_ROLES.includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`,
      });
    }

    // Prevent changing own role
    if (Number(req.params.id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updated = await userModel.updateRole(req.params.id, role.toLowerCase());
    res.json({
      success: true,
      message: "User role updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id
 * Admin: delete any user
 */
export const deleteUser = async (req, res, next) => {
  try {
    // Prevent admin from deleting themselves
    if (Number(req.params.id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await userModel.delete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
