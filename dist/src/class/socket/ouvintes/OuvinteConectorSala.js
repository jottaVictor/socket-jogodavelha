"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ouvinte_1 = __importDefault(require("./Ouvinte"));
class OuvinteConectorSala extends Ouvinte_1.default {
    ouve(ws, mensagem) {
        if (mensagem.tipo !== "conectaSala")
            return;
        if (this.estaConectadoASala(ws))
            return;
    }
    estaConectadoASala(ws) {
        return ws.idSala;
    }
}
exports.default = OuvinteConectorSala;
