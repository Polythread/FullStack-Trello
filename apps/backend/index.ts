import express from "express";

const app = express();

app.use(express());

import authRouter from "./routes/auth.route";
import orgRouter from "./routes/org.route";
import boardRouter from "./routes/board.route";

app.use("/api/auth", authRouter);
app.use("/api/organization", orgRouter);
app.use("/api/board", boardRouter);

app.listen(3000, () => {
  console.log("Server Started at http://localhost:3000");
});
