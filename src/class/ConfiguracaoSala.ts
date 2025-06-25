export default class ConfiguracaoSala{
    #nomeSala: string
    #senha: string
    #idDono: string|null
    #capacidadeMax: number
    
    get nomeSala(){
        return this.#nomeSala
    }

    get idDono(){
        return this.#idDono
    }

    get senha(){
        return this.#senha
    }

    get capacidadeMax(){
        return this.#capacidadeMax
    }
    
    constructor(nomeSala: string, senha: string, idDono: string|null, capacidadeMax: number){
        this.#nomeSala = nomeSala
        this.#senha = senha
        this.#idDono = idDono
        this.#capacidadeMax = capacidadeMax
    }

    public publica(){
        return this.#senha.length > 0
    }

}