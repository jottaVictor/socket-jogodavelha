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
var _ConfiguracaoSala_nomeSala, _ConfiguracaoSala_senha, _ConfiguracaoSala_idDono, _ConfiguracaoSala_capacidadeMax;
Object.defineProperty(exports, "__esModule", { value: true });
class ConfiguracaoSala {
    get nomeSala() {
        return __classPrivateFieldGet(this, _ConfiguracaoSala_nomeSala, "f");
    }
    get idDono() {
        return __classPrivateFieldGet(this, _ConfiguracaoSala_idDono, "f");
    }
    get senha() {
        return __classPrivateFieldGet(this, _ConfiguracaoSala_senha, "f");
    }
    get capacidadeMax() {
        return __classPrivateFieldGet(this, _ConfiguracaoSala_capacidadeMax, "f");
    }
    constructor(nomeSala, senha, idDono, capacidadeMax) {
        _ConfiguracaoSala_nomeSala.set(this, void 0);
        _ConfiguracaoSala_senha.set(this, void 0);
        _ConfiguracaoSala_idDono.set(this, void 0);
        _ConfiguracaoSala_capacidadeMax.set(this, void 0);
        __classPrivateFieldSet(this, _ConfiguracaoSala_nomeSala, nomeSala, "f");
        __classPrivateFieldSet(this, _ConfiguracaoSala_senha, senha, "f");
        __classPrivateFieldSet(this, _ConfiguracaoSala_idDono, idDono, "f");
        __classPrivateFieldSet(this, _ConfiguracaoSala_capacidadeMax, capacidadeMax, "f");
    }
    publica() {
        return __classPrivateFieldGet(this, _ConfiguracaoSala_senha, "f").length > 0;
    }
}
_ConfiguracaoSala_nomeSala = new WeakMap(), _ConfiguracaoSala_senha = new WeakMap(), _ConfiguracaoSala_idDono = new WeakMap(), _ConfiguracaoSala_capacidadeMax = new WeakMap();
exports.default = ConfiguracaoSala;
