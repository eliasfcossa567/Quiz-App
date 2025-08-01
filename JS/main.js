import { Pergunta } from "./Pergunta.js";

const perguntas = [
    new Pergunta("Qual é a capital de Moçambique?", ["Nampula", "Cabo Delgado", "Maputo", "Inhambane"], "Maputo"),
    new Pergunta("A soma dos quadrados dos catetos é igual ao quadrado da hipotenusa. Este teorema pertence à?", ["Arquimedes", "Pitágoras", "Bháskara", "Newton"], "Pitágoras"),
    new Pergunta("Qual linguagem é usada para estilizar páginas web?", ["HTML", "CSS", "Javascript", "Python"], "CSS")
];

let headerPergunta = document.getElementById('campo-pergunta');
let mainOpcoes = document.getElementById('campo-opcoes');

let campoPergunta = `<h1>${perguntas[0].pergunta}`;
headerPergunta.innerHTML = campoPergunta;

let campoOpcoes = `<button class="opc-A">
                <p>A.</p>
                <p>${perguntas[0].opcoes[0]
                }</p>
            </button>
            <button class="opc-B">
                <p>B.</p>
                <p>${perguntas[0].opcoes[1]
                }</p>
            </button>
            <button class="opc-C">
                <p>C.</p>
                <p>${perguntas[0].opcoes[2]
                }</p>
            </button>
            <button class="opc-D">
                <p>D.</p>
                <p>${perguntas[0].opcoes[3]
                }</p>
            </button>`;
mainOpcoes.innerHTML = campoOpcoes;
