const escolhas = document.querySelectorAll('.escolha');
const resultado = document.getElementById('resultado');
const pontuacaoJogador = document.getElementById('pontuacao-jogador');
const pontuacaoMaquina = document.getElementById('pontuacao-maquina');
const botaoResetar = document.getElementById('resetar');
let pontosJogador = 0;
let pontosMaquina = 0;
function tocarSom(som) {
    try {
        if (som && typeof som.play === 'function') {
            som.play().catch(err => {
                console.log("Não foi possível reproduzir o som:", err);
            });
        }
    } catch (err) {
        console.log("Erro ao tentar reproduzir o som:", err);
    }
}
const sons = {
    click: null,
    vitoria: null
};
try {
    sons.click = new Audio('click.mp3');  
    sons.vitoria = new Audio('vitoria.mp3'); 
} catch (err) {
    console.log("Não foi possível carregar os sons:", err);
}
escolhas.forEach(escolha => {
    escolha.addEventListener('click', () => {
        tocarSom(sons.click);
        const escolhaJogador = escolha.id;
        const escolhaMaquina = gerarEscolhaMaquina();
        const vencedor = determinarVencedor(escolhaJogador, escolhaMaquina);

        mostrarResultado(escolhaJogador, escolhaMaquina, vencedor);
        atualizarPlacar(vencedor);
    });
});
botaoResetar.addEventListener('click', () => {
    tocarSom(sons.click);
    pontosJogador = 0;
    pontosMaquina = 0;
    pontuacaoJogador.textContent = '00';  
    pontuacaoMaquina.textContent = '00';
    resultado.innerHTML = '<p class="retro-text">SELECIONE SUA JOGADA!</p>';
    resultado.className = 'resultado';
});
function gerarEscolhaMaquina() {
    const opcoes = ['pedra', 'papel', 'tesoura'];
    const indiceAleatorio = Math.floor(Math.random() * 3);
    return opcoes[indiceAleatorio];
}


function determinarVencedor(escolhaJogador, escolhaMaquina) {
    if (escolhaJogador === escolhaMaquina) {
        return 'empate';
    }

    if (
        (escolhaJogador === 'pedra' && escolhaMaquina === 'tesoura') ||
        (escolhaJogador === 'papel' && escolhaMaquina === 'pedra') ||
        (escolhaJogador === 'tesoura' && escolhaMaquina === 'papel')
    ) {
        tocarSom(sons.vitoria);
        return 'jogador';
    }

    return 'maquina';
}
function mostrarResultado(escolhaJogador, escolhaMaquina, vencedor) {
    
    const emojis = {
        'pedra': '👊',
        'papel': '✋',
        'tesoura': '✌️'
    };
    resultado.className = 'resultado';
    const selecoes = document.createElement('div');
    selecoes.className = 'selecoes';
    selecoes.innerHTML = `
        <p class="retro-choice">VOCÊ: ${emojis[escolhaJogador]}</p>
        <p class="retro-choice">CPU: ${emojis[escolhaMaquina]}</p>
    `;
    let mensagem;
    if (vencedor === 'jogador') {
        mensagem = 'VITÓRIA!';
        resultado.classList.add('vitoria');
        
        resultado.style.animation = 'blink 0.5s 3';
    } else if (vencedor === 'maquina') {
        mensagem = 'DERROTA!';
        resultado.classList.add('derrota');
    } else {
        mensagem = 'EMPATE!';
        resultado.classList.add('empate');
    }
    resultado.innerHTML = '';
    const mensagemElement = document.createElement('p');
    mensagemElement.className = 'retro-message';
    mensagemElement.textContent = mensagem;
    resultado.appendChild(mensagemElement);
    resultado.appendChild(selecoes);

    
    resultado.style.opacity = '0';
    setTimeout(() => {
        resultado.style.opacity = '1';
        resultado.style.transition = 'opacity 0.3s';
    }, 100);
}
function atualizarPlacar(vencedor) {
    if (vencedor === 'jogador') {
        pontosJogador++;

      pontuacaoJogador.textContent = pontosJogador.toString().padStart(2, '0');
    } else if (vencedor === 'maquina') {
        pontosMaquina++;

        pontuacaoMaquina.textContent = pontosMaquina.toString().padStart(2, '0');
    }
}
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    .retro-message {
        font-family: 'Courier New', monospace;
        font-weight: bold;
        font-size: 24px;
        letter-spacing: 2px;
    }
    .retro-choice {
        font-family: 'Courier New', monospace;
        font-size: 20px;
        letter-spacing: 1px;
    }
`;
document.head.appendChild(style);