"use strict";
const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;
/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "node",
    transform: Object.assign({}, tsJestTransformCfg),
};
