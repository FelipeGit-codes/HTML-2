/**
 * Motor de Efeitos Visuais Maliketh (Destined Death FX)
 * Controla os cortes de energia vermelha e cinzas pretas via Canvas API
 */
class MalikethFX {
    constructor() {
        this.canvas = document.getElementById('malikethCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.cuts = [];
        
        this.init();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    init() {
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Dispara o efeito de "Morte Destinada" na tela
     */
    triggerSlashingEffect() {
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Cria linhas de corte na diagonal pela tela
        for (let i = 0; i < 3; i++) {
            this.cuts.push({
                startX: Math.random() * width,
                startY: Math.random() * height,
                endX: Math.random() * width,
                endY: Math.random() * height,
                progress: 0,
                speed: 0.08 + Math.random() * 0.05,
                width: 3 + Math.random() * 4
            });
        }

        // Gera rajadas de partículas escuras e vermelhas
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: width / 2 + (Math.random() - 0.5) * 300,
                y: height / 2 + (Math.random() - 0.5) * 300,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - Math.random() * 4,
                size: Math.random() * 4 + 1,
                color: Math.random() > 0.4 ? '#ff1a1a' : '#111111',
                alpha: 1,
                decay: 0.015 + Math.random() * 0.02
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Desenhar e atualizar os cortes da espada do Maliketh
        for (let i = this.cuts.length - 1; i >= 0; i--) {
            const cut = this.cuts[i];
            cut.progress += cut.speed;

            if (cut.progress >= 1) {
                this.cuts.splice(i, 1);
                continue;
            }

            const currentX = cut.startX + (cut.endX - cut.startX) * cut.progress;
            const currentY = cut.startY + (cut.endY - cut.startY) * cut.progress;

            this.ctx.strokeStyle = '#ff1a1a';
            this.ctx.lineWidth = cut.width;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#ff0000';
            this.ctx.beginPath();
            this.ctx.moveTo(cut.startX, cut.startY);
            this.ctx.lineTo(currentX, currentY);
            this.ctx.stroke();
        }

        // Resetar propriedades de sombra para não pesar as partículas
        this.ctx.shadowBlur = 0;

        // 2. Desenhar e atualizar as cinzas pretas/vermelhas corrosivas
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1.0;

        requestAnimationFrame(() => this.animate());
    }
}

/**
 * Orquestrador da Aplicação (Engine de Negócio da Tabuada)
 */
class TabuadaApp {
    constructor(fxEngine) {
        this.fx = fxEngine;
        this.form = document.getElementById('tabuadaForm');
        this.btnLimpar = document.getElementById('btnLimpar');
        this.numeroInput = document.getElementById('numero');
        this.operacaoSelect = document.getElementById('operacao');
        this.limiteInput = document.getElementById('limite');
        this.resultadoDiv = document.getElementById('resultado');

        // Estrutura de cálculo profissional sem estruturas condicionais aninhadas
        this.operacoesMap = {
            multiplicacao: { sinal: '×', calc: (a, b) => a * b },
            adicao: { sinal: '+', calc: (a, b) => a + b },
            subtracao: { sinal: '−', calc: (a, b) => a - b },
            divisao: { 
                sinal: '÷', 
                calc: (a, b) => b === 0 ? 'Invalido' : (a / b).toFixed(2).replace('.00', '') 
            }
        };

        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.btnLimpar.addEventListener('click', () => this.resetApp());
    }

    handleSubmit(event) {
        event.preventDefault();
        this.fx.triggerSlashingEffect(); // Executa o ataque visual do Maliketh

        const rawNumero = this.numeroInput.value.trim();
        const rawLimite = this.limiteInput.value.trim();
        const operacaoKey = this.operacaoSelect.value;

        if (!rawNumero || isNaN(rawNumero)) {
            this.renderError('Runa Inválida. Tente novamente.');
            return;
        }

        const numero = parseInt(rawNumero, 10);
        const limite = rawLimite ? Math.clamp(parseInt(rawLimite, 10), 1, 100) : 10;

        this.calcular(numero, operacaoKey, limite);
    }

    calcular(numero, operacaoKey, limite) {
        this.limparVisual();
        const op = this.operacoesMap[operacaoKey];

        const titulo = document.createElement('h2');
        titulo.className = 'result-title';
        titulo.textContent = `Feitiço Conjurado: ${numero}`;
        this.resultadoDiv.appendChild(titulo);

        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= limite; i++) {
            const row = document.createElement('p');
            row.className = 'result-row';
            // Escalonamento de animação (Stagger) para efeito cascata de corte
            row.style.animationDelay = `${i * 0.04}s`; 
            
            const resultado = op.calc(numero, i);
            row.textContent = `${numero} ${op.sinal} ${i} = ${resultado}`;
            
            fragment.appendChild(row);
        }

        this.resultadoDiv.appendChild(fragment);
        this.resultadoDiv.classList.add('active');
    }

    renderError(mensagem) {
        this.limparVisual();
        const erro = document.createElement('p');
        erro.className = 'error-message';
        erro.textContent = mensaje;
        this.resultadoDiv.appendChild(erro);
        this.resultadoDiv.classList.add('active');
    }

    limparVisual() {
        this.resultadoDiv.innerHTML = '';
        this.resultadoDiv.classList.remove('active');
    }

    resetApp() {
        this.fx.triggerSlashingEffect();
        this.form.reset();
        this.limparVisual();
    }
}

// Polyfill utilitário de segurança matemática
Math.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Inicialização Limpa do Sistema Global
document.addEventListener('DOMContentLoaded', () => {
    const fxEngine = new MalikethFX();
    new TabuadaApp(fxEngine);
});