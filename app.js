require("dotenv").config();
const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const e = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const url = "https://api.igdb.com/v4";

const coverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/";
const enumAgeRating = {
  1: "3+",
  2: "7+",
  3: "12+",
  4: "16+",
  5: "18+",
  6: "RP",
  7: "EC",
  8: "E",
  9: "E10",
  10: "T",
  11: "M",
  12: "AO",
  13: "CERO A",
  14: "CERO B",
  15: "CERO C",
  16: "CERO D",
  17: "CERO Z",
  18: "USK 0",
  19: "USK 6",
  20: "USK 12",
  21: "USK 18",
  22: "GRACALL",
  23: "GRAC Twelve",
  24: "GRAC Fifteen",
  25: "GRAC Eighteen",
  26: "GRAC Testing",
  27: "ClassIND L",
  28: "ClassIND Ten",
  29: "ClassIND Twelve",
  30: "ClassIND Fourteen",
  31: "ClassIND Sixteen",
  32: "ClassIND Eighteen",
  33: "ACB G",
  34: "ACB PG",
  35: "ACB M",
  36: "ACB MA15",
  37: "ACB R18",
  38: "ACB RC",
};

// let themes;
// (async function mapThemes() {
//   try {
//     const response = await fetch(`${url}/themes`, {
//       method: "POST",
//       headers: new Headers({
//         Accept: "application/json",
//         // "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//         "Client-ID": process.env.CLIENT_ID,
//         "Access-Control-Allow-Origin": "*",
//       }),
//       body: `fields name;
//       limit 50;
//       sort id;`,
//     });
//     const result = await response.json();
//     themes = result.reduce((acc, item) => {
//       return { ...acc, [item.id]: item.name };
//     }, {});
//     // console.log(themes);
//   } catch (e) {
//     console.log(e);
//   }
// })();

// function enumThemes(themeIDs) {
//   return themeIDs.map((id) => themes[id]);
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.post("/popularGames", async (req, res) => {
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
      body: `fields name, summary, cover.url;
      where  hypes > 8 & (aggregated_rating != null | rating != null);
      sort first_release_date desc;`,
    });
    const result = await response.json();
    result.forEach((item, index) => {
      if (item.cover) {
        result[index].cover = `${coverUrl}${item.cover.url.split("/").pop()}`;
      } else result[index].cover = `${coverUrl}nocover.png`;
    });
    res.json(result);
    // console.log(result);
  } catch (e) {
    console.log(e);
  }
});

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
      body: `fields name, cover.url, artworks.url;
      limit 100;
      ${
        req.body.query.searchName
          ? `search \"${req.body.query.searchName}\";`
          : "sort aggregated_rating desc;"
      }
      where genres ${
        req.body.query.genre ? `= [${req.body.query.genre}]` : "!= null"
      } & version_parent = null & summary != null & category = (0,2,4);
      `,
    });
    console.log(`fields name, cover.url, artworks.url, aggregated_rating;
    limit 100;
    ${
      req.body.query.searchName
        ? `search \"${req.body.query.searchName}\";`
        : "sort aggregated_rating desc;"
    }
    where genres ${
      req.body.query.genre ? `= [${req.body.query.genre}]` : "!= null"
    } & version_parent = null & summary != null & category = (0,2,4);
    `);
    const result = await response.json();
    result.forEach((item, index) => {
      if (item.cover) {
        result[index].cover = `${coverUrl}${item.cover.url.split("/").pop()}`;
      } else if (item.artworks) {
        result[index].cover = `${coverUrl}${item.artworks
          .at(0)
          .url.split("/")
          .pop()}`;
      } else result[index].cover = `${coverUrl}nocover.png`;
    });
    res.json(result);
    // console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.post("/getTop", async (req, res) => {
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
      body: `fields name, cover.url, artworks.url, total_rating;
        where version_parent = null & summary != null & aggregated_rating != null  & category = (0,2,4) & total_rating_count > 50;
        limit  100;
        sort total_rating desc;`,
    });
    const result = await response.json();
    result.forEach((item, index) => {
      if (item.cover) {
        result[index].cover = `${coverUrl}${item.cover.url.split("/").pop()}`;
      } else if (item.artworks) {
        result[index].cover = `${coverUrl}${item.artworks
          .at(0)
          .url.split("/")
          .pop()}`;
      } else result[index].cover = `${coverUrl}nocover.png`;
    });
    res.json(result);
    // console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.post("/getUpcoming", async (req, res) => {
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
      body: `fields name, cover.url, artworks.url, total_rating;
          limit 50;
          where first_release_date > ${Math.floor(Date.now() / 1000)};
          sort hypes desc;`,
    });
    const result = await response.json();
    result.forEach((item, index) => {
      if (item.cover) {
        result[index].cover = `${coverUrl}${item.cover.url.split("/").pop()}`;
      } else if (item.artworks) {
        result[index].cover = `${coverUrl}${item.artworks
          .at(0)
          .url.split("/")
          .pop()}`;
      } else result[index].cover = `${coverUrl}nocover.png`;
    });
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
      body: `fields name, summary, storyline, first_release_date, involved_companies.company.name,
        involved_companies.developer, total_rating, themes.name, artworks.url, cover.url,
        age_ratings.rating, platforms.name, similar_games.name, similar_games.cover.url, similar_games.artworks.url;
        where id = ${req.body.id};`,
    });
    const [result] = await response.json();
    console.log(result);
    if (result.themes) {
      result.themes.forEach(
        (item, index) => (result.themes[index] = item.name)
      );
      // result.themes = enumThemes(result.themes);
    }
    if (result.artworks) {
      result.artworks.forEach((item, index) => {
        result.artworks[index] = item.url.split("/").pop();
      });
    }
    if (result.cover) {
      result.cover = result.cover.url.split("/").pop();
    } else if (result.artworks) {
      result.cover = result.artworks.at(0);
    } else result.cover = "nocover.png";
    if (result.involved_companies) {
      result.developers = [];
      result.publishers = [];
      result.involved_companies.forEach((item, index) => {
        if (item.developer) {
          result.developers.push(item.company.name);
        } else {
          result.publishers.push(item.company.name);
        }
      });
    }
    if (result.first_release_date) {
      const date = new Date(result.first_release_date);
      // result.first_release_date = `${date.getDay}, ${date.}`
      result.first_release_date = date.toLocaleDateString;
    }
    if (result.platforms) {
      result.platforms.forEach((item, index) => {
        result.platforms[index] = item.name;
      });
    }
    result.age_rating = result.age_ratings
      ? result.age_ratings
          .map((item) => enumAgeRating[Number(item.rating)])
          .slice(0, 4)
          .join(", ")
      : // enumRating[Number(result.age_ratings.at(0).rating)]
        "unrated";
    if (result.similar_games) {
      result.similar_games.forEach((item, index) => {
        if (item.cover) {
          result.similar_games[index].cover = `${coverUrl}${item.cover.url
            .split("/")
            .pop()}`;
        } else if (item.artworks) {
          result.similar_games[index].cover = `${coverUrl}${item.artworks
            .at(0)
            .url.split("/")
            .pop()}`;
        } else result.similar_games[index].cover = `${coverUrl}nocover.png`;
      });
    }
    res.json(result);
    // console.log(result);
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
