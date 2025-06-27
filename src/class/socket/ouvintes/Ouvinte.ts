import Mensagem from "../Mensagem"
import { WebSocket } from 'ws'

export default abstract class Ouvinte{
    public ouve(ws: WebSocket, mensagem: Mensagem){
        console.log("ouvindo...")
    }
}