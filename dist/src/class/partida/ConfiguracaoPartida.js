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
var _ConfiguracaoPartida_idPrimeiroJogar, _ConfiguracaoPartida_maxTempoAcumulado, _ConfiguracaoPartida_resetarTempoPorJogada;
Object.defineProperty(exports, "__esModule", { value: true });
class ConfiguracaoPartida {
    get idPrimeiroJogar() {
        return __classPrivateFieldGet(this, _ConfiguracaoPartida_idPrimeiroJogar, "f");
    }
    get maxTempoAcumulado() {
        return __classPrivateFieldGet(this, _ConfiguracaoPartida_maxTempoAcumulado, "f");
    }
    get resetarTempoPorJogada() {
        return __classPrivateFieldGet(this, _ConfiguracaoPartida_resetarTempoPorJogada, "f");
    }
    constructor(idPrimeiroJogar, maxTempoAcumulado, resetarTempoPorJogada) {
        _ConfiguracaoPartida_idPrimeiroJogar.set(this, void 0);
        _ConfiguracaoPartida_maxTempoAcumulado.set(this, void 0);
        _ConfiguracaoPartida_resetarTempoPorJogada.set(this, void 0);
        __classPrivateFieldSet(this, _ConfiguracaoPartida_idPrimeiroJogar, idPrimeiroJogar, "f");
        __classPrivateFieldSet(this, _ConfiguracaoPartida_maxTempoAcumulado, maxTempoAcumulado, "f");
        __classPrivateFieldSet(this, _ConfiguracaoPartida_resetarTempoPorJogada, resetarTempoPorJogada, "f");
    }
}
_ConfiguracaoPartida_idPrimeiroJogar = new WeakMap(), _ConfiguracaoPartida_maxTempoAcumulado = new WeakMap(), _ConfiguracaoPartida_resetarTempoPorJogada = new WeakMap();
exports.default = ConfiguracaoPartida;
