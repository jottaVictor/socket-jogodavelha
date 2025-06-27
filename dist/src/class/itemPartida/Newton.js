"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Newton_usado;
Object.defineProperty(exports, "__esModule", { value: true });
//a ideia é que em cada coluna esse item "puxe" todos os icones marcados (x/o) para a ultima coluna não marcada
class Newton {
    constructor() {
        _Newton_usado.set(this, false);
    }
    usarItem() {
        if (__classPrivateFieldGet(this, _Newton_usado, "f"))
            return;
        //usar item é uma jogada, adaptar partida pra receber um efeito de um item
        __classPrivateFieldSet(this, _Newton_usado, true, "f");
    }
}
_Newton_usado = new WeakMap();
exports.default = Newton;
