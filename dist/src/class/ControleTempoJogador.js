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
var _ControleTempoJogador_tempoMaxAcumulado, _ControleTempoJogador_resetarTempoPorJogada, _ControleTempoJogador_tempoJogado, _ControleTempoJogador_tempoComecoJogada, _ControleTempoJogador_tempoFimJogada, _ControleTempoJogador_inTime;
Object.defineProperty(exports, "__esModule", { value: true });
class ControleTempoJogador {
    get tempoJogado() {
        return __classPrivateFieldGet(this, _ControleTempoJogador_tempoJogado, "f");
    }
    get tempoComecoJogada() {
        return __classPrivateFieldGet(this, _ControleTempoJogador_tempoComecoJogada, "f");
    }
    get tempoFimJogada() {
        return __classPrivateFieldGet(this, _ControleTempoJogador_tempoFimJogada, "f");
    }
    constructor(tempoMaxAcumulado, resetarTempoPorJogada) {
        _ControleTempoJogador_tempoMaxAcumulado.set(this, void 0);
        _ControleTempoJogador_resetarTempoPorJogada.set(this, void 0);
        _ControleTempoJogador_tempoJogado.set(this, void 0);
        _ControleTempoJogador_tempoComecoJogada.set(this, void 0);
        _ControleTempoJogador_tempoFimJogada.set(this, void 0);
        _ControleTempoJogador_inTime.set(this, void 0);
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoMaxAcumulado, tempoMaxAcumulado, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_resetarTempoPorJogada, resetarTempoPorJogada, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoJogado, 0, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoComecoJogada, 0, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoFimJogada, 0, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_inTime, false, "f");
    }
    cronometra() {
        if (__classPrivateFieldGet(this, _ControleTempoJogador_inTime, "f"))
            return;
        if (__classPrivateFieldGet(this, _ControleTempoJogador_resetarTempoPorJogada, "f"))
            __classPrivateFieldSet(this, _ControleTempoJogador_tempoJogado, 0, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoComecoJogada, Date.now(), "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoFimJogada, 0, "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_inTime, true, "f");
    }
    pausa() {
        if (!__classPrivateFieldGet(this, _ControleTempoJogador_inTime, "f"))
            return;
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoFimJogada, Date.now(), "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_tempoJogado, __classPrivateFieldGet(this, _ControleTempoJogador_tempoJogado, "f") + __classPrivateFieldGet(this, _ControleTempoJogador_tempoFimJogada, "f") - __classPrivateFieldGet(this, _ControleTempoJogador_tempoComecoJogada, "f"), "f");
        __classPrivateFieldSet(this, _ControleTempoJogador_inTime, false, "f");
    }
    tempoEsgotou() {
        return __classPrivateFieldGet(this, _ControleTempoJogador_tempoMaxAcumulado, "f") !== null && __classPrivateFieldGet(this, _ControleTempoJogador_tempoJogado, "f") > __classPrivateFieldGet(this, _ControleTempoJogador_tempoMaxAcumulado, "f");
    }
    ativo() {
        return __classPrivateFieldGet(this, _ControleTempoJogador_inTime, "f");
    }
}
_ControleTempoJogador_tempoMaxAcumulado = new WeakMap(), _ControleTempoJogador_resetarTempoPorJogada = new WeakMap(), _ControleTempoJogador_tempoJogado = new WeakMap(), _ControleTempoJogador_tempoComecoJogada = new WeakMap(), _ControleTempoJogador_tempoFimJogada = new WeakMap(), _ControleTempoJogador_inTime = new WeakMap();
exports.default = ControleTempoJogador;
