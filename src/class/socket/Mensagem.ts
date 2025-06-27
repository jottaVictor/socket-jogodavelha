export default class Mensagem{
    public tipo: string
    public dado: any

    constructor(tipo: string, dado: any){
        this.tipo = tipo
        this.dado = dado
    }
}