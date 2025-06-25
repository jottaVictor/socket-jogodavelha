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
var _Jogador_id, _Jogador_nome, _Jogador_perfil_url;
Object.defineProperty(exports, "__esModule", { value: true });
class Jogador {
    get id() {
        return __classPrivateFieldGet(this, _Jogador_id, "f");
    }
    get nome() {
        return __classPrivateFieldGet(this, _Jogador_nome, "f");
    }
    constructor(id, nome, perfil_url) {
        _Jogador_id.set(this, void 0);
        _Jogador_nome.set(this, void 0);
        _Jogador_perfil_url.set(this, void 0);
        __classPrivateFieldSet(this, _Jogador_id, id, "f");
        __classPrivateFieldSet(this, _Jogador_nome, nome, "f");
        __classPrivateFieldSet(this, _Jogador_perfil_url, perfil_url, "f");
    }
}
_Jogador_id = new WeakMap(), _Jogador_nome = new WeakMap(), _Jogador_perfil_url = new WeakMap();
exports.default = Jogador;
