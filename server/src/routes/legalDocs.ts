import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/:doc", async (req, res) => {
  const legalDocsPath = path.join(__dirname, "..", "..", "data", "legal-docs");

  const availableDocs = fs
    .readdirSync(legalDocsPath)
    .filter((file) => file.endsWith(".md"));

  if (availableDocs.includes(req.params.doc + ".md")) {
    const fileData = await fs.readFileSync(
      path.join(legalDocsPath, req.params.doc + ".md"),
      "utf-8"
    );

    res.status(200).end(fileData);
  } else {
    res.notFound();
  }
});

export default router;
