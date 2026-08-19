import crypto from "crypto";

const gatewayService = {
  async initializePayment(paymentId, amount, callbackUrl) {
    const gatewayReference = `GW-REF-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
    
    const checkoutUrl = `http://localhost:5000/api/payments/checkout?reference=${gatewayReference}&amount=${amount}&callback=${encodeURIComponent(callbackUrl)}`;
    
    return { checkoutUrl, gatewayReference };
  },

  async verifyPayment(gatewayReference) {
    return { isSuccess: true, status: "SUCCESS" };
  }
};

export default gatewayService;
