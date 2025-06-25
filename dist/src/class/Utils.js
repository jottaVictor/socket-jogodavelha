"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static gerarId() {
        return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
    }
}
exports.default = Utils;
