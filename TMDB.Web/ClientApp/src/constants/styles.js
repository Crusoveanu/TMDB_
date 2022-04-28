"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerRowCenterStyle = exports.containerStyles = void 0;
var react_1 = require("@emotion/react");
// eslint-disable-next-line import/prefer-default-export
var containerStyles = function () { return (0, react_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 1600px;\n  width: 100%;\n  margin: 0 auto;\n"], ["\n  max-width: 1600px;\n  width: 100%;\n  margin: 0 auto;\n"]))); };
exports.containerStyles = containerStyles;
var containerRowCenterStyle = function () { return (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))); };
exports.containerRowCenterStyle = containerRowCenterStyle;
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map