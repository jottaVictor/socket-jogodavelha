import Utils from '../dist/src/class/Utils'
import Jogador from "../dist/src/class/Jogador"
import Partida from '../dist/src/class/Partida'
import configPartida from '../dist/src/class/ConfiguracaoPartida'

const jogador1 = new Jogador(Utils.gerarId(), "Jogador n1", "https://olamundo.com")
const jogador2 = new Jogador(Utils.gerarId(), "Jogador n2", "https://olamundo.com")
const config = new configPartida(jogador1.id, 1000, false)

test("teste de falhas ao jogar", (done) => {
    const partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [0, 0])
    expect(partida.processaJogada(jogador1, [0, 1]).sucesso).toBe(false)

    expect(partida.processaJogada(jogador2, [0, 0]).sucesso).toBe(false)
    expect(partida.processaJogada(jogador2, [0, 2]).sucesso).toBe(true)

    setTimeout(() => {
        expect(partida.processaJogada(jogador1, [0, 0]).sucesso).toBe(false)
        expect(partida.processaJogada(jogador2, [1, 2]).sucesso).toBe(false)
        done()
    }, 2010)
}, 20000)

test("partida acaba", (done) => {
    let partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [2, 0])
    partida.processaJogada(jogador2, [1, 0])
    partida.processaJogada(jogador1, [2, 1])
    partida.processaJogada(jogador2, [1, 1])
    expect(partida.processaJogada(jogador1, [2, 2]).codigo).toBe("21")

    partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [0, 0])
    partida.processaJogada(jogador2, [1, 0])
    partida.processaJogada(jogador1, [1, 1])
    partida.processaJogada(jogador2, [0, 1])
    expect(partida.processaJogada(jogador1, [2, 2]).codigo).toBe("23")

    partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [0, 2])
    partida.processaJogada(jogador2, [1, 0])
    partida.processaJogada(jogador1, [1, 1])
    partida.processaJogada(jogador2, [0, 1])
    expect(partida.processaJogada(jogador1, [2, 0]).codigo).toBe("23")

    partida = new Partida(jogador1, jogador2, config)

    partida.processaJogada(jogador1, [0, 0])
    partida.processaJogada(jogador2, [0, 1])
    partida.processaJogada(jogador1, [0, 2])
    partida.processaJogada(jogador2, [1, 1])
    partida.processaJogada(jogador1, [1, 0])
    partida.processaJogada(jogador2, [2, 0])
    partida.processaJogada(jogador1, [1, 2])
    partida.processaJogada(jogador2, [2, 2])
    expect(partida.processaJogada(jogador1, [2, 1]).codigo).toBe("24")

    done()
})
// test("empate", (done) => {})