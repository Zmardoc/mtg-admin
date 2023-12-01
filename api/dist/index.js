"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const cors_1 = __importDefault(require("cors"));
const mongoClient_1 = require("./database/mongoClient");
const configEnv_1 = require("./config/configEnv");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '5mb' })); // TODO maybe this is not needed, when i send image
app.use((req, res, next) => {
    // For example, a GET request to `/test` will print "GET /test"
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use((0, cors_1.default)({
    origin: '*', // TODO change to env
}));
app.use(express_1.default.json());
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
(0, routes_1.default)(app);
(0, mongoClient_1.openConnection)();
app.listen(configEnv_1.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${configEnv_1.port}/api`);
});
//# sourceMappingURL=index.js.map