import serveStatic from "serve-static";
import express from "express";
import rateLimit from "express-rate-limit";

import { endpoints } from "./endpoints";

const app = express();

app.set("trust proxy", 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

endpoints.forEach((Endpoint) => {
    const endpoint = new Endpoint();

    app[endpoint.type](endpoint.path, endpoint.handler);
});

app.use("/*", serveStatic("./build", {
    maxAge: "1d"
}));

app.listen(3000, () => {
    console.log("[Steve] Listening.");
});
