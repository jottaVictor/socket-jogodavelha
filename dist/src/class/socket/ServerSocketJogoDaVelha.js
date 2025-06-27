"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ServerSocketJogoDaVelha_serverSocket, _ServerSocketJogoDaVelha_ouvintes, _ServerSocketJogoDaVelha_salas;
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Utils_1 = __importDefault(require("../Utils"));
const Sala_1 = __importDefault(require("../sala/Sala"));
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
class ServerSocketJogoDaVelha {
    constructor(ouvintes, port) {
        _ServerSocketJogoDaVelha_serverSocket.set(this, void 0);
        _ServerSocketJogoDaVelha_ouvintes.set(this, void 0);
        _ServerSocketJogoDaVelha_salas.set(this, void 0);
        __classPrivateFieldSet(this, _ServerSocketJogoDaVelha_ouvintes, ouvintes, "f");
        __classPrivateFieldSet(this, _ServerSocketJogoDaVelha_salas, {}, "f");
        __classPrivateFieldSet(this, _ServerSocketJogoDaVelha_serverSocket, new ws_1.WebSocketServer({ port }), "f");
    }
    setupServer() {
        __classPrivateFieldGet(this, _ServerSocketJogoDaVelha_serverSocket, "f").on('connection', (ws, req) => {
            ws.on('message', (message) => {
                let mensagemRecebida = JSON.parse(message.toString());
                let _consoleLogger = new ConsoleLogger_1.default();
                _consoleLogger.mensagemRecebida = mensagemRecebida;
                try {
                    this.processaMensagem(ws, mensagemRecebida, _consoleLogger);
                }
                catch (error) {
                    _consoleLogger.logError(error);
                }
            });
        });
    }
    processaMensagem(ws, mensagem, _consoleLogger) {
        if (!__classPrivateFieldGet(this, _ServerSocketJogoDaVelha_ouvintes, "f")[mensagem.tipo]) {
            throw new Error("Não há resposta para a mensagem do tipo: " + mensagem.tipo);
        }
        const respostaServer = __classPrivateFieldGet(this, _ServerSocketJogoDaVelha_ouvintes, "f")[mensagem.tipo].ouve(ws, mensagem);
        // if(respostaServer)
    }
    enviaMensagemParaTodosDaSala(ws, mensagem, _consoleLogger) {
        const _ws = ws;
        if (_ws.idSala !== null) {
            _consoleLogger.mensagemRespota = mensagem;
            _consoleLogger.paraTodosDaSala = true;
            const socketSala = __classPrivateFieldGet(this, _ServerSocketJogoDaVelha_salas, "f")[_ws.idSala].webSockets;
            for (const [id, socket] of Object.entries(socketSala)) {
                socket.send(JSON.stringify(mensagem));
            }
            _consoleLogger.log();
        }
    }
    enviaMensagem(ws, mensagem, _consoleLogger) {
        ws.send(JSON.stringify(mensagem));
        _consoleLogger.mensagemRespota = mensagem;
        _consoleLogger.log();
    }
    criaSala(configuracaoSala) {
        const sala = new Sala_1.default(Utils_1.default.gerarId(), configuracaoSala);
        __classPrivateFieldGet(this, _ServerSocketJogoDaVelha_salas, "f")[sala.id] = sala;
    }
    removerJogadorDeSala(jogador) {
    }
}
_ServerSocketJogoDaVelha_serverSocket = new WeakMap(), _ServerSocketJogoDaVelha_ouvintes = new WeakMap(), _ServerSocketJogoDaVelha_salas = new WeakMap();
exports.default = ServerSocketJogoDaVelha;
