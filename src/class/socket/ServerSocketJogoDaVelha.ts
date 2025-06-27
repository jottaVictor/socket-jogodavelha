import { WebSocketServer, WebSocket } from "ws"

import Utils from '../Utils'

import Sala from "../sala/Sala"
import Ouvinte from "./ouvintes/Ouvinte"
import ConfiguracaoSala from "src/class/sala/ConfiguracaoSala"
import Jogador from "src/class/Jogador"
import ConsoleLogger from "./ConsoleLogger"
import Mensagem from "./Mensagem"

export default class ServerSocketJogoDaVelha{
    #serverSocket: WebSocketServer
    #ouvintes: { [tipoMensagem: string]: Ouvinte }
    #salas: { [id: string]: Sala }

    constructor(ouvintes: { [tipoMensagem: string]: Ouvinte }, port: number){
        this.#ouvintes = ouvintes
        this.#salas = {}
        this.#serverSocket = new WebSocketServer({port})
    }

    public setupServer(){
        this.#serverSocket.on('connection', (ws: WebSocket, req: any) => {
            ws.on('message', (message: any) => {
                let mensagemRecebida = JSON.parse(message.toString())
                
                let _consoleLogger = new ConsoleLogger()
                _consoleLogger.mensagemRecebida = mensagemRecebida

                try{
                    this.processaMensagem(ws, mensagemRecebida, _consoleLogger)
                }catch (error){
                    _consoleLogger.logError(error)
                }
            })
        })
    }
    
    public processaMensagem(ws: WebSocket, mensagem: any, _consoleLogger: ConsoleLogger){
        if(!this.#ouvintes[mensagem.tipo]){
            throw new Error("Não há resposta para a mensagem do tipo: " + mensagem.tipo)
        }

        const respostaServer = this.#ouvintes[mensagem.tipo].ouve(ws, mensagem)

        // if(respostaServer)

    }

    public enviaMensagemParaTodosDaSala(ws: WebSocket, mensagem: Mensagem, _consoleLogger: ConsoleLogger){
        const _ws = ws as any
        if(_ws.idSala !== null){
            _consoleLogger.mensagemRespota = mensagem
            _consoleLogger.paraTodosDaSala = true

            const socketSala = this.#salas[_ws.idSala].webSockets
            for(const [id, socket] of Object.entries(socketSala)){
                socket.send(JSON.stringify(mensagem))
            }

            _consoleLogger.log()
        }
    }

    public enviaMensagem(ws: WebSocket, mensagem: Mensagem, _consoleLogger: ConsoleLogger){
        ws.send(JSON.stringify(mensagem))
        _consoleLogger.mensagemRespota = mensagem
        _consoleLogger.log()
    }

    public criaSala(configuracaoSala: ConfiguracaoSala){
        const sala = new Sala(Utils.gerarId(), configuracaoSala)
        this.#salas[sala.id] = sala
    }

    public removerJogadorDeSala(jogador: Jogador){

    }
}