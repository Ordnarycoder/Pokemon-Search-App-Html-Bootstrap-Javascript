document.getElementById('search-button').addEventListener('click', searchPokemon);

async function searchPokemon() {
    const searchInput = document.getElementById('search-input').value.trim();
    if (!searchInput) return;
    
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Pokémon not found');
        
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        alert('Pokémon not found');
        clearPokemonDetails();
    }
}

function displayPokemon(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
    document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
    document.getElementById('height').textContent = `Height: ${pokemon.height}`;
    document.getElementById('hp').textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    document.getElementById('attack').textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    document.getElementById('defense').textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    document.getElementById('special-attack').textContent = pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    document.getElementById('special-defense').textContent = pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    document.getElementById('speed').textContent = pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat;
    
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = ''; 
    pokemon.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
    });
    
    const spriteUrl = pokemon.sprites.front_default;
    let spriteElement = document.getElementById('sprite');
    if (!spriteElement) {
        spriteElement = document.createElement('img');
        spriteElement.id = 'sprite';
        document.getElementById('pokemon-details').appendChild(spriteElement);
    }
    spriteElement.src = spriteUrl;
}

function clearPokemonDetails() {
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    const spriteElement = document.getElementById('sprite');
    if (spriteElement) {
        spriteElement.remove();
    }
}