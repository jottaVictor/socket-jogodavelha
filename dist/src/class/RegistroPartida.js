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
var _RegistroPartida_id, _RegistroPartida_jogadores, _RegistroPartida_ganhador, _RegistroPartida_tabuleiros, _RegistroPartida_temposGastos;
Object.defineProperty(exports, "__esModule", { value: true });
class RegistroPartida {
    get id() {
        return __classPrivateFieldGet(this, _RegistroPartida_id, "f");
    }
    get ganhador() {
        return __classPrivateFieldGet(this, _RegistroPartida_ganhador, "f");
    }
    get tabuleiros() {
        return __classPrivateFieldGet(this, _RegistroPartida_tabuleiros, "f");
    }
    get temposGastos() {
        return __classPrivateFieldGet(this, _RegistroPartida_temposGastos, "f");
    }
    constructor(id, jogadores) {
        _RegistroPartida_id.set(this, void 0);
        _RegistroPartida_jogadores.set(this, void 0);
        _RegistroPartida_ganhador.set(this, void 0);
        _RegistroPartida_tabuleiros.set(this, void 0);
        _RegistroPartida_temposGastos.set(this, void 0);
        __classPrivateFieldSet(this, _RegistroPartida_id, id, "f");
        __classPrivateFieldSet(this, _RegistroPartida_jogadores, jogadores, "f");
        __classPrivateFieldSet(this, _RegistroPartida_tabuleiros, [
            [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
        ], "f");
        __classPrivateFieldSet(this, _RegistroPartida_temposGastos, [0], "f");
        __classPrivateFieldSet(this, _RegistroPartida_ganhador, null, "f");
    }
    pushRegistro(tabuleiro, temposGastos) {
        __classPrivateFieldGet(this, _RegistroPartida_tabuleiros, "f").push(tabuleiro.map(linha => [...linha]));
        __classPrivateFieldGet(this, _RegistroPartida_temposGastos, "f").push(temposGastos);
    }
    setGanhador(jogador) {
        __classPrivateFieldSet(this, _RegistroPartida_ganhador, jogador, "f");
    }
}
_RegistroPartida_id = new WeakMap(), _RegistroPartida_jogadores = new WeakMap(), _RegistroPartida_ganhador = new WeakMap(), _RegistroPartida_tabuleiros = new WeakMap(), _RegistroPartida_temposGastos = new WeakMap();
exports.default = RegistroPartida;
