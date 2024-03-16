const getPdf = require("../controllers/getPdf.js");

module.exports = getResumeRoutes = {
  path: "/getPdf/:pdfid",
  method: "post",
  handler: async (req, res) => {
    try {
      const { pdfid } = req.params;
      const pdf = req.body.data;
      const response = await getPdf(pdfid, pdf);
      return res.status(200).send({
        message: "Pdf fetched successfully!",
        response: response,
        type: "Success",
      });
    } catch (err) {
      return res.status(400).send({
        message: "Error fetching pdf!",
        response: err.message,
        type: "Error",
      });
    }
  },
};
