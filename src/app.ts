import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "./auth/auth.router";
import { categoryRouter } from "./category/category.router";
import { itemRouter } from "./item/item.router";
import { tradeRouter } from "./trade/trade.router";
import { userRouter } from "./user/user.router";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Minecraft API");
});

app.use(userRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(itemRouter);
app.use(tradeRouter);

const port = 3000;
const server = app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

export const closeServer = () =>
  new Promise((resolve) => server.close(resolve));

export { app };
