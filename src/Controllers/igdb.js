const clientID = "***REMOVED***";
const accessToken = "***REMOVED***";
const url = "https://api.igdb.com/v4/games";

export async function searchGames(name) {
  try {
    console.log(name);
    const response = await fetch("http://localhost:3000/findGames", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify({
        name,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return "error";
  }
}

export async function getCover(id) {
  try {
    // console.log(id);
    const response = await fetch("http://localhost:3000/getCover", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify({
        id,
      }),
    });
    const result = await response.json();
    // console.log(id, result);
    if (!result || !result.length) return "nocover.png";
    const url = result.at(0).url;
    const hash = url.split("/").pop();
    // console.log(hash);
    return hash;
  } catch (e) {
    console.log(e);
    return "error";
  }
}
