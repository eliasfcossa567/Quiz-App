export class Pergunta {
    constructor(pergunta, opcoes, correcta) {
        this._pergunta = pergunta;
        this._opcoes = opcoes;
        this._correcta = correcta;
    }

    verificarResposta(resposta) {
        return resposta === this._correcta;
    }

    get pergunta() {
        return this._pergunta;
    }

    get opcoes() {
        return this._opcoes;
    }

    get correcta() {
        return this._correcta;
    }

    set pergunta(novaPergunta) {
        this._pergunta = novaPergunta;
    }

    set opcoes(novasOpcoes) {
        this._opcoes = novasOpcoes;
    }

    set correcta(novaCorrecta) {
        this._correcta = novaCorrecta;
    }

    randomOpcoes(opc){
        let indiceSorteado = Math.floor(Math.random()*opc.length);

        return indiceSorteado;
    }
}