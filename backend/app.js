require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const e = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

const url = "https://api.igdb.com/v4";

app.post("/findGames", async (req, res) => {
  console.log(process.env.ACCESS_TOKEN, process.env.CLIENT_ID);
  try {
    console.log(req.body.name);
    const response = await fetch(`${url}/games`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields name, summary, cover;
      limit 30;
      search "${req.body.name}";
      where version_parent = null;`,
    });
    const result = await response.json();
    res.json(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.post("/getCover", async (req, res) => {
  console.log(process.env.ACCESS_TOKEN, process.env.CLIENT_ID);
  try {
    console.log(req.body.id);
    const response = await fetch(`${url}/covers`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields url;
      where game = ${req.body.id};`,
    });
    const result = await response.json();
    res.json(result);
    console.log(result[0].url);
  } catch (e) {
    console.log(e);
  }
});
