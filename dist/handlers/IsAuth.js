"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function IsAuth(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401);
        res.json("Invalid Token");
        return false;
    }
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader && authorizationHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.BCRYPT_PASSWORD);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Invalid Token");
        return false;
    }
}
exports["default"] = IsAuth;
