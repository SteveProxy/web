import NodeCache from "node-cache";

import { Endpoint } from "./Endpoint";

const spotify = new NodeCache({
    stdTTL: 5 * 60 * 1000
});

export class Spotify extends Endpoint {

    constructor() {
        super("/spotify", "get");
    }

    handler(request, response, next) {
        const { query: { code, state } } = request;

        if ((code?.length > 20 && code?.length <= 500) && state?.length === 6) {
            spotify.set(state, code);

            console.log(spotify)

            return next();
        }

        return response.status(400)
            .end(
                JSON.stringify({
                    error: "Invalid form data."
                })
            );
    }
}

export class SpotifySwap extends Endpoint {

    constructor() {
        super("/spotify", "post");
    }

    handler({ body: { state } }, response) {
        if (state?.length === 6) {
            const code = spotify.take(state);

            if (code) {
                return response.end(
                        JSON.stringify({
                            code
                        })
                    );
            } else {
                return response.status(400)
                    .end(
                        JSON.stringify({
                            error: "Invalid state."
                        })
                    );
            }
        }

        return response.status(400)
            .end(
                JSON.stringify({
                    error: "Invalid form data."
                })
            );
    }
}
