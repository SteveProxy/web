import NodeCache from "node-cache";

import { Endpoint } from "./Endpoint";

const cache = new NodeCache({
    stdTTL: 5 * 60 * 1000,
    maxKeys: 250
});

export class VK extends Endpoint {

    constructor() {
        super("/vk", "post");
    }

    post({ body: { token, state } }, response) {
        if ((token?.length > 20 && token?.length <= 500) && state?.length === 6 && !cache.has(state)) {
            try {
                return cache.set(state, token);
            } catch {}
        }

        return response.status(400)
            .end(
                JSON.stringify({
                    error: "Invalid form data."
                })
            );
    }
}
