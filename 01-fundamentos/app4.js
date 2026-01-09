console.log('Inicio de programa');    // 1

setTimeout(() => {                    // 5
  console.log('Primer Timeout');
}, 3000);


setTimeout(() => {                    // 3
  console.log('Segundo Timeout');
}, 1);


setTimeout(() => {                    // 4
  console.log('Tercer Timeout');
}, 0);


console.log('Fin de programa');       // 2