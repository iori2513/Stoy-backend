"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var process = __importStar(require("process"));
var path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({
    path: path_1.default.join(__dirname, '../config/.env'),
    debug: true
});
var UtilConfig = /** @class */ (function () {
    function UtilConfig() {
    }
    var _a, _b, _c, _d, _e, _f, _g;
    UtilConfig.portNumber = Number(process.env.PORT_NUMBER);
    UtilConfig.dbPassword = (_a = process.env.DB_PASSWORD) !== null && _a !== void 0 ? _a : '';
    UtilConfig.dbUsername = (_b = process.env.DB_USERNAME) !== null && _b !== void 0 ? _b : '';
    UtilConfig.dbName = (_c = process.env.DB_NAME) !== null && _c !== void 0 ? _c : '';
    UtilConfig.jwtPrivateKey = Buffer.from((_e = (_d = process.env.JWT_PRIVATE_KEY) === null || _d === void 0 ? void 0 : _d.replace(/\\n/g, '\n')) !== null && _e !== void 0 ? _e : '');
    UtilConfig.jwtPublicKey = Buffer.from((_g = (_f = process.env.JWT_PUBLIC_KEY) === null || _f === void 0 ? void 0 : _f.replace(/\\n/g, '\n')) !== null && _g !== void 0 ? _g : '');
    return UtilConfig;
}());
exports.default = UtilConfig;