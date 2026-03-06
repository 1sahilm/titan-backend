import express from "express";
import Code from "../models/Code";

const router = express.Router();

router.post("/verify", async (req, res) => {

  console.log("BODY:", req.body);

  const { code } = req.body;

  const formattedCode = code.trim().toUpperCase();

    console.log("Searching Code:", formattedCode);

  const record = await Code.findOne({ Codes: formattedCode });

  console.log("Mongo Result:", record);

  if (!record) {
    return res.json({ status: "invalid" });
  }

  if (record.status === "used") {
    return res.json({ status: "already-used" });
  }

  await Code.updateOne(
    { Codes: formattedCode },
    {
      $set: {
        status: "used",
        verifiedAt: new Date()
      }
    }
  );

  res.json({ status: "valid" });

});

export default router;