import express from "express";

const app = express();

app.use(express());

import authRouter from "./routes/auth.route";

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server Started at http://localhost:3000");
});
