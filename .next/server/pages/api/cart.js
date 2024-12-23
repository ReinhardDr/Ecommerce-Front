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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Product\": () => (/* binding */ Product)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// import mongoose, {model, Schema, models} from \"mongoose\";\n// const ProductSchema = new Schema({\n//   title: {type:String, required:true},\n//   description: String,\n//   topic:String,\n//   price: {type: Number, required: true},\n//   images: [{type:String}],\n//   category: {type:mongoose.Types.ObjectId, ref:'Category'},\n//   properties: {type:Object},\n// }, {\n//   timestamps: true,\n// });\n// export const Product = models.Product || model('Product', ProductSchema);\n\nconst ProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    title: {\n        type: String,\n        required: true\n    },\n    description: {\n        type: String\n    },\n    topic: [\n        {\n            text: {\n                type: String,\n                required: true\n            },\n            image: {\n                type: String\n            }\n        }\n    ],\n    price: {\n        type: Number,\n        required: true\n    },\n    images: {\n        type: [\n            String\n        ]\n    },\n    category: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),\n        ref: \"Category\"\n    },\n    properties: {\n        type: Object\n    }\n}, {\n    timestamps: true\n});\nconst Product = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.Product || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"Product\", ProductSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvUHJvZHVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBNEQ7QUFFNUQscUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6Qyx5QkFBeUI7QUFDekIsa0JBQWtCO0FBQ2xCLDJDQUEyQztBQUMzQyw2QkFBNkI7QUFDN0IsOERBQThEO0FBQzlELCtCQUErQjtBQUMvQixPQUFPO0FBQ1Asc0JBQXNCO0FBQ3RCLE1BQU07QUFFTiw0RUFBNEU7QUFDbkI7QUFDekQsTUFBTUksZ0JBQWdCLElBQUlKLHdEQUFlLENBQUM7SUFDeENLLE9BQU87UUFBRUMsTUFBTUM7UUFBUUMsVUFBVSxJQUFJO0lBQUM7SUFDdENDLGFBQWE7UUFBRUgsTUFBTUM7SUFBTztJQUM1QkcsT0FBTztRQUNMO1lBQ0VDLE1BQU07Z0JBQUVMLE1BQU1DO2dCQUFRQyxVQUFVLElBQUk7WUFBQztZQUNyQ0ksT0FBTztnQkFBRU4sTUFBTUM7WUFBTztRQUN4QjtLQUNEO0lBQ0RNLE9BQU87UUFBRVAsTUFBTVE7UUFBUU4sVUFBVSxJQUFJO0lBQUM7SUFDdENPLFFBQVE7UUFBRVQsTUFBTTtZQUFDQztTQUFPO0lBQUM7SUFDekJTLFVBQVU7UUFBRVYsTUFBTU4sdUVBQThCO1FBQUVtQixLQUFLO0lBQVc7SUFDbEVDLFlBQVk7UUFBRWQsTUFBTWU7SUFBTztBQUM3QixHQUFHO0lBQ0RDLFlBQVksSUFBSTtBQUNsQjtBQUVPLE1BQU1DLFVBQVVwQixvREFBYyxJQUFJRiwrQ0FBS0EsQ0FBQyxXQUFXRyxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLWZyb250Ly4vbW9kZWxzL1Byb2R1Y3QuanM/MDljNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgbW9uZ29vc2UsIHttb2RlbCwgU2NoZW1hLCBtb2RlbHN9IGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuLy8gY29uc3QgUHJvZHVjdFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4vLyAgIHRpdGxlOiB7dHlwZTpTdHJpbmcsIHJlcXVpcmVkOnRydWV9LFxyXG4vLyAgIGRlc2NyaXB0aW9uOiBTdHJpbmcsXHJcbi8vICAgdG9waWM6U3RyaW5nLFxyXG4vLyAgIHByaWNlOiB7dHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZX0sXHJcbi8vICAgaW1hZ2VzOiBbe3R5cGU6U3RyaW5nfV0sXHJcbi8vICAgY2F0ZWdvcnk6IHt0eXBlOm1vbmdvb3NlLlR5cGVzLk9iamVjdElkLCByZWY6J0NhdGVnb3J5J30sXHJcbi8vICAgcHJvcGVydGllczoge3R5cGU6T2JqZWN0fSxcclxuLy8gfSwge1xyXG4vLyAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbi8vIH0pO1xyXG5cclxuLy8gZXhwb3J0IGNvbnN0IFByb2R1Y3QgPSBtb2RlbHMuUHJvZHVjdCB8fCBtb2RlbCgnUHJvZHVjdCcsIFByb2R1Y3RTY2hlbWEpO1xyXG5pbXBvcnQgbW9uZ29vc2UsIHttb2RlbCwgU2NoZW1hLCBtb2RlbHN9IGZyb20gXCJtb25nb29zZVwiO1xyXG5jb25zdCBQcm9kdWN0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGRlc2NyaXB0aW9uOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIHRvcGljOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LCAvLyBWxINuIGLhuqNuIHRyb25nIHRvcGljXHJcbiAgICAgIGltYWdlOiB7IHR5cGU6IFN0cmluZyB9LCAvLyBVUkwg4bqjbmggdHJvbmcgdG9waWMgKG7hur91IGPDsylcclxuICAgIH0sXHJcbiAgXSxcclxuICBwcmljZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgaW1hZ2VzOiB7IHR5cGU6IFtTdHJpbmddIH0sXHJcbiAgY2F0ZWdvcnk6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdDYXRlZ29yeScgfSxcclxuICBwcm9wZXJ0aWVzOiB7IHR5cGU6IE9iamVjdCB9LFxyXG59LCB7XHJcbiAgdGltZXN0YW1wczogdHJ1ZSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZHVjdCA9IG1vZGVscy5Qcm9kdWN0IHx8IG1vZGVsKCdQcm9kdWN0JywgUHJvZHVjdFNjaGVtYSk7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIm1vZGVsIiwiU2NoZW1hIiwibW9kZWxzIiwiUHJvZHVjdFNjaGVtYSIsInRpdGxlIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiZGVzY3JpcHRpb24iLCJ0b3BpYyIsInRleHQiLCJpbWFnZSIsInByaWNlIiwiTnVtYmVyIiwiaW1hZ2VzIiwiY2F0ZWdvcnkiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicHJvcGVydGllcyIsIk9iamVjdCIsInRpbWVzdGFtcHMiLCJQcm9kdWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./models/Product.js\n");

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