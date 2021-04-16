import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRouter from "./eventRouter.js";
import userRouter from "./userRouter.js";
import gridfsRouter from "./gridfsRouter.js";
import path from "path";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/events", eventRouter);
app.use("/users", userRouter);
app.use("/uploads", gridfsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", (req, res) => res.status(200).send("hello world"));
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`The server started on port: ${PORT}`));
