import Mensagem from "./Mensagem"

export default class ConsoleLogger{
    public mensagemRecebida: any
    public mensagemRespota: any
    public paraTodosDaSala: boolean = false
    
    constructor(){
        this.mensagemRecebida = null
        this.mensagemRespota = null
    }

    log(){
        console.log("=== Mensagem Recebida: ")
        console.dir(this.mensagemRecebida, {depth: null})
        console.log("=== Mensagem Resposta" + (this.paraTodosDaSala ? " enviada para todos da sala: " : ": "))
        console.dir(this.mensagemRespota, {depth: null})
    }

    logError(error: any){
        console.log("Erro ao processar mensagem: ", error)
        console.log("MensagemRecebida: ")
        console.dir(this.mensagemRecebida, {depth: null})
    }
}