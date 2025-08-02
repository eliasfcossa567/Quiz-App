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


// Função para embaralhar um array (Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Gera as opções embaralhadas para a pergunta atual
const opcoesAleatorias = embaralhar([...perguntas[0].opcoes]);

// Monta os botões de opção usando as opções embaralhadas
let campoOpcoes = "";
for (let i = 0; i < opcoesAleatorias.length; i++) {
    campoOpcoes += `
        <button onclick="certoOuErrado(this)" id="opc-${String.fromCharCode(65 + i)}" class="opc">
            <p>${String.fromCharCode(65 + i)}.</p>
            <p class="nomeOpcao">${opcoesAleatorias[i]}</p>
        </button>
    `;
}
mainOpcoes.innerHTML = campoOpcoes;

/*
Explicação dos passos:
1. A função embaralhar embaralha o array de opções usando o algoritmo Fisher-Yates, garantindo que a ordem seja aleatória e sem repetições.
2. Criamos uma cópia das opções da pergunta atual e embaralhamos.
3. Usamos um loop para criar os botões, associando cada opção embaralhada a um botão diferente (A, B, C, D).
4. O HTML dos botões é inserido no elemento mainOpcoes, exibindo as opções de forma aleatória e sem repetições.
*/

// Função para verificar se a opção clicada está correta
function certoOuErrado(botao) {
    // Pega o texto da opção clicada
    let textoOpcao = botao.querySelector('.nomeOpcao').textContent;

    // Verifica se está correta usando o método da classe Pergunta
    if (perguntas[0].verificarResposta(textoOpcao)) {
        botao.classList.add('correcta');
    } else {
        botao.classList.add('errada');
        // Destaca a opção correta
        let textoOpcoes = document.querySelectorAll('.nomeOpcao');
        for (let i = 0; i < textoOpcoes.length; i++) {
            if (textoOpcoes[i].textContent === perguntas[0].correcta) {
                textoOpcoes[i].parentElement.classList.add('correcta');
            }
        }
    }
}
window.certoOuErrado = certoOuErrado;

/*
Explicação da lógica:
1. O onclick dos botões agora chama certoOuErrado(this), passando o botão clicado como argumento.
2. Dentro da função, pegamos o texto da opção clicada usando querySelector('.nomeOpcao').textContent.
3. Usamos o método verificarResposta da classe Pergunta para comparar o texto com a resposta correta.
4. Se estiver correta, adiciona a classe 'correcta' ao botão; se não, adiciona 'errado'.
Assim, apenas o botão clicado é marcado, e a verificação é feita corretamente.
*/

