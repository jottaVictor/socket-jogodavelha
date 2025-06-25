export default class RetornoGenerico {
    public mensagem: string;
    public codigo: string;
    public dado: any;
    public sucesso: boolean;

    constructor(){
        this.mensagem = ""
        this.codigo = "0"
        this.dado = null
        this.sucesso = false
    }
}