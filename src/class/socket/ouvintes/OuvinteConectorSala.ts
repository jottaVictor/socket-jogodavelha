import { WebSocket } from "ws";
import Mensagem from "../Mensagem";
import Ouvinte from "./Ouvinte";

export default class OuvinteConectorSala extends Ouvinte{
    public ouve(ws: WebSocket, mensagem: Mensagem){
        if(mensagem.tipo !== "conectaSala")
            return

        if(this.estaConectadoASala(ws))
            return
    }

    private estaConectadoASala(ws: WebSocket){
        return (ws as any).idSala
    }
}