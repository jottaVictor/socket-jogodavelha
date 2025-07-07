import { WebSocket } from "ws";
import Mensagem from "../Mensagem";
import Ouvinte from "./Ouvinte";
import RetornoGenerico from "src/class/RetornoGenerico";
import Jogador from "src/class/Jogador";

export default class OuvinteConexaoSala extends Ouvinte{
    public ouve(ws: WebSocket, mensagem: Mensagem){
        if(mensagem.tipo !== "conexaoSala" || this.serverSocketJogoDaVelha === null)
            return

        const mensagemRespota = new RetornoGenerico()

        if(this.estaConectadoASala(ws, mensagem.dado.jogador)){
            mensagemRespota.mensagem = "Você foi encontrado em uma sala."
            mensagemRespota.codigo   = '1'
            mensagemRespota.sucesso  = true
            mensagemRespota.dado     =  {
                ...(ws as any).dadosServer,
                'jogador': mensagem.dado.jogador
            }

            this.serverSocketJogoDaVelha.enviaMensagem(ws, mensagem, {
                'tipo': "conexaoSala",
                'dado': mensagemRespota
            })
            return new Mensagem('conexaoSala', mensagemRespota)
        }

        if(this.serverSocketJogoDaVelha.salas[mensagem.dado.idSala].estaCheia()){
            mensagemRespota.mensagem = "A sala atingiu a capacidade máxima."
            mensagemRespota.codigo   = '2'
            
            this.serverSocketJogoDaVelha.enviaMensagem(ws, mensagem, {
                'tipo': "conexaoSala",
                'dado': mensagemRespota
            })
            return new Mensagem('conexaoSala', mensagemRespota)
        }

        this.serverSocketJogoDaVelha.salas[mensagem.dado.idSala].adicionaJogador(ws, mensagem.dado.jogador)

        mensagemRespota.mensagem = "Jogador conectado a sala."
        mensagemRespota.codigo   = '0'
        mensagemRespota.sucesso  = true
        return new Mensagem('conexaoSala', mensagemRespota)
    }

    private estaConectadoASala(ws: WebSocket, jogador: Jogador){
        if(!(ws as any).dadosServer?.idSala || !this.serverSocketJogoDaVelha?.salas[(ws as any).dadosServer?.idSala]){
            return false
        } 
        
        const sala = this.serverSocketJogoDaVelha!.salas[(ws as any).dadosServer?.idSala]
        return jogador.id in sala.jogadores
    }
}