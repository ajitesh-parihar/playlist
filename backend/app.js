require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const e = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const url = "https://api.igdb.com/v4";

let themes;
(async function mapThemes() {
  try {
    const response = await fetch(`${url}/themes`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields name;
      limit 50;
      sort id;`,
    });
    const result = await response.json();
    themes = result.reduce((acc, item) => {
      return { ...acc, [item.id]: item.name };
    }, {});
    // console.log(themes);
  } catch (e) {
    console.log(e);
  }
})();

function enumThemes(themeIDs) {
  return themeIDs.map((id) => themes[id]);
}

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.post("/findGames", async (req, res) => {
  try {
    // console.log(req.body.name);
    const response = await fetch(`${url}/games`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields name, cover;
      limit 30;
      search "${req.body.name}";
      where version_parent = null & category = (0,2,4,5);`,
    });
    const result = await response.json();
    res.json(result);
    // console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.post("/gameDetails", async (req, res) => {
  try {
    // console.log(req.body.id);
    const response = await fetch(`${url}/games`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields name, summary, storyline, aggregated_rating, themes, artworks, cover;
      where id = ${req.body.id};`,
    });
    const [result] = await response.json();
    if (result.themes) {
      result.themes = enumThemes(result.themes);
    }
    res.json(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.post("/getCover", async (req, res) => {
  try {
    // console.log(req.body.id);
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
  } catch (e) {
    console.log(e);
  }
});

app.post("/getArtwork", async (req, res) => {
  try {
    // console.log(req.body.id);
    const response = await fetch(`${url}/artworks`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields url;
      where id = ${req.body.id};`,
    });
    console.log(response.urlList);
    const result = await response.json();
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});
