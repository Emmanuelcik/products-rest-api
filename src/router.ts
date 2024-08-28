import { Router } from "express";

const app = Router();
app.get("/", (req, res) => {
  res.send(200);
});

export default app;
