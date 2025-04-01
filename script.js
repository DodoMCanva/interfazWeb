const pokemones = ['Pikachu'];

function obtenerPokemon(nombre) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                alert('Pokémon no encontrado');
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(datos => {

            mostrarPokemones();
        })
        .catch(error => {
            console.error(error);
        });
}
document.getElementById('btnConfirmar').onclick = function agregarPokemon() {
    const pokemonInput = document.getElementById('txtPokemon');
    const nuevoPokemon = pokemonInput.value.trim();

    if (!nuevoPokemon) {
        alert('Por favor ingrese un nombre de Pokémon.');
        return;
    }

    if (nuevoPokemon && !pokemones.includes(nuevoPokemon)) {
        pokemones.push(nuevoPokemon);
        pokemonInput.value = ''; 
        obtenerPokemon(nuevoPokemon);  
    } else if (pokemones.includes(nuevoPokemon)) {
        alert('Este Pokémon ya está en la lista');
    }
};