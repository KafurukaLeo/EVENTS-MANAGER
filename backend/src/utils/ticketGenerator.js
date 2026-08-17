import crypto from "crypto";

const generateTicketNumber = () => {
  return "TKT-" + crypto.randomBytes(6).toString("hex").toUpperCase();
};
export default generateTicketNumber;
