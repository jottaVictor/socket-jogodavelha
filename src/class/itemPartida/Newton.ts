import InterfaceItemPartida from "./InterfaceItemPartida"
import Partida from "../partida/Partida"
import Jogador from "../Jogador"

//a ideia é que em cada coluna esse item "puxe" todos os icones marcados (x/o) para a ultima coluna não marcada
export default class Newton implements InterfaceItemPartida{
    #usado: boolean = false

    public usarItem(){
        if(this.#usado)
            return

        //usar item é uma jogada, adaptar partida pra receber um efeito de um item
        this.#usado = true
    }
}