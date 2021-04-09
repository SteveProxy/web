import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

import { endpoints } from "./endpoints";

const app = express();

app.set("trust proxy", 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 250 // limit each IP
});

app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));

endpoints.forEach((Endpoint) => {
    const endpoint = new Endpoint();

    endpoint.types.forEach((type) => app[type](endpoint.path, endpoint[type]));
});

app.use(express.static("./build", {
    cacheControl: false
}));

const existsCache = [];

app.use((request, response) => {

    const file = request.path.split("/")
    file.shift();
    file.shift();

    const filePath = file.join("/");

    if (filePath === "") {
        return response.end(fs.readFileSync("./build/index.html"));
    }

    if (cacheExistsHas(filePath)) {
        response.end(fs.readFileSync("./build/" + filePath));
    } else {
        response.end(fs.readFileSync("./build/index.html"));
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("[Steve] Listening.");
});

function cacheExistsHas(url) {
    if (!existsCache[url]) {
        existsCache[url] = fs.existsSync("./build/" + url);
    }

    return existsCache[url];
}
