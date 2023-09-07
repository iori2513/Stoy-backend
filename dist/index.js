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
require("./fixTsPath");
var express_1 = __importDefault(require("express"));
var process = __importStar(require("process"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3444;
app.use(express_1.default.json());
var paths = ['/auth'];
for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
    var path = paths_1[_i];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(path, require("./controllers".concat(path)));
}
app.get('/', function (req, res) {
    return res.send('no path');
});
app.listen(port, function () { return console.log("Example app listening on port ".concat(port, "!")); });
