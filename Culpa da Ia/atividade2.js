notas = [10, 10, 10]
console.log('notas: ')
console.log(notas)

console.log('\nExibindo o primeiro elemento: ')
console.log(notas[0])

console.log('\nExibindo o segundo elemento: ')
console.log(notas[1])

console.log('\nExibindo o terceiro elemento: ')
console.log(notas[2])

console.log('\nExibindo o quarto elemento: ')
console.log(notas[3])

console.log('\nAdicionando um elemento no final do vetor: ')
notas.push(10)
console.log(notas)

console.log('\nAdicionando um elemento no início do vetor: ')
notas.unshift(10)
console.log(notas)

console.log('\nRemover um elemento no final do vetor: ')
notas.pop()
console.log(notas)

console.log('\nRemover um elemento no início do vetor: ')
notas.shift()
console.log(notas)

// REMOVA APENAS O ÚLTIMO ELEMENTO DO VETOR
notas.pop()
console.log(notas)