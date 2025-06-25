export default class ConfiguracaoPartida{
    #idPrimeiroJogar: string
    #maxTempoAcumulado: number|null
    #resetarTempoPorJogada: boolean

    get idPrimeiroJogar(): string{
        return this.#idPrimeiroJogar
    }

    get maxTempoAcumulado(): number|null{
        return this.#maxTempoAcumulado
    }

    get resetarTempoPorJogada(): boolean{
        return this.#resetarTempoPorJogada
    }
    
    constructor(idPrimeiroJogar: string, maxTempoAcumulado: number|null, resetarTempoPorJogada: boolean){
        this.#idPrimeiroJogar = idPrimeiroJogar
        this.#maxTempoAcumulado = maxTempoAcumulado
        this.#resetarTempoPorJogada = resetarTempoPorJogada
    }
}