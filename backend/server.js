import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemon from "nodemon";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("server is ready");
});

app.get("/api/data", (req, res) => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "a@gmail.com",
    },

    {
      id: 2,
      name: "Jane Doe",
      email: "b@gmail.com",
    },
    {
      id: 3,
      name: "Jim Doe",
      email: "c@gmail.com",
    },
  ];

  res.json(dummyData);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
