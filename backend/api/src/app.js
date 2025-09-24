import express from "express";
import userRouter from "./routes/user.route.js"
import dotenv from "dotenv";
import { logger, logEvents } from "./middlewares/logger.middlewares.js";

dotenv.config();

const app = express();
const PORT = 5050 || process.env.PORT;

app.use(logger);
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Rodando na porta http://localhost:${PORT}`);
    logEvents(`Rodando na porta http://localhost:${PORT}`,`listen.log`);
});

app.use("/user", userRouter);

export default app;