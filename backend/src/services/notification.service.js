import notification from "../models/notification.model.js";

const notificationService = {
  async create(data) {
    return await notification.create(data);
  },
  async getUserNotification(userId) {
    return await Notification.findByUser(userId);
  },
};

export default notificationService;
