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