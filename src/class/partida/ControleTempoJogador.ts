export default class ControleTempoJogador{
    #tempoMaxAcumulado: number|null
    #resetarTempoPorJogada: boolean
    #tempoJogado: number
    #tempoComecoJogada: number
    #tempoFimJogada: number
    #inTime: boolean

    get tempoJogado(){
        return this.#tempoJogado
    }

    get tempoComecoJogada(){
        return this.#tempoComecoJogada
    }

    get tempoFimJogada(){
        return this.#tempoFimJogada
    }

    constructor(tempoMaxAcumulado: number|null, resetarTempoPorJogada: boolean){
        this.#tempoMaxAcumulado = tempoMaxAcumulado
        this.#resetarTempoPorJogada = resetarTempoPorJogada
        this.#tempoJogado = 0
        this.#tempoComecoJogada = 0
        this.#tempoFimJogada = 0
        this.#inTime = false
    }

    public cronometra(){
        if(this.#inTime)
            return

        if(this.#resetarTempoPorJogada)
            this.#tempoJogado = 0

        this.#tempoComecoJogada = Date.now()
        this.#tempoFimJogada = 0
        this.#inTime = true
    }

    public pausa(){
        if(!this.#inTime)
            return

        this.#tempoFimJogada = Date.now()
        this.#tempoJogado = this.#tempoJogado + this.#tempoFimJogada - this.#tempoComecoJogada!
        this.#inTime = false
    }

    public tempoEsgotou(){
        return this.#tempoMaxAcumulado !== null && this.#tempoJogado > this.#tempoMaxAcumulado
    }

    public ativo(){
        return this.#inTime
    }
}