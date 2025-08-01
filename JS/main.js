import { Pergunta } from "./Pergunta.js";

const perguntas = [
    new Pergunta("Qual é a capital de Moçambique?", ["Nampula", "Cabo Delgado", "Maputo", "Inhambane"], "Maputo"),
    new Pergunta("A soma dos quadrados dos catetos é igual ao quadrado da hipotenusa. Este teorema pertence à?", ["Arquimedes", "Pitágoras", "Bháskara", "Newton"], "Pitágoras"),
    new Pergunta("Qual linguagem é usada para estilizar páginas web?", ["HTML", "CSS", "Javascript", "Python"], "CSS")
];

let headerPergunta = document.getElementById('campo-pergunta');

let campoPergunta = `
    <div class="pergunta">
        <h1>${perguntas[0].pergunta}</h1>
    </div>
`;
headerPergunta.innerHTML = campoPergunta;
