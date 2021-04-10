import NodeCache from "node-cache";
import SpotifyAPI from "spotify-web-api-node";

import { Endpoint } from "./Endpoint";

const spotify = new SpotifyAPI({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: `${process.env.HOMEPAGE}/spotify/`
});

const cache = new NodeCache({
    stdTTL: 5 * 60 * 1000,
    maxKeys: 250
});

export class Spotify extends Endpoint {

    constructor() {
        super("/spotify", ["get", "post"]);
    }

    get({ query: { code, state } }, response, next) {
        if ((code?.length > 20 && code?.length <= 500) && state?.length === 6 && !cache.has(state)) {
            try {
                cache.set(state, code);

                return next();
            } catch {}
        }

        return response.status(400)
            .end(
                JSON.stringify({
                    error: "Invalid form data.",
                    statusCode: 400
                })
            );
    }

    post({ body: { state, token } }, response) {
        if (state?.length === 6) {
            const code = cache.take(state);

            if (code) {
                return spotify.authorizationCodeGrant(code)
                    .then(({ body }) => {
                        body.code = code;
                        body.expires_in = Date.now() + body.expires_in * 1000;

                        response.end(
                            JSON.stringify(body)
                        );
                    })
                    .catch(({ statusCode, body }) =>
                        response.status(statusCode)
                            .end(
                                JSON.stringify({
                                    statusCode,
                                    body
                                })
                            )
                    );
            } else {
                return response.status(400)
                    .end(
                        JSON.stringify({
                            error: "Invalid state or it expired.",
                            statusCode: 400
                        })
                    );
            }
        }

        if (token?.length > 10 && token?.length < 1000) {
            spotify.setRefreshToken(token);

            return spotify.refreshAccessToken()
                .then(({ body }) => {
                    body.expires_in = Date.now() + body.expires_in * 1000;

                    response.end(
                        JSON.stringify(body)
                    );
                })
                .catch(({ statusCode, body }) =>
                    response.status(statusCode)
                        .end(
                            JSON.stringify({
                                statusCode,
                                body
                            })
                        )
                );
        }

        return response.status(400)
            .end(
                JSON.stringify({
                    error: "Invalid form data.",
                    statusCode: 400
                })
            );
    }
}
