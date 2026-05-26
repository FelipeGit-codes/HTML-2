// Função que irá executar a tabuada quando clicar no botão btnGear.
function calcularTabuada() {
    // Pegando o valor do input HTML.
    const numeroInput = document.getElementById('numeroInput')
    let numero = parseInt(numeroInput.value)

    // Pega o elemneto onde a tabuada será exibida.
    const resultadoDiv = document.getElementById('resultadoTabuada')

    // Limpa o conteúdo anterior.
    resultadoDiv.innerHTML = ''

    // Adiciona um título para tabuada.
    resultadoDiv.innerHTML += `<h2>Tabuada do número${numero}: </h2>`

    // Laço de repetição para calcular a tabuada de 1 á 10.
    for (let i = 0; i <= 10; i++) {
    const resultado = numero * i
    resultadoDiv.innerHTML += `<p>${numero} x ${i} = ${resultado}</p>`
    }
}
const btnGear = document.getElementById('btnGear')
btnGear.addEventListener('click', gerarTabuada)