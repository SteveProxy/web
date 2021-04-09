export class Endpoint {

    constructor(path, types = "use") {
        if (!Array.isArray(types)) {
            types = [types];
        }

        this.path = path;
        this.types = types;
    }
}
