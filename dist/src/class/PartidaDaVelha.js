"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControleTempoJogador_js_1 = __importDefault(require("./ControleTempoJogador.js"));
const RetornoGenerico_js_1 = __importDefault(require("./RetornoGenerico.js"));
class PartidaDaVelha {
    constructor(jogador1, jogador2, config) {
        this.finalizado = false;
        this.config = config;
        this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(null));
        this.jogadores = {
            [jogador1.id]: jogador1,
            [jogador2.id]: jogador2
        };
        this.controleTempoJogadores = this.config.maxTempoAcumulado !== null ? {
            [jogador1.id]: new ControleTempoJogador_js_1.default(this.config.maxTempoAcumulado, this.config.resetarTempoPorJogada),
            [jogador2.id]: new ControleTempoJogador_js_1.default(this.config.maxTempoAcumulado, this.config.resetarTempoPorJogada)
        } : null;
        if (this.controleTempoJogadores) {
            this.controleTempoJogadores[this.config.idPrimeiroJogar].cronometra();
        }
    }
    getAdversario(idJogador) {
        for (const [id] of Object.entries(this.jogadores)) {
            if (id != idJogador)
                return this.jogadores[id];
        }
        return null;
    }
    vezDoJogador(jogador) {
        return this.controleTempoJogadores[jogador.id].ativo();
    }
    tempoEsgotou(jogador) {
        return this.controleTempoJogadores[jogador.id].tempoEsgotou();
    }
    podeJogarPosicao(posicao) {
        return this.tabuleiro[posicao[0]][posicao[1]] === null;
    }
    encontraGanhador(posicao) {
        const returnFunc = new RetornoGenerico_js_1.default();
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
            if (this.tabuleiro[linha[0]][linha[1]] !== idJogador) {
                posicoesNulas = this.tabuleiro[linha[0]][linha[1]] === null ? true : posicoesNulas;
                ganhando[0] = false;
            }
            if (this.tabuleiro[coluna[0]][coluna[1]] !== idJogador) {
                posicoesNulas = this.tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[1] = false;
            }
            if (this.tabuleiro[i][i] !== idJogador) {
                posicoesNulas = this.tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[2] = false;
            }
            if (this.tabuleiro[i][2 - i] !== idJogador) {
                posicoesNulas = this.tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[3] = false;
            }
        }
        if (ganhando[0]) {
            returnFunc.mensagem = "O jogador " + this.jogadores[idJogador].nome + " ganhou preenchendo uma linha!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '1';
            return returnFunc;
        }
        if (ganhando[1]) {
            returnFunc.mensagem = "O jogador " + this.jogadores[idJogador].nome + " ganhou preenchendo uma coluna!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '2';
            return returnFunc;
        }
        if ((posicao[0] === posicao[1] && ganhando[2]) || (ganhando[3] && somaPosicao)) {
            returnFunc.mensagem = "O jogador " + this.jogadores[idJogador].nome + " ganhou preenchendo uma diagonal!";
            returnFunc.sucesso = true;
            returnFunc.codigo = '3';
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
        const returnFunc = new RetornoGenerico_js_1.default();
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
        if (this.finalizado) {
            returnFunc.codigo = '4';
            returnFunc.mensagem = "A partida já terminou. Comece uma nova partida para jogar.";
            return returnFunc;
        }
        returnFunc.codigo = '0';
        returnFunc.sucesso = true;
        return returnFunc;
    }
    processaJogada(jogador, posicao) {
        let returnFunc = this.validaPodeMarcar(jogador, posicao);
        if (returnFunc.codigo == '2') {
            this.finalizado = true;
            this.controleTempoJogadores[jogador.id].pausa();
        }
        if (!returnFunc.sucesso) {
            returnFunc.codigo = '1' + returnFunc.codigo;
            return returnFunc;
        }
        this.tabuleiro[posicao[0]][posicao[1]] = jogador.id;
        returnFunc = this.encontraGanhador(posicao);
        if (this.controleTempoJogadores)
            this.controleTempoJogadores[jogador.id].pausa();
        if (returnFunc.sucesso) {
            returnFunc.codigo = '2' + returnFunc.codigo;
            this.finalizado = true;
            return returnFunc;
        }
        if (this.controleTempoJogadores)
            this.controleTempoJogadores[this.getAdversario(jogador.id).id].cronometra();
        returnFunc = new RetornoGenerico_js_1.default();
        returnFunc.sucesso = true;
        returnFunc.codigo = '0';
        return returnFunc;
    }
    getTabuleiro() {
        return this.tabuleiro;
    }
}
exports.default = PartidaDaVelha;
