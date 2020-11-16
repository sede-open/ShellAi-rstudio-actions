"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadArgs = exports.setupConnect = void 0;
const url_1 = require("url");
const core = __importStar(require("@actions/core"));
class ActionArgs {
    constructor() {
        this.apiKey = '';
        this.rsconnectPythonVersion = '';
        this.serverName = '';
        this.url = '';
    }
}
async function setupConnect(args) {
    // TODO: install rsconnect-python at specified version into tool
    // cache
}
exports.setupConnect = setupConnect;
function loadArgs() {
    const rawURL = core.getInput('url', { required: true });
    const rsconnectPythonVersion = core.getInput('rsconnect-python-version');
    const serverName = core.getInput('server-name');
    let apiKey = core.getInput('api-key');
    const apiKeySpecified = apiKey !== '';
    const url = new url_1.URL(rawURL);
    if (url.password !== '') {
        if (apiKeySpecified) {
            core.warning('using api key from URL password instead of api-key input');
        }
        apiKey = url.password;
    }
    else if (url.username !== '') {
        if (apiKeySpecified) {
            core.warning('using api key from URL username instead of api-key input');
        }
        apiKey = url.username;
    }
    url.password = '';
    url.username = '';
    const args = new ActionArgs();
    args.apiKey = apiKey;
    args.url = url.toString();
    args.rsconnectPythonVersion = rsconnectPythonVersion !== null && rsconnectPythonVersion !== void 0 ? rsconnectPythonVersion : 'latest';
    args.serverName = serverName !== null && serverName !== void 0 ? serverName : 'default';
    return args;
}
exports.loadArgs = loadArgs;