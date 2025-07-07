import { WebSocketServer, WebSocket } from "ws"

import Utils from '../Utils'

import Sala from "../sala/Sala"
import Ouvinte from "./ouvintes/Ouvinte"
import ConfiguracaoSala from "src/class/sala/ConfiguracaoSala"
import Jogador from "src/class/Jogador"
import ConsoleLogger from "./ConsoleLogger"
import Mensagem from "./Mensagem"

export default class ServerSocketJogoDaVelha{
    #serverWebSocket: WebSocketServer
    #ouvintes: { [tipoMensagem: string]: Ouvinte }
    #salas: { [id: string]: Sala }

    get salas(){
        return this.#salas
    }

    constructor(ouvintes: { [tipoMensagem: string]: Ouvinte }, port: number){
        this.#ouvintes = ouvintes
        this.#salas = {}
        this.#serverWebSocket = new WebSocketServer({port})

        this.setServerEmOuvintes()
    }

    private setServerEmOuvintes(){
        for(const [id, ouvinte] of Object.entries(this.#ouvintes)){
            ouvinte.setServerSocketJogoDaVelha(this)
        }
    }

    public setupServer(){
        this.#serverWebSocket.on('connection', (ws: WebSocket, req: any) => {
            ws.on('message', (message: any) => {
                let mensagemRecebida = JSON.parse(message.toString())
                try{
                    this.processaMensagem(ws, mensagemRecebida)
                }catch (error){
                    const _log = new ConsoleLogger()
                    _log.mensagemRecebida = mensagemRecebida
                    _log.logError(error)
                }
            })
        })
    }
    
    public processaMensagem(ws: WebSocket, mensagem: any){
        if(!this.#ouvintes[mensagem.tipo])
            throw new Error("Não há resposta para a mensagem do tipo: " + mensagem.tipo)

        const respostaServer = this.#ouvintes[mensagem.tipo].ouve(ws, mensagem)
        
        if(respostaServer === undefined)
            throw new Error("Sem resposta para essa mensagem")
    }

    public enviaMensagemParaTodosDaSala(ws: WebSocket, mensagemRecebida: Mensagem, mensagemRespota: Mensagem){
        const _ws = ws as any
        if(_ws.dadosServer?.idSala !== null){
            const _consoleLogger = new ConsoleLogger()
            _consoleLogger.mensagemRecebida = mensagemRecebida
            _consoleLogger.mensagemRespota = mensagemRespota
            _consoleLogger.paraTodosDaSala = true

            const socketSala = this.#salas[_ws.dadosServer.idSala].webSockets
            for(const [id, socket] of Object.entries(socketSala)){
                socket.send(JSON.stringify(mensagemRespota))
            }

            _consoleLogger.log()
        }
    }

    public enviaMensagem(ws: WebSocket, mensagemRecebida: Mensagem, mensagemRespota: Mensagem, ){
        ws.send(JSON.stringify(mensagemRespota))
        const _consoleLogger = new ConsoleLogger()
        _consoleLogger.mensagemRecebida = mensagemRecebida
        _consoleLogger.mensagemRespota = mensagemRespota
        _consoleLogger.paraTodosDaSala = true
        _consoleLogger.log()
    }

    public criaSala(configuracaoSala: ConfiguracaoSala){
        const sala = new Sala(Utils.gerarId(), configuracaoSala)
        this.#salas[sala.id] = sala

        return sala.id
    }

    public removerJogadorDeSala(jogador: Jogador){

    }
}