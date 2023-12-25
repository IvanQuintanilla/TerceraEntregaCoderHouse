// Objeto para representar la calculadora
const calculadora = {
    historialCalculos: [],

    obtenerNumero: function(mensaje) {
        let userInput;
        do {
            userInput = prompt(mensaje);
        } while (isNaN(userInput) || userInput.trim() === ''); 
        return parseFloat(userInput);
    },

    mostrarHistorial: function() {
        const historialReverso = this.historialCalculos.slice().reverse();
        alert("Historial de cálculos:\n" + historialReverso.join("\n"));
    },

    filtrarHistorial: function(tipoOperacion) {
        return this.historialCalculos.filter(function(calculo) {
            // Modificado para que utilice el símbolo de la operación
            return calculo.includes(` ${tipoOperacion} `);
        });
    },

    suma: function() {
        const numeroA = this.obtenerNumero("Primer numero del calculo");
        const numeroB = this.obtenerNumero("Segundo numero del calculo");
        const resultado = numeroA + numeroB;
        alert(`${numeroA} + ${numeroB} = ${resultado}`);
        this.historialCalculos.unshift(`${numeroA} + ${numeroB} = ${resultado}`);
    },

    resta: function() {
        const numeroA = this.obtenerNumero("Primer numero del calculo");
        const numeroB = this.obtenerNumero("Segundo numero del calculo");
        const resultado = numeroA - numeroB;
        alert(`${numeroA} - ${numeroB} = ${resultado}`);
        this.historialCalculos.unshift(`${numeroA} - ${numeroB} = ${resultado}`);
    },

    division: function() {
        const numeroA = this.obtenerNumero("Primer numero del calculo");
        const numeroB = this.obtenerNumero("Segundo numero del calculo");
        const resultado = numeroA / numeroB;
        alert(`${numeroA} / ${numeroB} = ${resultado}`);
        this.historialCalculos.unshift(`${numeroA} / ${numeroB} = ${resultado}`);
    },

    multiplicacion: function() {
        const numeroA = this.obtenerNumero("Primer numero del calculo");
        const numeroB = this.obtenerNumero("Segundo numero del calculo");
        const resultado = numeroA * numeroB;
        alert(`${numeroA} x ${numeroB} = ${resultado}`);
        this.historialCalculos.unshift(`${numeroA} x ${numeroB} = ${resultado}`);
    },

    // Método principal que maneja el flujo de la calculadora
    ejecutarCalculadora: function() {
        let opcion;
        do {
            opcion = parseInt(prompt("Elige una operacion: \n 1 suma \n 2 resta \n 3 division \n 4 multiplicacion \n 5 historial \n 6 cerrar"));

            switch(opcion) {
                case 1:
                    this.suma();
                    break;
                case 2:
                    this.resta();
                    break;
                case 3:
                    this.division();
                    break;
                case 4:
                    this.multiplicacion();
                    break;
                case 5:
                    const tipoOperacion = prompt("Ingrese el símbolo de la operación a filtrar (+, -, *, /):");
                    const resultadosFiltrados = this.filtrarHistorial(tipoOperacion);
                    alert(`Resultados filtrados por ${tipoOperacion}:\n${resultadosFiltrados.join("\n")}`);
                    break;
                case 6:
                    alert("Enter para cerrar la calculadora. ¡Gracias por usarla!");
                    break;
                default:
                    alert("Opcion no valida");
                    break;
            }

        } while (opcion !== 6);
    }
};

// Llamada al método principal para iniciar la calculadora
calculadora.ejecutarCalculadora();
