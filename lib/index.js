(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MockeryClient", [], factory);
	else if(typeof exports === 'object')
		exports["MockeryClient"] = factory();
	else
		root["MockeryClient"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encodes the given options.
 * Converts the response getters (get, post, etc.) from function declarations to strings.
 * This is because there is no way to pass a function to service worker using "postMessage".
 */
function encodeOptions(options) {
    var clonedOptions = Object.assign({}, options);
    var encodedRules = clonedOptions.rules.map(function (rule) {
        ['get', 'post', 'put', 'options', 'delete'].forEach(function (method) {
            if (rule.hasOwnProperty(method)) {
                rule[method] = rule[method].toString();
            }
        });
        return rule;
    });
    return {
        rules: encodedRules
    };
}
var MockeryClient = /** @class */ (function () {
    function MockeryClient(options) {
        /* Check if service worker is supported */
        if (!('serviceWorker' in navigator)) {
            throw new Error('Cannot create an instance of Mockery client: Service workers are not supported in the current environment (browser).');
        }
        this.serviceWorkerFilepath = './mockery-sw.js';
        this.options = options;
        return this;
    }
    /**
     * Starts the service worker for Mockery client.
     * Service worker is responsible for intercepting fetch requests and mocking their responses on the client side.
     */
    MockeryClient.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                /* Check if the service worker already exists */
                // const existingServiceWorker = await this.getServiceWorker();
                if (this.instance) {
                    throw new Error("Starting Mockery client failed. Respective service worker is already running. " + this.instance);
                }
                /* Register a new Service worker instance */
                return [2 /*return*/, navigator.serviceWorker.register(this.serviceWorkerFilepath, { scope: '/' })
                        .then(function (reg) {
                        var serviceWorker = reg.active || reg.installing || reg.waiting;
                        /* Send init message to the Service worker to pass encoded options */
                        serviceWorker.postMessage({
                            type: 'init',
                            options: encodeOptions(_this.options)
                        });
                        _this.instance = reg;
                    })
                        .catch(function (error) {
                        throw new Error("Starting Mockery client failed. " + error);
                    })];
            });
        });
    };
    /**
     * Stops currently running instance of Mockery Service Worker.
     */
    MockeryClient.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const serviceWorker = await this.getServiceWorker();
                if (!this.instance) {
                    return [2 /*return*/, console.warn('Cannot stop Mockery service worker: no service worker is running.')];
                }
                return [2 /*return*/, this.instance.unregister()];
            });
        });
    };
    return MockeryClient;
}());
exports.default = MockeryClient;


/***/ })
/******/ ]);
});