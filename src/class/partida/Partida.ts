import Jogador from '../Jogador'
import ControleTempoJogador from './ControleTempoJogador'
import ConfiguracaoPartida from './ConfiguracaoPartida'
import RetornoGenerico from '../RetornoGenerico'
import RegistroPartida from './RegistroPartida'
import Utils from '../Utils'

export type Tabuleiro = (string | null)[][]
export type Posicao = [number, number]

export default class Partida{
    #jogadores: { [id: string]: Jogador }
    #tabuleiro: Tabuleiro
    #config: ConfiguracaoPartida
    #controleTempoJogadores: { [id: string]: ControleTempoJogador }
    #finalizado = false
    #ganhador: Jogador|null
    #registroPartida: RegistroPartida
    
    get finalizado(){
        return this.#finalizado
    }

    get tabuleiro(): Tabuleiro{
        return this.#tabuleiro
    }
    
    get ganhador(): Jogador|null{
        return this.#ganhador
    }

    get registroPartida(): RegistroPartida{
        return this.#registroPartida
    }

    constructor(jogador1: Jogador, jogador2: Jogador, config: ConfiguracaoPartida){
        this.#jogadores = {
            [jogador1.id]: jogador1,
            [jogador2.id]: jogador2
        }
        this.#tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(null))
        this.#config = config
        this.#controleTempoJogadores = {
            [jogador1.id]: new ControleTempoJogador(this.#config.maxTempoAcumulado, this.#config.resetarTempoPorJogada),
            [jogador2.id]: new ControleTempoJogador(this.#config.maxTempoAcumulado, this.#config.resetarTempoPorJogada)
        }
        this.#ganhador = null

        if(this.#controleTempoJogadores){
            this.#controleTempoJogadores[this.#config.idPrimeiroJogar].cronometra()
        }

        this.#registroPartida = new RegistroPartida(Utils.gerarId(), this.#jogadores)
    }

