export default class ConfiguracaoSala{
    #nomeSala: string
    #senha: string
    #idDono: string|null
    #maxJogadores: number
    
    get nomeSala(){
        return this.#nomeSala
    }

    get idDono(){
        return this.#idDono
    }

    get senha(){
        return this.#senha
    }

    get maxJogadores(){
        return this.#maxJogadores
    }
    
    constructor(nomeSala: string, senha: string, idDono: string|null, maxJogadores: number){
        this.#nomeSala = nomeSala
        this.#senha = senha
        this.#idDono = idDono
        this.#maxJogadores = maxJogadores
    }

    public publica(){
        return this.#senha.length > 0
    }

}