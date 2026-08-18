import reportService from "../services/report.service.js";

export const getReportSummary = async (req, res, next) => {
  try {
    const events = await reportService.eventReport();

    const payments = await reportService.paymentReport();

    const attendance = await reportService.attendanceReport();

    res.json({
      success: true,
      data: {
        totalEvents: parseInt(events.total_events || 0, 10),

        totalPayments: parseInt(payments.total_payments || 0, 10),

        totalRevenue: parseFloat(payments.total_amount || 0),

        totalCheckIns: parseInt(attendance.total_checkins || 0, 10),
      },
    });
  } catch (error) {
    next(error);
  }
};
