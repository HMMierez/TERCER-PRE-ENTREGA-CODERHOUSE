const botonConvertir = document.getElementById('convertir');
const entradaMonto = document.getElementById('monto');
const seleccionMonedaDesde = document.getElementById('monedaDesde');
const seleccionMonedaA = document.getElementById('monedaA');
const resultadoDiv = document.getElementById('resultado');

const tasasDeCambio = {
  ars: {
    usd:0.0029,
    eur:0.0026,
    uyu:0.11,
    brl: 0.014
  },
  usd: {
    ars: 349.98,
    eur: 0.92,
    uyu: 37.84,
    brl: 4.88
  },
  eur: {
    ars: 378.88,
    usd: 1.08,
    uyu: 40.97,
    brl: 5.28
  },
  uyu: {
    ars: 9.28,
    usd: 0.027,
    eur: 0.024,
    brl: 0.13
  },
  brl: {
    ars: 71.68,
    usd: 0.20,
    eur: 0.19,
    uyu: 7.75
  }
};

botonConvertir.addEventListener('click', () => {
  const monedaDesde = seleccionMonedaDesde.value;
  const monedaA = seleccionMonedaA.value;
  const monto = parseFloat(entradaMonto.value);

  if (isNaN(monto)) {
    resultadoDiv.textContent = 'Ingresa un monto válido';
    return;
  }

  if (tasasDeCambio[monedaDesde] && tasasDeCambio[monedaDesde][monedaA]) {
    const montoConvertido = monto * tasasDeCambio[monedaDesde][monedaA];
    resultadoDiv.textContent = `${monto.toFixed(2)} ${monedaDesde.toUpperCase()} equivalen a ${montoConvertido.toFixed(2)} ${monedaA.toUpperCase()}`;
    
    // Guardar resultado en el almacenamiento local 
    const resultadoJSON = JSON.stringify({
      montoOriginal: monto.toFixed(2),
      monedaDesde: monedaDesde.toUpperCase(),
      montoConvertido: montoConvertido.toFixed(2),
      monedaA: monedaA.toUpperCase()
    });
    localStorage.setItem('resultadoConversión', resultadoJSON);
  } else {
    resultadoDiv.textContent = 'Las tasas de conversión no están disponibles';
  }
});
// Mostrar el resultado almacenado en el almacenamiento local 
window.addEventListener('load', () => {
    const resultadoJSON = localStorage.getItem('resultadoConversión');
    if (resultadoJSON) {
      const resultadoObj = JSON.parse(resultadoJSON);
      resultadoDiv.textContent = `${resultadoObj.montoOriginal} ${resultadoObj.monedaDesde} equivalen a ${resultadoObj.montoConvertido} ${resultadoObj.monedaA}`;
    }
  });
  