const url = "https://playlist-games.herokuapp.com";
export async function popularGames() {
  try {
    const response = await fetch(`${url}/popularGames`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

export async function searchGames(query) {
  try {
    if (!query) return;
    const response = await fetch(`${url}/findGames`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify({
        query,
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

export async function getTop() {
  try {
    const response = await fetch(`${url}/popularGames/getTop`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

export async function getUpcoming() {
  try {
    const response = await fetch(`${url}/getUpcoming`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

export async function gameDetails(id) {
  try {
    const response = await fetch(`${url}/gameDetails`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify({
        id,
      }),
    });
    const result = await response.json();
    // result.cover = await getCover(result.id);
    // let promises = result.artworks.map(async (id) => await getArtwork(id));
    // result.artworks = await Promise.all(promises);
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
    const response = await fetch(`${url}/getCover`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
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

export async function getArtwork(id) {
  try {
    // console.log(id);
    const response = await fetch(`${url}/getArtwork`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
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