    private getAdversario(idJogador: string){
        for(const [id] of Object.entries(this.#jogadores)){
            if(id != idJogador)
                return this.#jogadores[id]
        }

        return null
    }

    private vezDoJogador(jogador: Jogador){
        return this.#controleTempoJogadores![jogador.id].ativo()
    }

    private tempoEsgotou(jogador: Jogador){
        return this.#controleTempoJogadores![jogador.id].tempoEsgotou()
    }

    private podeJogarPosicao(posicao: Posicao){
        return this.#tabuleiro[posicao[0]][posicao[1]] === null
    }

    private processaGanhador(idJogador: string){
        this.#ganhador = this.#jogadores[idJogador]
        this.#registroPartida.setGanhador(this.#jogadores[idJogador])
    }

    private defineGanhador(posicao: Posicao){
        const returnFunc = new RetornoGenerico()
        
        let somaPosicao = posicao[0] + posicao[1]
        let idJogador = this.tabuleiro[posicao[0]][posicao[1]]!
        let posicoesNulas = false

        const ganhando = [
            true, //linha
            true, //coluna
            true, //diagonal principal
            true  //diagonal secundária
        ]

        for(let i = 0; i < 3; i++){
            const linha = [posicao[0], i]
            const coluna = [i, posicao[0]]
            
            if(this.#tabuleiro[linha[0]][linha[1]] !== idJogador){
                posicoesNulas = this.#tabuleiro[linha[0]][linha[1]] === null ? true : posicoesNulas;
                ganhando[0] = false
            }
            
            if(this.#tabuleiro[coluna[0]][coluna[1]] !== idJogador){
                posicoesNulas = this.#tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[1] = false
            }

            if(this.#tabuleiro[i][i] !== idJogador){
                posicoesNulas = this.#tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[2] = false
            }

            if(this.#tabuleiro[i][2-i] !== idJogador){
                posicoesNulas = this.#tabuleiro[coluna[0]][coluna[1]] === null ? true : posicoesNulas;
                ganhando[3] = false
            }
        }

        if(ganhando[0]){
            returnFunc.mensagem = "O jogador " + this.#jogadores[idJogador].nome + " ganhou preenchendo uma linha!"
            returnFunc.sucesso = true
            returnFunc.codigo = '1'

            this.processaGanhador(idJogador)
            return returnFunc
        }
        
        if(ganhando[1]){
            returnFunc.mensagem = "O jogador " + this.#jogadores[idJogador].nome + " ganhou preenchendo uma coluna!"
            returnFunc.sucesso = true
            returnFunc.codigo = '2'

            this.processaGanhador(idJogador)
            return returnFunc
        }
        
        if((posicao[0] === posicao[1] && ganhando[2]) || (ganhando[3] && somaPosicao)){
            returnFunc.mensagem = "O jogador " + this.#jogadores[idJogador].nome + " ganhou preenchendo uma diagonal!"
            returnFunc.sucesso = true
            returnFunc.codigo = '3'

            this.processaGanhador(idJogador)
            return returnFunc
        }

        if(!posicoesNulas){
            returnFunc.mensagem = "O jogo acabou, não há mais espaços para jogar."
            returnFunc.sucesso = true
            returnFunc.codigo = '4'
        }

        return returnFunc
    }

    private validaPodeMarcar(jogador: Jogador, posicao: Posicao){
        const returnFunc = new RetornoGenerico()

        if(!this.vezDoJogador(jogador)){
            returnFunc.codigo = '1'
            returnFunc.mensagem = "Não é a vez do jogador " + jogador.nome
            return returnFunc
        }

        if(this.tempoEsgotou(jogador)){
            returnFunc.codigo = '2'
            returnFunc.mensagem = "Tempo para jogar encerrado."
            return returnFunc
        }

        if(!this.podeJogarPosicao(posicao)){
            returnFunc.codigo = '3'
            returnFunc.mensagem = "A posicao já foi preenchida."
            return returnFunc
        }

        if(this.#finalizado){
            returnFunc.codigo = '4'
            returnFunc.mensagem = "A partida já terminou. Comece uma nova partida para jogar."
            return returnFunc
        }

        returnFunc.codigo = '0'
        returnFunc.sucesso = true

        return returnFunc
    }

    private processaRegistro(tabuleiro: Tabuleiro, jogador: Jogador){
        if(this.#config.resetarTempoPorJogada)
            this.#registroPartida.pushRegistro(this.#tabuleiro, this.#controleTempoJogadores![jogador.id].tempoJogado)
        else
            this.#registroPartida.pushRegistro(this.#tabuleiro, this.#controleTempoJogadores![jogador.id].tempoFimJogada - this.#controleTempoJogadores![jogador.id].tempoComecoJogada)
    }

    public processaJogada(jogador: Jogador, posicao: Posicao){
        let returnFunc = this.validaPodeMarcar(jogador, posicao)
        
        if(returnFunc.codigo == '2'){
            this.#finalizado = true
            this.#controleTempoJogadores![jogador.id].pausa()
        }

        if(!returnFunc.sucesso){
            returnFunc.codigo = '1' + returnFunc.codigo
            return returnFunc
        }
        
        this.#tabuleiro[posicao[0]][posicao[1]] = jogador.id

        returnFunc = this.defineGanhador(posicao)
        
        this.#controleTempoJogadores[jogador.id].pausa()
        
        if(returnFunc.sucesso){
            returnFunc.codigo = '2' + returnFunc.codigo
            this.#finalizado = true
            return returnFunc
        }
        
        this.#controleTempoJogadores[this.getAdversario(jogador.id)!.id].cronometra()

        this.processaRegistro(this.tabuleiro, jogador)
        
        returnFunc = new RetornoGenerico()
        returnFunc.sucesso = true
        returnFunc.codigo = '0'

        return returnFunc
    }
}