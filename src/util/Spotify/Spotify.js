let userAccessToken;
const clientID = '87d7a58e1dc84329bee7e68d636cde04';
const REDIRECT_URI = "http://localhost:3000";

const Spotify = {
    getAccessToken() {
        if (userAccessToken) return userAccessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            userAccessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            window.setTimeout(() => (userAccessToken = ""), expiresIn * 1000);
            window.history.pushState("AccessToken", null, "/");
            return userAccessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = redirect;
    },

    search(term) {
        userAccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${userAccessToken}` },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse || !jsonResponse.tracks || !jsonResponse.tracks.items) {
                    throw new Error("Invalid or missing response structure from Spotify API");
                }

                return jsonResponse.tracks.items.map((t) => ({
                    id: t.id,
                    name: t.name,
                    artist: t.artists[0].name,
                    album: t.album.name,
                    uri: t.uri,
                }));
            })
            .catch((error) => {
                console.error("Error during Spotify API request:", error);
                throw error; // Re-throw the error for further handling if needed
            });
    },

    // ...

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return Promise.reject(new Error("Invalid parameters"));

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        let userId;
        let playlistId;

        // Get the user ID
        return fetch(`https://api.spotify.com/v1/me`, { headers })
            .then((response) => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;

                // Create a new playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers,
                    method: "post",
                    body: JSON.stringify({ name: name }),
                });
            })
            .then((response) => response.json())
            .then(jsonResponse => {
                playlistId = jsonResponse.id;

                // Add tracks to the playlist
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers,
                    method: "post",
                    body: JSON.stringify({ uris: trackUris }),
                });
            })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log('Playlist created and tracks added successfully:', jsonResponse);
            })
            .catch(error => {
                console.error('Error during playlist creation or track addition:', error);
                throw error;
            });
    },
};

export { Spotify };
