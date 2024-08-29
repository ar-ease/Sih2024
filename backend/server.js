import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("server is ready");
});

app.get("/data", (req, res) => {
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
