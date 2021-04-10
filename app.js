import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import eventRouter from "./eventRouter.js"
import userRouter from "./userRouter.js"

const app = express();
const PORT = process.env.PORT || 8001;
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).send("hello world"));

app.listen(PORT, () => console.log(`The server started on port: ${ PORT }`));

app.use("/events", eventRouter);
app.use("/users", userRouter);