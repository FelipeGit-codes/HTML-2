const VetorNumeros = [ 10, 20, 30, 40, 50 ]

console.log('Listando os elementos do vetor: ')
console.log(VetorNumeros)

console.log('\nMultiplicando cada elemento por 2: ')
const dobrados = VetorNumeros.map( n => n * 2)
console.log(dobrados)

console.log('\nFiltrando elementos impares: ')
VetorNumeros.push(1)
VetorNumeros.push(3)
const impares = VetorNumeros.filter( n => n % 2 == 1)
console.log(impares)

console.log('\nFiltrando elementos pares: ')
const pares = VetorNumeros.filter( n => n % 2 == 0)
console.log(pares)

console.log('\nFiltrando elementos negativos: ')
const negativos = VetorNumeros.filter( n => n < 0)
console.log(negativos)

console.log('\nFiltrando elementos positivos: ')
const positivos = VetorNumeros.filter( n => n > 0)
console.log(positivos)

console.log('\nSomando todos os elementos do vetor: ')
const total = VetorNumeros.reduce( (soma, atual) => soma + atual, 0)
console.log(total)
