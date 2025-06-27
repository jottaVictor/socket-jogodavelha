import Jogador from '../../dist/src/class/Jogador'
import Utils from '../../dist/src/class/Utils'

test("jogador entra em uma sala", (done) => {
    const jogador = new Jogador(Utils.gerarId(), "Jogador Testador", "")
    const webSocket = new WebSocket("ws://localhost:3000")

    webSocket.onopen = () => {
        webSocket.send(JSON.stringify({
            'tipo': 'conexaoSala',
            'dado': {
                'jogador': jogador
            }
        }))
    }

    webSocket.onmessage = ({data}) => {
        let mensagem = JSON.parse(data.toString())

        expect(mensagem.dado.sucesso === true).toBe(true)
        expect(mensagem.dado.idSala !== null).toBe(true)
        done()
    }
})