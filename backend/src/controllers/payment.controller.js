import db from "../config/database.js";
import Payment from "../models/Payment.model.js";
import PaymentProof from "../models/PaymentProof.model.js";
import Registration from "../models/registration.model.js";
import ticketService from "../services/ticket.service.js";
import gatewayService from "../services/gateway.service.js";

export const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create({
      ...req.body,
      user_id: req.user?.id || null,
    });

    const callbackUrl = `http://localhost:5000/api/payments/webhook`;
    
    const { checkoutUrl, gatewayReference } = await gatewayService.initializePayment(
      payment.id,
      payment.amount,
      callbackUrl
    );

    await db.query(
      "UPDATE payments SET gateway_reference = $1 WHERE id = $2",
      [gatewayReference, payment.id]
    );

    res.status(201).json({
      success: true,
      message: "Payment transaction initialized",
      data: {
        payment: {
          ...payment,
          gateway_reference: gatewayReference
        },
        checkoutUrl
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findByUser(req.user?.id || null);

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    const { reference, status } = req.body;
    
    if (!reference) {
      return res.status(400).json({ success: false, message: "Reference is required" });
    }

    const payResult = await db.query(
      "SELECT * FROM payments WHERE gateway_reference = $1",
      [reference]
    );
    
    const payment = payResult.rows[0];
    
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    if (payment.status !== 'Pending') {
      return res.json({ success: true, message: "Already processed" });
    }

    const verification = await gatewayService.verifyPayment(reference);
    
    if (!verification.isSuccess || status === 'FAILED') {
      await db.query(
        "UPDATE payments SET status = 'Failed', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
        [payment.id]
      );
      
      return res.json({ success: true, message: "Payment updated to Failed" });
    }

    await db.query(
      "UPDATE payments SET status = 'Paid', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
      [payment.id]
    );

    const reg = await Registration.findById(payment.registration_id);
    
    if (reg) {
      await ticketService.createTicket({
        event_id: reg.event_id,
        registration_id: reg.id,
        user_id: reg.user_id
      });
    }

    res.json({
      success: true,
      message: "Webhook processed successfully, ticket and QR Code generated."
    });
  } catch (error) {
    next(error);
  }
};

export const mockCheckoutPage = async (req, res, next) => {
  try {
    const { reference, amount } = req.query;
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Gateway</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #fff;
            font-family: 'Outfit', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .checkout-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 40px;
            width: 450px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            text-align: center;
          }
          h1 { margin-top: 0; font-size: 28px; font-weight: 800; color: #4facfe; }
          .price { font-size: 48px; font-weight: 800; color: #00f2fe; margin: 20px 0; }
          .ref { font-family: monospace; font-size: 14px; color: #fbbf24; background: rgba(0,0,0,0.2); padding: 5px 10px; border-radius: 5px; display: inline-block; margin-bottom: 30px; }
          .btn-group { display: flex; gap: 15px; justify-content: center; }
          button {
            padding: 12px 25px;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
          }
          .btn-pay { background: #10b981; color: white; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
          .btn-pay:hover { background: #059669; transform: translateY(-2px); }
          .btn-cancel { background: #ef4444; color: white; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4); }
          .btn-cancel:hover { background: #dc2626; transform: translateY(-2px); }
          .status-msg { display: none; margin-top: 20px; font-size: 16px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="checkout-container">
          <h1>SECURE CHECKOUT</h1>
          <p>Please complete your payment below:</p>
          <div class="price">$${amount || "50.00"}</div>
          <div>Reference:</div>
          <div class="ref">${reference || "N/A"}</div>
          <div class="btn-group" id="actions">
            <button class="btn-pay" onclick="processPayment('SUCCESS')">Pay Now</button>
            <button class="btn-cancel" onclick="processPayment('FAILED')">Cancel</button>
          </div>
          <div class="status-msg" id="status"></div>
        </div>

        <script>
          async function processPayment(status) {
            document.getElementById('actions').style.display = 'none';
            const statusDiv = document.getElementById('status');
            statusDiv.style.display = 'block';
            statusDiv.style.color = '#38bdf8';
            statusDiv.innerText = 'Processing payment transaction with gateway...';

            try {
              const res = await fetch('/api/payments/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: '${reference}', status: status })
              });
              const data = await res.json();
              
              if (data.success) {
                statusDiv.style.color = '#34d399';
                statusDiv.innerHTML = '<h2>Payment Successful!</h2><p>Your ticket and QR code have been generated. You can now close this tab.</p>';
              } else {
                statusDiv.style.color = '#f87171';
                statusDiv.innerHTML = '<h2>Payment Failed</h2><p>' + data.message + '</p>';
              }
            } catch (err) {
              statusDiv.style.color = '#f87171';
              statusDiv.innerHTML = '<h2>Error connecting to server</h2>';
            }
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
};

export const uploadPaymentProof = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment proof is required",
      });
    }

    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: `Payment with ID ${req.params.id} not found`,
      });
    }

    const proof = await PaymentProof.create({
      payment_id: req.params.id,
      file_path: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Payment proof uploaded",
      data: proof,
    });
  } catch (error) {
    next(error);
  }
};
