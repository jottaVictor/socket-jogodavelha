import Jogador from './Jogador'
import { Tabuleiro } from './Partida'

export default class RegistroPartida{
    #id: string
    #jogadores: { [id: string]: Jogador }
    #ganhador: Jogador|null
    #tabuleiros: Tabuleiro[]
    #temposGastos: number[]

    get id(){
        return this.#id
    }

    get ganhador(){
        return this.#ganhador
    }

    get tabuleiros(){
        return this.#tabuleiros
    }
    
    get temposGastos(){
        return this.#temposGastos
    }

    constructor(id: string, jogadores: { [id: string]: Jogador }){
        this.#id = id
        this.#jogadores = jogadores
        this.#tabuleiros = [
            [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
        ]
        this.#temposGastos = [0]
        this.#ganhador = null
    }

    public pushRegistro(tabuleiro: Tabuleiro, temposGastos: number){
        this.#tabuleiros.push(tabuleiro.map(linha => [...linha]));
        this.#temposGastos.push(temposGastos)
    }

    public setGanhador(jogador: Jogador|null){
        this.#ganhador = jogador
    }
}