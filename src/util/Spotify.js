const clientId = 'Here you key'; 
const redirectUri = 'http://working-react-spotifys.surge.sh';
let accessToken;

 const Spotify = {
    
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //Cechk For access TOKEN
    //Nos da la URL que tenemos en el navedagor
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    //Todo Bien hasta aqui
    
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);


      //Cleaning the accestoken
      window.setTimeout( () => (accessToken = ''), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
    //Hasta aqui todo igual 
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    }).then((response) => {
        return response.json();

      }).then( jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        jsonResponse.tracks.items.map(track => {
            console.log(track.artists[0].name);
            

        })
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
      //Hasta aca todo igual 
  },
  savePlayList(name, trackUris) { 
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
