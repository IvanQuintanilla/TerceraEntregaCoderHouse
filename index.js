let usuarioActual = null;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Verificar credenciales (en el lado del cliente, esto no es seguro en producción)
  if (username === "hola" && password === "calculadora") {
    document.getElementById("login-message").textContent = "Inicio de sesión exitoso";
    usuarioActual = { username: username };

    // Almacenar información del usuario en localStorage
    localStorage.setItem("user", JSON.stringify(usuarioActual));

    // Mostrar la calculadora después del inicio de sesión
    document.getElementById("login-container").style.display = "none";
    document.getElementById("calculadora-container").style.display = "block";
  } else {
    document.getElementById("login-message").textContent = "Credenciales incorrectas";
  }
}

function realizarOperacion(tipoOperacion) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);

  let resultado;
  switch (tipoOperacion) {
    case '+':
      resultado = num1 + num2;
      break;
    case '-':
      resultado = num1 - num2;
      break;
    case '*':
      resultado = num1 * num2;
      break;
    case '/':
      resultado = num1 / num2;
      break;
    default:
      break;
  }

  alert(`${num1} ${tipoOperacion} ${num2} = ${resultado}`);

  // Actualizar historial y almacenar en localStorage
  const historial = document.getElementById("historial");
  const nuevaOperacion = document.createElement("p");
  nuevaOperacion.textContent = `${num1} ${tipoOperacion} ${num2} = ${resultado}`;
  historial.prepend(nuevaOperacion);

  const historialCalculos = JSON.parse(localStorage.getItem("historialCalculos")) || [];
  historialCalculos.unshift({ operacion: nuevaOperacion.textContent, timestamp: new Date().toLocaleString() });
  localStorage.setItem("historialCalculos", JSON.stringify(historialCalculos));
}

function cerrarSesion() {
  // Limpiar información del usuario y volver al formulario de inicio de sesión
  localStorage.removeItem("user");
  usuarioActual = null;
  document.getElementById("login-container").style.display = "block";
  document.getElementById("calculadora-container").style.display = "none";
}

// Verificar si hay información de usuario almacenada al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  var storedUser = localStorage.getItem("user");
  if (storedUser) {
    usuarioActual = JSON.parse(storedUser);
    document.getElementById("login-container").style.display = "none";
    document.getElementById("calculadora-container").style.display = "block";
  }

  // Cargar historial desde localStorage
  const historialCalculos = JSON.parse(localStorage.getItem("historialCalculos")) || [];
  const historial = document.getElementById("historial");
  historialCalculos.forEach(item => {
    const operacion = document.createElement("p");
    operacion.textContent = `${item.operacion} (Fecha: ${item.timestamp})`;
    historial.appendChild(operacion);
  });
});
document.getElementById("login-button").addEventListener("click", login);
document.getElementById("cerrar-sesion-button").addEventListener("click", cerrarSesion);

// Variables para manejar el teclado numérico
let display = document.getElementById("display");
let currentInput = "";

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  currentInput += operator;
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    alert(result);
    updateHistorial(`${currentInput} = ${result}`);
  } catch (error) {
    alert("Error en la expresión");
  } finally {
    currentInput = "";
    updateDisplay();
  }
}

function updateDisplay() {
  display.value = currentInput;
}

function updateHistorial(operation) {
  const historial = document.getElementById("historial");
  const nuevaOperacion = document.createElement("p");
  nuevaOperacion.textContent = operation;
  historial.prepend(nuevaOperacion);

  const historialCalculos = JSON.parse(localStorage.getItem("historialCalculos")) || [];
  historialCalculos.unshift({ operacion: nuevaOperacion.textContent, timestamp: new Date().toLocaleString() });
  localStorage.setItem("historialCalculos", JSON.stringify(historialCalculos));
}