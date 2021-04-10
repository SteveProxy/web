import NodeCache from "node-cache";

import { Endpoint } from "./Endpoint";

const cache = new NodeCache({
    stdTTL: 5 * 60 * 1000,
    maxKeys: 250
});

export class VK extends Endpoint {

    constructor() {
        super("/vk", "get");
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
                    error: "Invalid form data."
                })
            );
    }
}
