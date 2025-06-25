export default class Jogador{
    #id;
    #nome;
    #perfil_url;
    
    get id(): string{
        return this.#id
    }

    get nome(): string{
        return this.#nome
    }

    constructor(id: string, nome: string, perfil_url: string|null) {
        this.#id = id
        this.#nome = nome
        this.#perfil_url = perfil_url
    }
}