import express from "express";
import cors from "cors";

const app = express();

app.use(cors("http://localhost:5173"));

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});