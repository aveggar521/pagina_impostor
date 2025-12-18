// ===============================
// BASE DE DATOS
// ===============================
let base = [
  {
    "anime": "Naruto",
    "fecha": "2002",
    "generos": ["Acción", "Aventura", "Shonen"],
    "personajes": [
      { "nombre": "Naruto Uzumaki", "sexo": "Masculino" },
      { "nombre": "Sasuke Uchiha", "sexo": "Masculino" },
      { "nombre": "Sakura Haruno", "sexo": "Femenino" }
    ]
  },
  {
    "anime": "One Piece",
    "fecha": "1999",
    "generos": ["Acción", "Aventura", "Comedia"],
    "personajes": [
      { "nombre": "Monkey D. Luffy", "sexo": "Masculino" },
      { "nombre": "Roronoa Zoro", "sexo": "Masculino" },
      { "nombre": "Nami", "sexo": "Femenino" }
    ]
  },
  {
    "anime": "Demon Slayer",
    "fecha": "2019",
    "generos": ["Acción", "Aventura", "Sobrenatural"],
    "personajes": [
      { "nombre": "Tanjiro Kamado", "sexo": "Masculino" },
      { "nombre": "Nezuko Kamado", "sexo": "Femenino" },
      { "nombre": "Zenitsu Agatsuma", "sexo": "Masculino" }
    ]
  },
  {
    "anime": "Attack on Titan",
    "fecha": "2013",
    "generos": ["Acción", "Drama", "Fantástico"],
    "personajes": [
      { "nombre": "Eren Jaeger", "sexo": "Masculino" },
      { "nombre": "Mikasa Ackerman", "sexo": "Femenino" },
      { "nombre": "Armin Arlert", "sexo": "Masculino" }
    ]
    },
    {
    "anime": "Fullmetal Alchemist: Brotherhood",
    "fecha": "2009",
    "generos": ["Acción", "Aventura", "Fantasía"],
    "personajes": [
      { "nombre": "Edward Elric", "sexo": "Masculino" },
      { "nombre": "Alphonse Elric", "sexo": "Masculino" },
      { "nombre": "Winry Rockbell", "sexo": "Femenino" }
    ]
  },
  {
    "anime": "Hunter x Hunter",
    "fecha": "2011",
    "generos": ["Acción", "Aventura", "Shonen"],
    "personajes": [
      { "nombre": "Gon Freecss", "sexo": "Masculino" },
      { "nombre": "Killua Zoldyck", "sexo": "Masculino" },
      { "nombre": "Kurapika", "sexo": "Femenino" }
    ]
  },
  {
    "anime": "Jujutsu Kaisen",
    "fecha": "2020",
    "generos": ["Acción", "Sobrenatural", "Shonen"],
    "personajes": [
      { "nombre": "Yuji Itadori", "sexo": "Masculino" },
      { "nombre": "Megumi Fushiguro", "sexo": "Masculino" },
      { "nombre": "Nobara Kugisaki", "sexo": "Femenino" }
    ]
  },
  {
    "anime": "Dragon Ball Super",
    "fecha": "2015",
    "generos": ["Acción", "Aventura", "Shonen"],
    "personajes": [
      { "nombre": "Goku", "sexo": "Masculino" },
      { "nombre": "Vegeta", "sexo": "Masculino" },
      { "nombre": "Bulma", "sexo": "Femenino" }
    ]
  }
];




// ===============================
// VARIABLES DEL JUEGO
// ===============================
let jugadores = [];
let impostor = "";
let animeSeleccionado = null;
let personajeSeleccionado = null;
let jugadorActual = 0;

// ===============================
// FUNCIONES AUXILIARES
// ===============================
function elegirAleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function ocultarTodo() {
  document.querySelectorAll(".pantalla").forEach(p => {
    p.style.display = "none";
  });
}

function mostrarPantalla(id) {
  ocultarTodo();
  document.getElementById(id).style.display = "block";
}

// ===============================
// INICIO DEL JUEGO
// ===============================
function iniciarJuego() {
  jugadores = [];
  jugadores.push(document.getElementById("jugador1").value);
  jugadores.push(document.getElementById("jugador2").value);
  jugadores.push(document.getElementById("jugador3").value);

  if (jugadores.includes("")) {
    alert("Todos los jugadores deben tener nombre");
    return;
  }

  empezarPartida();
}

// ===============================
// INICIAR PARTIDA
// ===============================
function empezarPartida() {
  // Elegir impostor, anime y personaje nuevo
  impostor = elegirAleatorio(jugadores);
  animeSeleccionado = elegirAleatorio(base);
  personajeSeleccionado = elegirAleatorio(animeSeleccionado.personajes);
  jugadorActual = 0;

  // Limpiar la pantalla final para que no aparezca nada
  document.getElementById("resultado").innerText = "";

  mostrarPantalla("pantallaJugador");
  mostrarTurno();
}


// ===============================
// MOSTRAR TURNO DE JUGADOR
// ===============================
function mostrarTurno() {
  document.getElementById("nombreJugador").innerText =
    jugadores[jugadorActual];
  document.getElementById("infoJugador").innerText =
    "Pulsa el botón para ver tu información";
}

// ===============================
// MOSTRAR INFORMACIÓN PRIVADA
// ===============================
function mostrarInfo() {
  const jugador = jugadores[jugadorActual];
  let texto = "";

  if (jugador === impostor) {
    // Impostor solo ve pistas, NO el nombre ni el anime
    texto =
      "🕵️ ERES EL IMPOSTOR\n\n" +
      "Sexo del personaje: " + personajeSeleccionado.sexo + "\n" +
      "Géneros del anime: " + animeSeleccionado.generos.join(", ") + "\n" +
      "Año de creación: " + animeSeleccionado.fecha;
  } else {
    // Jugadores normales ven personaje + anime
    texto =
      "✅ NO eres el impostor\n\n" +
      "Personaje secreto: " + personajeSeleccionado.nombre +
      "\nAnime: " + animeSeleccionado.anime;
  }

  document.getElementById("infoJugador").innerText = texto;
}

// ===============================
// SIGUIENTE JUGADOR
// ===============================
function siguienteJugador() {
  jugadorActual++;

  if (jugadorActual < jugadores.length) {
    mostrarTurno();
  } else {
    mostrarPantalla("pantallaFinal");
  }
}

// ===============================
// MOSTRAR RESULTADO FINAL
// ===============================
function mostrarResultado() {
  document.getElementById("resultado").innerText =
    "El impostor era: " + impostor +
    "\n\nPersonaje: " + personajeSeleccionado.nombre +
    "\nAnime: " + animeSeleccionado.anime;
}

// ===============================
// REINICIAR PARTIDA
// ===============================
function reiniciarJuego() {
  // Limpiar campos de jugadores
  document.getElementById("jugador1").value = "";
  document.getElementById("jugador2").value = "";
  document.getElementById("jugador3").value = "";

  // Limpiar contenido del resultado
  document.getElementById("resultado").innerText = "";

  // Reiniciar variables de la partida
  animeSeleccionado = null;
  personajeSeleccionado = null;
  jugadorActual = 0;
  impostor = "";

  mostrarPantalla("pantallaInicio");
}



