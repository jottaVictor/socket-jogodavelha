import Utils from '../dist/src/class/Utils'
import Jogador from "../dist/src/class/Jogador"
import Partida from '../dist/src/class/Partida'
import configPartida from '../dist/src/class/ConfiguracaoPartida'

const jogador1 = new Jogador(Utils.gerarId(), "Jogador n1", "https://olamundo.com")
const jogador2 = new Jogador(Utils.gerarId(), "Jogador n2", "https://olamundo.com")
const config = new configPartida(jogador1.id, null, false)

test("jogadas sendo feitas e registro de tabuleiro e tempos funcionando funcionando", (done) => {
    const partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [0, 0])
    partida.processaJogada(jogador2, [0, 1])
    partida.processaJogada(jogador1, [0, 2])

    setTimeout(() => {
        partida.processaJogada(jogador2, [1, 2])

        console.log(partida.registroPartida.temposGastos[4])
        expect(partida.registroPartida.temposGastos[4] > 200).toBe(true)
        done()
    }, 200)

    expect(partida.registroPartida.tabuleiros[1][0][0] === jogador1.id).toBe(true)
    expect(partida.registroPartida.tabuleiros[1][0][1] === jogador2.id).toBe(false)
    expect(partida.registroPartida.tabuleiros[2][0][1] === jogador2.id).toBe(true)
    expect(partida.registroPartida.tabuleiros[2][0][0] === jogador1.id).toBe(true)
    expect(partida.registroPartida.tabuleiros[3][0][2] === jogador1.id).toBe(true)
}, 8000)