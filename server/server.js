import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { sendBulkMail } from "./sendMail.js";

const app = express();
app.use(cors());

// Multer setup
const upload = multer({ dest: "uploads/" });

app.post(
  "/api/send-mails",
  upload.single("resume"),
  async (req, res) => {
    try {
      // 🔥 IMPORTANT: req.body exists ONLY after multer
      const subject = req.body?.subject;
      const template = req.body?.template;
      const emails = req.body?.emails;

      if (!subject || !template || !emails) {
        return res.status(400).json({
          message: "Missing subject, template, or emails",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Resume file is required",
        });
      }

      const parsedEmails = JSON.parse(emails);

      await sendBulkMail({
        subject,
        template,
        emails: parsedEmails,
        resumePath: req.file.path,
      });

      fs.unlinkSync(req.file.path); // cleanup

      res.json({ message: "Emails sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
