"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var order_1 = __importDefault(require("./handlers/order"));
exports.app = (0, express_1["default"])();
var port = 3000;
exports.app.use(body_parser_1["default"].urlencoded({ extended: false }));
exports.app.use(body_parser_1["default"].json());
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, users_1["default"])(exports.app);
(0, products_1["default"])(exports.app);
(0, order_1["default"])(exports.app);
exports.app.listen(port, function () {
    console.log("starting app on: ".concat(port));
});
