import QRCode from "qrcode";

const generateQRCode = async (data) => {
  return await QRCode.toDataURL(data);
};
export default generateQRCode;
