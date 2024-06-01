/* Importar librerías */
import { guardar, obtener } from "./almacenamiento.js";
import { Toastify } from "./toast.js"


/* Elementos */
const aplicacion = $("#app")
const formulario = $("<form>")
const entrada = $("<input>")
const boton = $("<button>")
const seccion = $("<section>")

const listadoPokemon = obtener("poke-test") === null 
                        ? []
                        : JSON.parse(obtener("poke-test"))

/* Propiedades */

entrada.attr("id", "pokemonNombre")
entrada.attr("placeholder", "Ingresa un pokemon")

boton.text("Guardar")

/* Funciones */

const agregarPokemon =  (pokemon) => {
    /* -- Para las cartas */
    
    const articulos = $("<article>")
    const imagenPoke = $("<img>")
    imagenPoke.attr("src", pokemon.imagen)
    const nombrePoke = $("<h4>").text(pokemon.nombre)
    const pesoPoke = $("<h4>").text(`${pokemon.peso} Kg`)
    const alturaPoke = $("<h4>").text(`${pokemon.altura} m`)
    const sonidoPoke = $("<span>").attr("data-sonido", pokemon.sonido)

    /* Agrego todos los datos al articulo/carta */
    articulos.append(nombrePoke)
    articulos.append(imagenPoke)
    articulos.append(alturaPoke)
    articulos.append(pesoPoke)
    articulos.append(sonidoPoke)
    /* Añado la carta al secton */
    seccion.append(articulos)
}

const funcionCustom = (dato) =>{
    console.log("dato de poke api",dato);
    const pokemon = {
        nombre: dato.name,
        imagen: dato.sprites.front_default,
        peso: dato.weight / 10,
        altura: dato.height / 10,
        sonido: dato.cries.latest 
    }
    listadoPokemon.push(pokemon)
    const pokemonJson = JSON.stringify(listadoPokemon)
    guardar("poke-test", pokemonJson)
    const listadoPokemonNuevo = obtener("poke-test") === null 
                                ? []
                                : JSON.parse(obtener("poke-test")) // retorna una lista
    listadoPokemonNuevo.map(agregarPokemon)
    Toastify({
        text: `${dato.name} ha sido añadido a la Pokedex`,
        duration: 2000,
        close: true
    }).showToast()
}

const buscarPoke = (evento) =>{
    console.log(evento.target);
    const objeto = evento.target
    const tarjeta = $(objeto).closest("article")
    console.log("ahora estoy en ", tarjeta);
    const sonido_grito = new Audio(tarjeta.find("span").attr("data-sonido"))
    sonido_grito.play()
}

formulario.on("submit", (evento) =>{
    evento.preventDefault()
    const nombrePokemon = entrada.val().toLowerCase()
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
    seccion.html("") // <--- Limpiando todo el html
    $.get(url, funcionCustom)
    entrada.val("")
})

seccion.on("click", buscarPoke)

/* DOM */
formulario.append(entrada)
formulario.append(boton)
aplicacion.append(formulario)
aplicacion.append(seccion)

listadoPokemon.map(agregarPokemon)