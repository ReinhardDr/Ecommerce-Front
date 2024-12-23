"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/settings";
exports.ids = ["pages/api/settings"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./lib/mongoose.js":
/*!*************************!*\
  !*** ./lib/mongoose.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mongooseConnect\": () => (/* binding */ mongooseConnect)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction mongooseConnect() {\n    if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.readyState) === 1) {\n        return mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.asPromise();\n    } else {\n        const uri = process.env.MONGODB_URI;\n        return mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(uri);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvbW9uZ29vc2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRXpCLFNBQVNDLGtCQUFrQjtJQUNoQyxJQUFJRCx1RUFBOEIsS0FBSyxHQUFHO1FBQ3hDLE9BQU9BLG9FQUE2QjtJQUN0QyxPQUFPO1FBQ0wsTUFBTUssTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxXQUFXO1FBQ25DLE9BQU9SLHVEQUFnQixDQUFDSztJQUMxQixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Vjb21tZXJjZS1mcm9udC8uL2xpYi9tb25nb29zZS5qcz8xNjNkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb25nb29zZUNvbm5lY3QoKSB7XHJcbiAgaWYgKG1vbmdvb3NlLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG4gICAgcmV0dXJuIG1vbmdvb3NlLmNvbm5lY3Rpb24uYXNQcm9taXNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xyXG4gICAgcmV0dXJuIG1vbmdvb3NlLmNvbm5lY3QodXJpKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJtb25nb29zZUNvbm5lY3QiLCJjb25uZWN0aW9uIiwicmVhZHlTdGF0ZSIsImFzUHJvbWlzZSIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./lib/mongoose.js\n");

/***/ }),

/***/ "(api)/./models/Setting.js":
/*!***************************!*\
  !*** ./models/Setting.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Setting\": () => (/* binding */ Setting)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst settingSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    value: {\n        type: Object\n    }\n}, {\n    timestamps: true\n});\nconst Setting = mongoose__WEBPACK_IMPORTED_MODULE_0__.models?.Setting || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"Setting\", settingSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvU2V0dGluZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFFL0MsTUFBTUcsZ0JBQWdCLElBQUlELDRDQUFNQSxDQUFDO0lBQy9CRSxNQUFNO1FBQUNDLE1BQUtDO1FBQVFDLFVBQVUsSUFBSTtRQUFFQyxRQUFRLElBQUk7SUFBQTtJQUNoREMsT0FBTztRQUFDSixNQUFLSztJQUFNO0FBQ3JCLEdBQUc7SUFBQ0MsWUFBWSxJQUFJO0FBQUE7QUFFYixNQUFNQyxVQUFVWCw0Q0FBTUEsRUFBRVcsV0FBV1osK0NBQUtBLENBQUMsV0FBV0csZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2Vjb21tZXJjZS1mcm9udC8uL21vZGVscy9TZXR0aW5nLmpzPzYyZDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttb2RlbCwgbW9kZWxzLCBTY2hlbWF9IGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3Qgc2V0dGluZ1NjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZX0sXHJcbiAgdmFsdWU6IHt0eXBlOk9iamVjdH0sXHJcbn0sIHt0aW1lc3RhbXBzOiB0cnVlfSk7XHJcblxyXG5leHBvcnQgY29uc3QgU2V0dGluZyA9IG1vZGVscz8uU2V0dGluZyB8fCBtb2RlbCgnU2V0dGluZycsIHNldHRpbmdTY2hlbWEpOyJdLCJuYW1lcyI6WyJtb2RlbCIsIm1vZGVscyIsIlNjaGVtYSIsInNldHRpbmdTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwidmFsdWUiLCJPYmplY3QiLCJ0aW1lc3RhbXBzIiwiU2V0dGluZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./models/Setting.js\n");

/***/ }),

/***/ "(api)/./pages/api/settings.js":
/*!*******************************!*\
  !*** ./pages/api/settings.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongoose */ \"(api)/./lib/mongoose.js\");\n/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/Setting */ \"(api)/./models/Setting.js\");\n\n\nasync function handle(req, res) {\n    await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_0__.mongooseConnect)();\n    if (req.method === \"GET\") {\n        const { name  } = req.query;\n        res.json(await _models_Setting__WEBPACK_IMPORTED_MODULE_1__.Setting.findOne({\n            name\n        }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc2V0dGluZ3MuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStDO0FBQ047QUFFMUIsZUFBZUUsT0FBT0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDN0MsTUFBTUosOERBQWVBO0lBRXJCLElBQUlHLElBQUlFLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLE1BQU0sRUFBQ0MsS0FBSSxFQUFDLEdBQUdILElBQUlJLEtBQUs7UUFDeEJILElBQUlJLElBQUksQ0FBRSxNQUFNUCw0REFBZSxDQUFDO1lBQUNLO1FBQUk7SUFDdkMsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tbWVyY2UtZnJvbnQvLi9wYWdlcy9hcGkvc2V0dGluZ3MuanM/MjFiOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21vbmdvb3NlQ29ubmVjdH0gZnJvbSBcIkAvbGliL21vbmdvb3NlXCI7XHJcbmltcG9ydCB7U2V0dGluZ30gZnJvbSBcIkAvbW9kZWxzL1NldHRpbmdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShyZXEsIHJlcykge1xyXG4gIGF3YWl0IG1vbmdvb3NlQ29ubmVjdCgpO1xyXG5cclxuICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgIGNvbnN0IHtuYW1lfSA9IHJlcS5xdWVyeTtcclxuICAgIHJlcy5qc29uKCBhd2FpdCBTZXR0aW5nLmZpbmRPbmUoe25hbWV9KSApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJtb25nb29zZUNvbm5lY3QiLCJTZXR0aW5nIiwiaGFuZGxlIiwicmVxIiwicmVzIiwibWV0aG9kIiwibmFtZSIsInF1ZXJ5IiwianNvbiIsImZpbmRPbmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/settings.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/settings.js"));
module.exports = __webpack_exports__;

})();