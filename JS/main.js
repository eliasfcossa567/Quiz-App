import { perguntas } from "./perguntas.js";


let headerPergunta = document.getElementById('campo-pergunta');
let mainOpcoes = document.getElementById('campo-opcoes');
let pontosSpan = document.getElementById('pontos');
let indicePergunta = 0;
let pontos = 0;
const perguntasAleatorias = embaralhar([...perguntas]);
let btnIdea = document.getElementById('idea');
let btnDuasOpc = document.getElementById('duas-opc');
let btnAjuda = document.getElementById('ajuda');
let btnTroca = document.getElementById('troca');

// Função para embaralhar um array (Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function renderizarPergunta() {
    if (indicePergunta >= perguntasAleatorias.length) {
        headerPergunta.innerHTML = '<h1>Quiz finalizado!</h1>';
        mainOpcoes.innerHTML = '';
        return;
    }
    let perguntaAtual = perguntasAleatorias[indicePergunta];
    headerPergunta.innerHTML = `<h1>${perguntaAtual.pergunta}`;
    const opcoesAleatorias = embaralhar([...perguntaAtual.opcoes]);
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
}

function atualizarPontuacao() {
    if (pontosSpan) pontosSpan.textContent = pontos;
}

// Inicializa a primeira pergunta e pontuação
renderizarPergunta();
atualizarPontuacao();

/*
Explicação dos passos:
1. A função embaralhar embaralha o array de opções usando o algoritmo Fisher-Yates, garantindo que a ordem seja aleatória e sem repetições.
2. Criamos uma cópia das opções da pergunta atual e embaralhamos.
3. Usamos um loop para criar os botões, associando cada opção embaralhada a um botão diferente (A, B, C, D).
4. O HTML dos botões é inserido no elemento mainOpcoes, exibindo as opções de forma aleatória e sem repetições.
*/

// Função para verificar se a opção clicada está correta
function certoOuErrado(botao) {
    // Efeito de piscar
    let contaPiscas = 0;
    let piscaMax = 6; // 6 piscadas (3 vezes)
    let piscando = setInterval(() => {
        botao.classList.toggle('pisca');
        contaPiscas++;
        if (contaPiscas >= piscaMax) {
            clearInterval(piscando);
            botao.classList.remove('pisca');
            // Após piscar, aguarda 0.2s e mostra o resultado
            setTimeout(() => {
                let textoOpcao = botao.querySelector('.nomeOpcao').textContent;
                let perguntaAtual = perguntasAleatorias[indicePergunta];
                let acertou = perguntaAtual.verificarResposta(textoOpcao);
                if (acertou) {
                    botao.classList.add('correcta');
                    pontos += 10;
                    atualizarPontuacao();
                } else {
                    botao.classList.add('errada');
                    // Destaca a opção correta
                    let textoOpcoes = document.querySelectorAll('.nomeOpcao');
                    for (let i = 0; i < textoOpcoes.length; i++) {
                        if (textoOpcoes[i].textContent === perguntaAtual.correcta) {
                            textoOpcoes[i].parentElement.classList.add('correcta');
                        }
                    }
                }
                // Espera 1s e vai para a próxima pergunta
                setTimeout(() => {
                    indicePergunta++;
                    renderizarPergunta();
                }, 1000);
            }, 200);
        }
    }, 200);
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

//funções para as ferramentas:

// Idea: mostra a correta e avança para próxima questão
const ideaF = () => {
    let perguntaAtual = perguntasAleatorias[indicePergunta];
    let textoOpcoes = document.querySelectorAll('.nomeOpcao');
    for (let i = 0; i < textoOpcoes.length; i++) {
        if (textoOpcoes[i].textContent === perguntaAtual.correcta) {
            textoOpcoes[i].parentElement.classList.add('correcta');
        }
    }
    setTimeout(() => {
        indicePergunta++;
        renderizarPergunta();
    }, 1000);
};
if (btnIdea) btnIdea.onclick = ideaF;

// Duas Opc: remove duas opções erradas
const duasOpcF = () => {
    let perguntaAtual = perguntasAleatorias[indicePergunta];
    let textoOpcoes = document.querySelectorAll('.nomeOpcao');
    let erradas = [];
    for (let i = 0; i < textoOpcoes.length; i++) {
        if (textoOpcoes[i].textContent !== perguntaAtual.correcta) {
            erradas.push(textoOpcoes[i]);
        }
    }
    // Remove (esconde) duas erradas aleatórias
    embaralhar(erradas).slice(0, 2).forEach(el => {
        el.parentElement.style.visibility = 'hidden';
    });
};
if (btnDuasOpc) btnDuasOpc.onclick = duasOpcF;

// Ajuda: simula votação (mostra porcentagem maior na correta)
const ajudaF = () => {
    let perguntaAtual = perguntasAleatorias[indicePergunta];
    let textoOpcoes = document.querySelectorAll('.nomeOpcao');
    let votos = [10, 20, 30, 40];
    embaralhar(votos);
    for (let i = 0; i < textoOpcoes.length; i++) {
        let voto = votos.pop();
        if (textoOpcoes[i].textContent === perguntaAtual.correcta) {
            textoOpcoes[i].parentElement.innerHTML += `<span class='voto' style='color:yellow;font-weight:bold;'> ${Math.max(...votos, voto)}%</span>`;
        } else {
            textoOpcoes[i].parentElement.innerHTML += `<span class='voto' style='color:yellow;'> ${voto}%</span>`;
        }
    }
};
if (btnAjuda) btnAjuda.onclick = ajudaF;

// Troca: troca para próxima questão sem pontuar
const trocaF = () => {
    indicePergunta++;
    renderizarPergunta();
};
if (btnTroca) btnTroca.onclick = trocaF;
