const corsMiddleware = require("./corsMiddleware");
const databaseMiddleware = require("./databaseMiddleware");
const helmetMiddleware = require("./helmetMiddleware");
const morganMiddleware = require("./morganMiddleware");
const requestMiddleware = require("./requestMiddleware");
const bodyParserMiddleware = require("./bodyParserMiddleware");
const cookieParserMiddleware = require("./cookieParserMiddleware");

const useMiddleware = (app) => {
    morganMiddleware(app);
    bodyParserMiddleware(app);
    app.use(requestMiddleware);
    helmetMiddleware(app);
    corsMiddleware(app);
    cookieParserMiddleware(app);
    app.use(databaseMiddleware);
}

module.exports = useMiddleware;