const pokemones = [{ nombre: 'Pikachu', favorito: false }];
var selfav = false;
function obtenerPokemon(nombre) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                alert('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(datos => {
            mostrarPokemones();
        })
}

document.getElementById('btnConfirmar').onclick = function agregarPokemon() {
    const pokemonInput = document.getElementById('txtPokemon');
    const nuevoPokemon = pokemonInput.value.trim();

    if (!nuevoPokemon) {
        alert('Por favor ingrese un nombre de Pokémon.');
        return;
    }

    if (nuevoPokemon && !pokemones.includes(nuevoPokemon)) {
        pokemones.push({ nombre: nuevoPokemon, favorito: false });
        pokemonInput.value = '';
        obtenerPokemon(nuevoPokemon);
    } else if (pokemones.includes(nuevoPokemon)) {
        alert('Este Pokémon ya está en la lista');
    }
};

document.getElementById('btnFavoritos').onclick = function mostrar() {

    if (selfav) {
        mostrarPokemones();
        document.getElementById('btnFavoritos').innerHTML = "Favoritos";
        tituloLista.innerHTML = "Pokémon";
    } else {
        mostrarPokemonesFavoritos();
        document.getElementById('btnFavoritos').innerHTML = "Todos";
        tituloLista.innerHTML = "Pokémon Favorito";
    }
    selfav = !selfav;
};

function mostrarPokemones() {
    const pokedexDiv = document.getElementById('pokedex');
    pokedexDiv.innerHTML = '';

    pokemones.forEach((pokemon, i) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.nombre.toLowerCase()}`)
            .then(response => {
                if (!response.ok) {
                    alert('Pokémon no encontrado');
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(datos => {
                const bloque = document.createElement('div');
                bloque.classList.add('pokemon');

                bloque.innerHTML = `
                    <h3>${pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}</h3>
                    <img src="${datos.sprites.front_default}" alt="${pokemon.nombre}">
                    <p>Altura: ${datos.height / 10} metros</p> 
                    <p>Peso: ${datos.weight / 10} kg</p>
                    <button class="btnEliminar">Eliminar</button>
                    <button class="btnFavorito ${pokemon.favorito ? 'favorito' : ''}">
                        ${pokemon.favorito ? '★' : '☆'}
                    </button>
                `;

                pokedexDiv.appendChild(bloque);

                // Boton eliminar
                bloque.querySelector('.btnEliminar').addEventListener('click', () => {
                    pokemones.splice(i, 1);
                    mostrarPokemones();
                });

                // Boton favorito
                const btnFavorito = bloque.querySelector('.btnFavorito');
                btnFavorito.addEventListener('click', () => {
                    pokemon.favorito = !pokemon.favorito;
                    btnFavorito.innerHTML = pokemon.favorito ? '★' : '☆';
                    btnFavorito.classList.toggle('favorito');
                });
            });
    });
}

function mostrarPokemonesFavoritos() {
    const pokedexDiv = document.getElementById('pokedex');
    pokedexDiv.innerHTML = '';

    for (let i = 0; i < pokemones.length; i++) {
        if (pokemones[i].favorito) {
            const nombrePokemon = pokemones[i].nombre;
            fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
                .then(response => {
                    if (!response.ok) {
                        alert('Pokémon no encontrado');
                        throw new Error('Pokémon no encontrado');
                    }
                    return response.json();
                })
                .then(datos => {
                    const bloque = document.createElement('div');
                    bloque.classList.add('pokemon');
                    bloque.innerHTML = `
                        <h3>${nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1)}</h3>
                        <img src="${datos.sprites.front_default}" alt="${nombrePokemon}">
                        <p>Altura: ${datos.height / 10} metros</p> 
                        <p>Peso: ${datos.weight / 10} kg</p>
                        <button class="btnEliminar">Eliminar</button>
                        <button class="btnFavorito">${pokemones[i].favorito ? '★' : '☆'}</button>
                    `;

                    pokedexDiv.appendChild(bloque);

                    bloque.querySelector('.btnEliminar').addEventListener('click', () => {
                        pokemones.splice(i, 1);
                        mostrarPokemonesFavoritos();
                    });

                    const btnFavorito = bloque.querySelector('.btnFavorito');
                    btnFavorito.addEventListener('click', () => {
                        pokemones[i].favorito = !pokemones[i].favorito;
                        btnFavorito.innerHTML = pokemones[i].favorito ? '★' : '☆';
                        mostrarPokemonesFavoritos();
                    });
                })
                .catch(error => console.error('Error al obtener los datos del Pokémon:', error));
        }
    }
}


mostrarPokemones();