import Mensagem from "../Mensagem"
import { WebSocket } from 'ws'
import ServerSocketJogoDaVelha from "../ServerSocketJogoDaVelha"

export default abstract class Ouvinte{
    protected serverSocketJogoDaVelha: ServerSocketJogoDaVelha | null = null

    public setServerSocketJogoDaVelha(serverSocketJogoDaVelha: ServerSocketJogoDaVelha){
        this.serverSocketJogoDaVelha = serverSocketJogoDaVelha
    }

    public ouve(ws: WebSocket, mensagem: Mensagem): Mensagem | void{
        console.log("ouvindo...")
        return new Mensagem('', {})
    }
}