import CheckIn from "../models/CheckIn.model.js";

const checkinService = {
  async checkIn(data) {
    return await CheckIn.create(data);
  },

  async getCheckIns() {
    return await CheckIn.findAll();
  },
};

export default checkinService;
