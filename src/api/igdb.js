const clientID = "***REMOVED***";
const accessToken = "***REMOVED***";
const url = "https://api.igdb.com/v4/games";

export async function searchGames(name) {
  try {
    console.log(name);
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientID,
        "Access-Control-Allow-Origin": "*",
      }),
      body: `fields name;
      limit 10;
      search "${name}";`,
    });
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
