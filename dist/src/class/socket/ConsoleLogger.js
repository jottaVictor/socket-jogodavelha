"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    constructor() {
        this.paraTodosDaSala = false;
        this.mensagemRecebida = null;
        this.mensagemRespota = null;
    }
    log() {
        console.log("=== Mensagem Recebida: ");
        console.dir(this.mensagemRecebida, { depth: null });
        console.log("=== Mensagem Resposta" + (this.paraTodosDaSala ? " enviada para todos da sala: " : ": "));
        console.dir(this.mensagemRespota, { depth: null });
    }
    logError(error) {
        console.log("Erro ao processar mensagem: ", error);
        console.log("MensagemRecebida: ");
        console.dir(this.mensagemRecebida, { depth: null });
    }
}
exports.default = ConsoleLogger;
