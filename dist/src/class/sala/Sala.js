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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Sala_id, _Sala_configuracaoSala, _Sala_websockets, _Sala_jogadores, _Sala_placar, _Sala_registroPartidas, _Sala_partidaAtual;
Object.defineProperty(exports, "__esModule", { value: true });
const ConfiguracaoSala_1 = __importDefault(require("./ConfiguracaoSala"));
const Partida_1 = __importDefault(require("../partida/Partida"));
const RetornoGenerico_1 = __importDefault(require("../RetornoGenerico"));
class Sala {
    get id() {
        return __classPrivateFieldGet(this, _Sala_id, "f");
    }
    get webSockets() {
        return __classPrivateFieldGet(this, _Sala_websockets, "f");
    }
    constructor(id, configSala) {
        _Sala_id.set(this, void 0);
        _Sala_configuracaoSala.set(this, void 0);
        _Sala_websockets.set(this, void 0);
        _Sala_jogadores.set(this, {});
        _Sala_placar.set(this, {});
        _Sala_registroPartidas.set(this, {});
        _Sala_partidaAtual.set(this, null);
        __classPrivateFieldSet(this, _Sala_id, id, "f");
        __classPrivateFieldSet(this, _Sala_configuracaoSala, configSala, "f");
        __classPrivateFieldSet(this, _Sala_websockets, {}, "f");
    }
    adicionaJogador(ws, jogador) {
        if (!this.estaCheia() && !__classPrivateFieldGet(this, _Sala_jogadores, "f")[jogador.id]) {
            ws.serverData = {
                'idSala': this.id,
                'jogador': jogador
            };
            __classPrivateFieldGet(this, _Sala_websockets, "f")[jogador.id] = ws;
            __classPrivateFieldGet(this, _Sala_jogadores, "f")[jogador.id] = jogador;
            __classPrivateFieldGet(this, _Sala_placar, "f")[jogador.id] = 0;
        }
    }
    removeJogador(jogador) {
        if (__classPrivateFieldGet(this, _Sala_jogadores, "f")[jogador.id]) {
            delete __classPrivateFieldGet(this, _Sala_websockets, "f")[jogador.id].serverData;
            delete __classPrivateFieldGet(this, _Sala_websockets, "f")[jogador.id];
            delete __classPrivateFieldGet(this, _Sala_jogadores, "f")[jogador.id];
            delete __classPrivateFieldGet(this, _Sala_placar, "f")[jogador.id];
        }
    }
    setDono(jogador) {
        const newConfig = new ConfiguracaoSala_1.default(__classPrivateFieldGet(this, _Sala_configuracaoSala, "f").nomeSala, __classPrivateFieldGet(this, _Sala_configuracaoSala, "f").senha, jogador.id, __classPrivateFieldGet(this, _Sala_configuracaoSala, "f").maxJogadores);
        return __classPrivateFieldSet(this, _Sala_configuracaoSala, newConfig, "f");
    }
    countJogadores() {
        return Object.keys(__classPrivateFieldGet(this, _Sala_jogadores, "f")).length;
    }
    estaCheia() {
        return this.countJogadores() == __classPrivateFieldGet(this, _Sala_configuracaoSala, "f").maxJogadores;
    }
    setConfiguracaoSala(configuracaoSala) {
        __classPrivateFieldSet(this, _Sala_configuracaoSala, configuracaoSala, "f");
    }
    processaInicioPartida(jogador, idJogadores = [], configuracaoPartida) {
        const returnFunc = new RetornoGenerico_1.default();
        if (__classPrivateFieldGet(this, _Sala_configuracaoSala, "f").idDono === null || __classPrivateFieldGet(this, _Sala_configuracaoSala, "f").idDono !== jogador.id) {
            returnFunc.codigo = '1';
            returnFunc.mensagem = "Somente o dono da sala pode iniciar uma partida.";
            return returnFunc;
        }
        if (__classPrivateFieldGet(this, _Sala_partidaAtual, "f") !== null || __classPrivateFieldGet(this, _Sala_partidaAtual, "f").finalizado) {
            returnFunc.codigo = '2';
            returnFunc.mensagem = "Há uma partida acontecendo.";
            return returnFunc;
        }
        else if (this.countJogadores() < 2) {
            returnFunc.codigo = '3';
            returnFunc.mensagem = "É necessário que a sala tenha ao menos 2 jogadores para iniciar uma partida.";
            return returnFunc;
        }
        for (const id of idJogadores) {
            if (!(id in __classPrivateFieldGet(this, _Sala_jogadores, "f"))) {
                returnFunc.codigo = '4';
                returnFunc.mensagem = "Um dos Jogadores selecionados para a partida não estão em sala.";
                return returnFunc;
            }
        }
        if (__classPrivateFieldGet(this, _Sala_partidaAtual, "f")) {
            this.insereRegistro(__classPrivateFieldGet(this, _Sala_partidaAtual, "f"));
        }
        __classPrivateFieldSet(this, _Sala_partidaAtual, new Partida_1.default(__classPrivateFieldGet(this, _Sala_jogadores, "f")[idJogadores[0]], __classPrivateFieldGet(this, _Sala_jogadores, "f")[idJogadores[0]], configuracaoPartida), "f");
        returnFunc.codigo = '0';
        returnFunc.mensagem = "Partida criada, o primeiro movimento é do jogador " + __classPrivateFieldGet(this, _Sala_jogadores, "f")[configuracaoPartida.idPrimeiroJogar].nome;
        returnFunc.sucesso = true;
        return returnFunc;
    }
    insereRegistro(partida) {
        const _registroPartida = partida.registroPartida;
        __classPrivateFieldGet(this, _Sala_registroPartidas, "f")[_registroPartida.id] = _registroPartida;
        if (_registroPartida.ganhador)
            __classPrivateFieldGet(this, _Sala_placar, "f")[_registroPartida.ganhador.id]++;
    }
}
_Sala_id = new WeakMap(), _Sala_configuracaoSala = new WeakMap(), _Sala_websockets = new WeakMap(), _Sala_jogadores = new WeakMap(), _Sala_placar = new WeakMap(), _Sala_registroPartidas = new WeakMap(), _Sala_partidaAtual = new WeakMap();
exports.default = Sala;
