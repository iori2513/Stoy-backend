"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UtilConfig_1 = __importDefault(require("@src/utils/UtilConfig"));
var app = (0, express_1.default)();
var port = UtilConfig_1.default.portNumber || 3444;
app.use(express_1.default.json());
var paths = ['/auth'];
for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
    var path = paths_1[_i];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(path, require("./controllers".concat(path, ".ts")));
}
app.get('/', function (req, res) {
    return res.send('no path');
});
app.listen(port, function () { return console.log("Example app listening on port ".concat(port, "!")); });
