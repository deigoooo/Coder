/* const promediar = (a,b) => (a+b)/2
const p = promediar(4,8)
console.log(p) */

//sin llaves retorna una sola linea
/* const sumar = (a,b) => a + b
let op1 =46, op2 =57
let suma= sumar(op1,op2)
console.log(`La suma de ${op1} mas ${op2} es igual a ${sumar(op1,op2)}`) */

/* const getPersona = () =>({nombre:'juan', edad: 34})
console.log(getPersona()) */

const ejecutar = (unaFuncion, params) => unaFuncion(params)
const saludar = nombre => console.log(`saludos, ${nombre}`)
ejecutar(saludar, 'terricola')