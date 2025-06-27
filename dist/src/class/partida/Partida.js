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
var _Partida_jogadores, _Partida_tabuleiro, _Partida_config, _Partida_controleTempoJogadores, _Partida_finalizado, _Partida_ganhador, _Partida_registroPartida;
Object.defineProperty(exports, "__esModule", { value: true });
const ControleTempoJogador_1 = __importDefault(require("./ControleTempoJogador"));
const RetornoGenerico_1 = __importDefault(require("../RetornoGenerico"));
const RegistroPartida_1 = __importDefault(require("./RegistroPartida"));
const Utils_1 = __importDefault(require("../Utils"));
class Partida {
    get finalizado() {
        return __classPrivateFieldGet(this, _Partida_finalizado, "f");
    }
    get tabuleiro() {
        return __classPrivateFieldGet(this, _Partida_tabuleiro, "f");
    }
    get ganhador() {
        return __classPrivateFieldGet(this, _Partida_ganhador, "f");
    }
    get registroPartida() {
        return __classPrivateFieldGet(this, _Partida_registroPartida, "f");
    }
    constructor(jogador1, jogador2, config) {
        _Partida_jogadores.set(this, void 0);
        _Partida_tabuleiro.set(this, void 0);
        _Partida_config.set(this, void 0);
        _Partida_controleTempoJogadores.set(this, void 0);
        _Partida_finalizado.set(this, false);
        _Partida_ganhador.set(this, void 0);
        _Partida_registroPartida.set(this, void 0);
        __classPrivateFieldSet(this, _Partida_jogadores, {
            [jogador1.id]: jogador1,
            [jogador2.id]: jogador2
        }, "f");
        __classPrivateFieldSet(this, _Partida_tabuleiro, Array.from({ length: 3 }, () => Array(3).fill(null)), "f");
        __classPrivateFieldSet(this, _Partida_config, config, "f");
        __classPrivateFieldSet(this, _Partida_controleTempoJogadores, {
            [jogador1.id]: new ControleTempoJogador_1.default(__classPrivateFieldGet(this, _Partida_config, "f").maxTempoAcumulado, __classPrivateFieldGet(this, _Partida_config, "f").resetarTempoPorJogada),
            [jogador2.id]: new ControleTempoJogador_1.default(__classPrivateFieldGet(this, _Partida_config, "f").maxTempoAcumulado, __classPrivateFieldGet(this, _Partida_config, "f").resetarTempoPorJogada)
        }, "f");
        __classPrivateFieldSet(this, _Partida_ganhador, null, "f");
        if (__classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")) {
            __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[__classPrivateFieldGet(this, _Partida_config, "f").idPrimeiroJogar].cronometra();
        }
        __classPrivateFieldSet(this, _Partida_registroPartida, new RegistroPartida_1.default(Utils_1.default.gerarId(), __classPrivateFieldGet(this, _Partida_jogadores, "f")), "f");
    }
    getAdversario(idJogador) {
        for (const [id] of Object.entries(__classPrivateFieldGet(this, _Partida_jogadores, "f"))) {
            if (id != idJogador)
                return __classPrivateFieldGet(this, _Partida_jogadores, "f")[id];
        }
        return null;
    }
    vezDoJogador(jogador) {
        return __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].ativo();
    }
    tempoEsgotou(jogador) {
        return __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].tempoEsgotou();
    }
    podeJogarPosicao(posicao) {
        return __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[posicao[0]][posicao[1]] === null;
    }
    processaGanhador(idJogador) {
        __classPrivateFieldSet(this, _Partida_ganhador, __classPrivateFieldGet(this, _Partida_jogadores, "f")[idJogador], "f");
        __classPrivateFieldGet(this, _Partida_registroPartida, "f").setGanhador(__classPrivateFieldGet(this, _Partida_jogadores, "f")[idJogador]);
    }
    defineGanhador(posicao) {
        const returnFunc = new RetornoGenerico_1.default();
        let somaPosicao = posicao[0] + posicao[1];
        let idJogador = this.tabuleiro[posicao[0]][posicao[1]];
        let posicoesNulas = false;
        const ganhando = [
            true, //linha
            true, //coluna
            true, //diagonal principal
            true //diagonal secundária
        ];
        for (let i = 0; i < 3; i++) {
            const linha = [posicao[0], i];
            const coluna = [i, posicao[0]];
            if (__classPrivateFieldGet(this, _Partida_tabuleiro, "f")[linha[0]][linha[1]] !== idJogador) {
                posicoesNulas = __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[linha[0]][linha[1]] === null ? true : posicoesNulas;
                ganhando[0] = false;
            }
            if (__classPrivateFieldGet(this, _Partida_tabuleiro, "f")[coluna[0]][coluna[1]] !== idJogador) {
                posicoesNulas = __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[1] = false;
            }
            if (__classPrivateFieldGet(this, _Partida_tabuleiro, "f")[i][i] !== idJogador) {
                posicoesNulas = __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[2] = false;
            }
            if (__classPrivateFieldGet(this, _Partida_tabuleiro, "f")[i][2 - i] !== idJogador) {
                posicoesNulas = __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[3] = false;
            }
        }
        if (ganhando[0]) {
            returnFunc.mensagem = "O jogador " + __classPrivateFieldGet(this, _Partida_jogadores, "f")[idJogador].nome + " ganhou preenchendo uma linha!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '1';
            this.processaGanhador(idJogador);
            return returnFunc;
        }
        if (ganhando[1]) {
            returnFunc.mensagem = "O jogador " + __classPrivateFieldGet(this, _Partida_jogadores, "f")[idJogador].nome + " ganhou preenchendo uma coluna!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '2';
            this.processaGanhador(idJogador);
            return returnFunc;
        }
        if ((posicao[0] === posicao[1] && ganhando[2]) || (ganhando[3] && somaPosicao)) {
            returnFunc.mensagem = "O jogador " + __classPrivateFieldGet(this, _Partida_jogadores, "f")[idJogador].nome + " ganhou preenchendo uma diagonal!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '3';
            this.processaGanhador(idJogador);
            return returnFunc;
        }
        if (!posicoesNulas) {
            returnFunc.mensagem = "O jogo acabou, não há mais espaços para jogar.";
            returnFunc.sucesso = true;
            returnFunc.codigo = '4';
        }
        return returnFunc;
    }
    validaPodeMarcar(jogador, posicao) {
        const returnFunc = new RetornoGenerico_1.default();
        if (!this.vezDoJogador(jogador)) {
            returnFunc.codigo = '1';
            returnFunc.mensagem = "Não é a vez do jogador " + jogador.nome;
            return returnFunc;
        }
        if (this.tempoEsgotou(jogador)) {
            returnFunc.codigo = '2';
            returnFunc.mensagem = "Tempo para jogar encerrado.";
            return returnFunc;
        }
        if (!this.podeJogarPosicao(posicao)) {
            returnFunc.codigo = '3';
            returnFunc.mensagem = "A posicao já foi preenchida.";
            return returnFunc;
        }
        if (__classPrivateFieldGet(this, _Partida_finalizado, "f")) {
            returnFunc.codigo = '4';
            returnFunc.mensagem = "A partida já terminou. Comece uma nova partida para jogar.";
            return returnFunc;
        }
        returnFunc.codigo = '0';
        returnFunc.sucesso = true;
        return returnFunc;
    }
    processaRegistro(tabuleiro, jogador) {
        if (__classPrivateFieldGet(this, _Partida_config, "f").resetarTempoPorJogada)
            __classPrivateFieldGet(this, _Partida_registroPartida, "f").pushRegistro(__classPrivateFieldGet(this, _Partida_tabuleiro, "f"), __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].tempoJogado);
        else
            __classPrivateFieldGet(this, _Partida_registroPartida, "f").pushRegistro(__classPrivateFieldGet(this, _Partida_tabuleiro, "f"), __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].tempoFimJogada - __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].tempoComecoJogada);
    }
    processaJogada(jogador, posicao) {
        let returnFunc = this.validaPodeMarcar(jogador, posicao);
        if (returnFunc.codigo == '2') {
            __classPrivateFieldSet(this, _Partida_finalizado, true, "f");
            __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].pausa();
        }
        if (!returnFunc.sucesso) {
            returnFunc.codigo = '1' + returnFunc.codigo;
            return returnFunc;
        }
        __classPrivateFieldGet(this, _Partida_tabuleiro, "f")[posicao[0]][posicao[1]] = jogador.id;
        returnFunc = this.defineGanhador(posicao);
        __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[jogador.id].pausa();
        if (returnFunc.sucesso) {
            returnFunc.codigo = '2' + returnFunc.codigo;
            __classPrivateFieldSet(this, _Partida_finalizado, true, "f");
            return returnFunc;
        }
        __classPrivateFieldGet(this, _Partida_controleTempoJogadores, "f")[this.getAdversario(jogador.id).id].cronometra();
        this.processaRegistro(this.tabuleiro, jogador);
        returnFunc = new RetornoGenerico_1.default();
        returnFunc.sucesso = true;
        returnFunc.codigo = '0';
        return returnFunc;
    }
}
_Partida_jogadores = new WeakMap(), _Partida_tabuleiro = new WeakMap(), _Partida_config = new WeakMap(), _Partida_controleTempoJogadores = new WeakMap(), _Partida_finalizado = new WeakMap(), _Partida_ganhador = new WeakMap(), _Partida_registroPartida = new WeakMap();
exports.default = Partida;
