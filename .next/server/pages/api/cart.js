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
exports.id = "pages/api/cart";
exports.ids = ["pages/api/cart"];
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

/***/ "(api)/./models/Product.js":
/*!***************************!*\
  !*** ./models/Product.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Product\": () => (/* binding */ Product)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// import mongoose, {model, Schema, models} from \"mongoose\";\n// const ProductSchema = new Schema({\n//   title: {type:String, required:true},\n//   description: String,\n//   topic:String,\n//   price: {type: Number, required: true},\n//   images: [{type:String}],\n//   category: {type:mongoose.Types.ObjectId, ref:'Category'},\n//   properties: {type:Object},\n// }, {\n//   timestamps: true,\n// });\n// export const Product = models.Product || model('Product', ProductSchema);\n\nconst ProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    title: {\n        type: String,\n        required: true\n    },\n    description: {\n        type: String\n    },\n    topic: {\n        type: String,\n        required: true\n    },\n    price: {\n        type: Number,\n        required: true\n    },\n    images: {\n        type: [\n            String\n        ]\n    },\n    category: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),\n        ref: \"Category\"\n    },\n    properties: {\n        type: Object\n    }\n}, {\n    timestamps: true\n});\nconst Product = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.Product || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"Product\", ProductSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvUHJvZHVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBNEQ7QUFFNUQscUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6Qyx5QkFBeUI7QUFDekIsa0JBQWtCO0FBQ2xCLDJDQUEyQztBQUMzQyw2QkFBNkI7QUFDN0IsOERBQThEO0FBQzlELCtCQUErQjtBQUMvQixPQUFPO0FBQ1Asc0JBQXNCO0FBQ3RCLE1BQU07QUFFTiw0RUFBNEU7QUFDbkI7QUFDekQsTUFBTUksZ0JBQWdCLElBQUlKLHdEQUFlLENBQUM7SUFDeENLLE9BQU87UUFBRUMsTUFBTUM7UUFBUUMsVUFBVSxJQUFJO0lBQUM7SUFDdENDLGFBQWE7UUFBRUgsTUFBTUM7SUFBTztJQUM1QkcsT0FBTztRQUFFSixNQUFNQztRQUFRQyxVQUFVLElBQUk7SUFBQztJQUN0Q0csT0FBTztRQUFFTCxNQUFNTTtRQUFRSixVQUFVLElBQUk7SUFBQztJQUN0Q0ssUUFBUTtRQUFFUCxNQUFNO1lBQUNDO1NBQU87SUFBQztJQUN6Qk8sVUFBVTtRQUFFUixNQUFNTix1RUFBOEI7UUFBRWlCLEtBQUs7SUFBVztJQUNsRUMsWUFBWTtRQUFFWixNQUFNYTtJQUFPO0FBQzdCLEdBQUc7SUFDREMsWUFBWSxJQUFJO0FBQ2xCO0FBRU8sTUFBTUMsVUFBVWxCLG9EQUFjLElBQUlGLCtDQUFLQSxDQUFDLFdBQVdHLGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tbWVyY2UtZnJvbnQvLi9tb2RlbHMvUHJvZHVjdC5qcz8wOWM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBtb25nb29zZSwge21vZGVsLCBTY2hlbWEsIG1vZGVsc30gZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG4vLyBjb25zdCBQcm9kdWN0U2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbi8vICAgdGl0bGU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXHJcbi8vICAgZGVzY3JpcHRpb246IFN0cmluZyxcclxuLy8gICB0b3BpYzpTdHJpbmcsXHJcbi8vICAgcHJpY2U6IHt0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlfSxcclxuLy8gICBpbWFnZXM6IFt7dHlwZTpTdHJpbmd9XSxcclxuLy8gICBjYXRlZ29yeToge3R5cGU6bW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQsIHJlZjonQ2F0ZWdvcnknfSxcclxuLy8gICBwcm9wZXJ0aWVzOiB7dHlwZTpPYmplY3R9LFxyXG4vLyB9LCB7XHJcbi8vICAgdGltZXN0YW1wczogdHJ1ZSxcclxuLy8gfSk7XHJcblxyXG4vLyBleHBvcnQgY29uc3QgUHJvZHVjdCA9IG1vZGVscy5Qcm9kdWN0IHx8IG1vZGVsKCdQcm9kdWN0JywgUHJvZHVjdFNjaGVtYSk7XHJcbmltcG9ydCBtb25nb29zZSwge21vZGVsLCBTY2hlbWEsIG1vZGVsc30gZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmNvbnN0IFByb2R1Y3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICB0aXRsZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgZGVzY3JpcHRpb246IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgdG9waWM6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIHByaWNlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcclxuICBpbWFnZXM6IHsgdHlwZTogW1N0cmluZ10gfSxcclxuICBjYXRlZ29yeTogeyB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ0NhdGVnb3J5JyB9LFxyXG4gIHByb3BlcnRpZXM6IHsgdHlwZTogT2JqZWN0IH0sXHJcbn0sIHtcclxuICB0aW1lc3RhbXBzOiB0cnVlLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBQcm9kdWN0ID0gbW9kZWxzLlByb2R1Y3QgfHwgbW9kZWwoJ1Byb2R1Y3QnLCBQcm9kdWN0U2NoZW1hKTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwibW9kZWwiLCJTY2hlbWEiLCJtb2RlbHMiLCJQcm9kdWN0U2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJkZXNjcmlwdGlvbiIsInRvcGljIiwicHJpY2UiLCJOdW1iZXIiLCJpbWFnZXMiLCJjYXRlZ29yeSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwidGltZXN0YW1wcyIsIlByb2R1Y3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./models/Product.js\n");

