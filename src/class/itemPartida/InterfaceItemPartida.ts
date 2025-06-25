import Partida from "../partida/Partida";
import Jogador from "../Jogador"

//items será 
export default interface InterfaceItemPartida{
    usarItem(jogador: Jogador, partida: Partida): void
}