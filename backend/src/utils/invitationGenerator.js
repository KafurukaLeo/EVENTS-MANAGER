import crypto from "crypto";
const generateInvitationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
export default generateInvitationToken;