/***/ }),

/***/ "(api)/./pages/api/cart.js":
/*!***************************!*\
  !*** ./pages/api/cart.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _lib_mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongoose */ \"(api)/./lib/mongoose.js\");\n/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/Product */ \"(api)/./models/Product.js\");\n\n\nasync function handle(req, res) {\n    await (0,_lib_mongoose__WEBPACK_IMPORTED_MODULE_0__.mongooseConnect)();\n    const ids = req.body.ids;\n    res.json(await _models_Product__WEBPACK_IMPORTED_MODULE_1__.Product.find({\n        _id: ids\n    }));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2FydC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFDTjtBQUUxQixlQUFlRSxPQUFPQyxHQUFHLEVBQUNDLEdBQUcsRUFBRTtJQUM1QyxNQUFNSiw4REFBZUE7SUFDckIsTUFBTUssTUFBTUYsSUFBSUcsSUFBSSxDQUFDRCxHQUFHO0lBQ3hCRCxJQUFJRyxJQUFJLENBQUMsTUFBTU4seURBQVksQ0FBQztRQUFDUSxLQUFJSjtJQUFHO0FBQ3RDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tbWVyY2UtZnJvbnQvLi9wYWdlcy9hcGkvY2FydC5qcz9kNmFjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bW9uZ29vc2VDb25uZWN0fSBmcm9tIFwiQC9saWIvbW9uZ29vc2VcIjtcclxuaW1wb3J0IHtQcm9kdWN0fSBmcm9tIFwiQC9tb2RlbHMvUHJvZHVjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlKHJlcSxyZXMpIHtcclxuICBhd2FpdCBtb25nb29zZUNvbm5lY3QoKTtcclxuICBjb25zdCBpZHMgPSByZXEuYm9keS5pZHM7XHJcbiAgcmVzLmpzb24oYXdhaXQgUHJvZHVjdC5maW5kKHtfaWQ6aWRzfSkpO1xyXG59Il0sIm5hbWVzIjpbIm1vbmdvb3NlQ29ubmVjdCIsIlByb2R1Y3QiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJpZHMiLCJib2R5IiwianNvbiIsImZpbmQiLCJfaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/cart.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/cart.js"));
module.exports = __webpack_exports__;

})();