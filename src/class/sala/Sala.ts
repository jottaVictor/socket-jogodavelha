import { WebSocket } from "ws";
import ConfiguracaoPartida from "../partida/ConfiguracaoPartida";
import ConfiguracaoSala from "./ConfiguracaoSala";
import Jogador from "../Jogador";
import Partida from "../partida/Partida";
import RegistroPartida from "../partida/RegistroPartida";
import RetornoGenerico from "../RetornoGenerico";

export default class Sala{
    #id: string
    #configuracaoSala: ConfiguracaoSala
    #websockets: { [id: string]: WebSocket }
    #jogadores: { [id: string]: Jogador } = {}
    #placar: { [id: string]: number } = {}
    #registroPartidas: { [id: string]: RegistroPartida } = {}
    #partidaAtual: Partida|null = null

    get id(){
        return this.#id
    }

    get webSockets(){
        return this.#websockets
    }

    get jogadores(){
        return this.#jogadores
    }

    constructor(id: string, configSala: ConfiguracaoSala){
        this.#id = id
        this.#configuracaoSala = configSala
        this.#websockets = {}
    }

    public adicionaJogador(ws: WebSocket, jogador: Jogador){
        if(!this.estaCheia() && !this.#jogadores[jogador.id]){
            (ws as any).serverData = {
                'idSala': this.id,
                'jogador': jogador
            }
            this.#websockets[jogador.id] = ws
            this.#jogadores[jogador.id] = jogador
            this.#placar[jogador.id] = 0
        }
    }

    public removeJogador(jogador: Jogador){
        if(this.#jogadores[jogador.id]){
            delete (this.#websockets[jogador.id] as any).serverData
            delete this.#websockets[jogador.id]
            delete this.#jogadores[jogador.id]
            delete this.#placar[jogador.id]
        }
    }

    public setDono(jogador: Jogador){
        const newConfig = new ConfiguracaoSala(this.#configuracaoSala.nomeSala, this.#configuracaoSala.senha, jogador.id, this.#configuracaoSala.maxJogadores)
        return this.#configuracaoSala = newConfig
    }

    public countJogadores(){
        return Object.keys(this.#jogadores).length
    }

    public estaCheia(){
        return this.countJogadores() == this.#configuracaoSala.maxJogadores
    }

    public setConfiguracaoSala(configuracaoSala: ConfiguracaoSala){
        this.#configuracaoSala = configuracaoSala
    }

    public processaInicioPartida(jogador: Jogador, idJogadores: string[] = [], configuracaoPartida: ConfiguracaoPartida){
        const returnFunc = new RetornoGenerico()

        if(this.#configuracaoSala.idDono === null || this.#configuracaoSala.idDono !== jogador.id){
            returnFunc.codigo = '1'
            returnFunc.mensagem = "Somente o dono da sala pode iniciar uma partida."
            return returnFunc
        }

        if(this.#partidaAtual !== null || this.#partidaAtual!.finalizado){
            returnFunc.codigo = '2'
            returnFunc.mensagem = "Há uma partida acontecendo."
            return returnFunc
        }

        else if(this.countJogadores() < 2){
            returnFunc.codigo = '3'
            returnFunc.mensagem = "É necessário que a sala tenha ao menos 2 jogadores para iniciar uma partida."
            return returnFunc
        }


        for(const id of idJogadores){
            if(!(id in this.#jogadores)){
                returnFunc.codigo = '4'
                returnFunc.mensagem = "Um dos Jogadores selecionados para a partida não estão em sala."

                return returnFunc
            }
        }

        if (this.#partidaAtual){
            this.insereRegistro(this.#partidaAtual)
        }
        
        this.#partidaAtual = new Partida(this.#jogadores[idJogadores[0]], this.#jogadores[idJogadores[0]], configuracaoPartida)
        
        returnFunc.codigo = '0'
        returnFunc.mensagem = "Partida criada, o primeiro movimento é do jogador " + this.#jogadores[configuracaoPartida.idPrimeiroJogar].nome
        returnFunc.sucesso = true
        return returnFunc
    }

    public insereRegistro(partida: Partida){
        const _registroPartida = partida.registroPartida
        this.#registroPartidas[_registroPartida.id] = _registroPartida
        if(_registroPartida.ganhador)
            this.#placar[_registroPartida.ganhador.id]++
    }
}