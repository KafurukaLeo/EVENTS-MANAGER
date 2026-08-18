import notification from "../models/notification.model.js";

const notificationService = {
  async create(data) {
    return await notification.create(data);
  },
  async getNotifications(userId) {
    return await notification.findByUser(userId);
  },
};

export default notificationService;
