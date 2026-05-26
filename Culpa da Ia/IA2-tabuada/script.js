/**
 * Netrunner Engine - Canvas de Alta Frequência (Lucy Monowire + Sandevistan Afterimages)
 */
class CyberDeckFX {
    constructor() {
        this.canvas = document.getElementById('cyberDeckCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.wires = [];
        this.timeScale = 1.0; // Fator de desaceleração (Sandevistan)
        this.globalTime = 0;

        this.init();
        window.addEventListener('resize', () => this.resize());
        this.renderLoop();
    }

    init() { this.resize(); }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Ativa a dilatação temporal do Sandevistan
     */
    engageSandevistan() {
        this.timeScale = 0.15; // Desacelera o tempo para 15% da velocidade normal
        
        // Cria múltiplos chicotes de Monowire cruzando o espaço
        this.wires = [];
        for (let i = 0; i < 4; i++) {
            this.wires.push({
                yPos: this.canvas.height * Math.random(),
                amplitude: 50 + Math.random() * 100,
                frequency: 0.005 + Math.random() * 0.01,
                color: i % 2 === 0 ? '#00f0ff' : '#ff0055',
                speed: 0.05 + Math.random() * 0.05
            });
        }

        // Retorna ao fluxo normal de tempo após 1.5 segundos
        setTimeout(() => {
            this.timeScale = 1.0;
            this.wires = [];
        }, 1500);
    }

    renderLoop() {
        // Renderização com rastro cumulativo (Motion Blur do Sandevistan)
        this.ctx.fillStyle = `rgba(3, 3, 5, ${this.timeScale === 1.0 ? '0.3' : '0.08'})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.globalTime += this.timeScale;

        // Desenha as Linhas de Monowire da Lucy usando Matemática de Ondas Senoidais
        this.wires.forEach(wire => {
            this.ctx.strokeStyle = wire.color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            for (let x = 0; x < this.canvas.width; x += 5) {
                // Equação harmônica para as cordas cibernéticas
                const y = wire.yPos + Math.sin(x * wire.frequency + (this.globalTime * wire.speed)) * wire.amplitude;
                if (x === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        });

        requestAnimationFrame(() => this.renderLoop());
    }
}

/**
 * Core de Estado e Processamento de Dados (Reactive State Management)
 */
class NetrunnerApp {
    constructor(fxDeck) {
        this.fx = fxDeck;
        this.form = document.getElementById('cyberForm');
        this.btnLimpar = document.getElementById('btnLimpar');
        this.numeroInput = document.getElementById('numero');
        this.operacaoSelect = document.getElementById('operacao');
        this.limiteInput = document.getElementById('limite');
        this.terminal = document.getElementById('outputTerminal');

        // Estrutura Funcional Imutável (Substituição de condicionais estruturais)
        this.algoritmos = {
            mult: { char: '×', op: (a, b) => a * b },
            add:  { char: '+', op: (a, b) => a + b },
            sub:  { char: '−', op: (a, b) => a - b },
            div:  { char: '÷', op: (a, b) => b === 0 ? 'SYS_ERR' : (a / b).toFixed(2).replace('.00', '') }
        };

        this.registerListeners();
    }

    registerListeners() {
        this.form.addEventListener('submit', (e) => this.onCompile(e));
        this.btnLimpar.addEventListener('click', () => this.onPurge());
    }

    onCompile(event) {
        event.preventDefault();
        
        // Disparar implantes cibernéticos na GPU
        this.fx.engageSandevistan();
        document.body.classList.add('sandevistan-active');
        
        // Remove a classe de tremor após a normalização do tempo
        setTimeout(() => document.body.classList.remove('sandevistan-active'), 1500);

        const valNum = this.numeroInput.value.trim();
        const valLim = this.limiteInput.value.trim();

        if (!valNum || isNaN(valNum)) {
            this.printLog('CRITICAL_ERR // DATA_STREAM_CORRUPTED', true);
            return;
        }

        const num = parseInt(valNum, 10);
        const lim = valLim ? Math.min(Math.max(parseInt(valLim, 10), 1), 50) : 10;

        this.executarMatriz(num, this.operacaoSelect.value, lim);
    }

    executarMatriz(num, algoritmoKey, limite) {
        this.clearTerminal();
        const algoritmo = this.algoritmos[algoritmoKey];

        const frag = document.createDocumentFragment();

        // Linha de cabeçalho do log do terminal
        const logHeader = document.createElement('div');
        logHeader.className = 'cyber-row';
        logHeader.style.color = 'var(--neon-yellow)';
        logHeader.textContent = `INITIALIZING MATRIX // BLOCK: ${num}`;
        frag.appendChild(logHeader);

        for (let i = 1; i <= limite; i++) {
            const row = document.createElement('div');
            row.className = 'cyber-row';

            // Processamento isolado do cálculo
            const res = algoritmo.op(num, i);

            // Geração de String segura anti-injeção
            row.innerHTML = `<span>${num} ${algoritmo.char} ${i}</span> <span>= ${res}</span>`;
            frag.appendChild(row);
        }

        this.terminal.appendChild(frag);
        this.terminal.classList.add('active');
    }

    printLog(msg, isError = false) {
        this.clearTerminal();
        const el = document.createElement('div');
        el.className = 'cyber-row';
        el.style.color = isError ? 'var(--cyber-magenta)' : 'var(--matrix-green)';
        el.textContent = msg;
        this.terminal.appendChild(el);
        this.terminal.classList.add('active');
    }

    clearTerminal() {
        this.terminal.innerHTML = '';
        this.terminal.classList.remove('active');
    }

    onPurge() {
        this.fx.engageSandevistan();
        this.form.reset();
        this.clearTerminal();
    }
}

// Inicialização da pilha de execução principal
document.addEventListener('DOMContentLoaded', () => {
    const fxDeck = new CyberDeckFX();
    new NetrunnerApp(fxDeck);
});