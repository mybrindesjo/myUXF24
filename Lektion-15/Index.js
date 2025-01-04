const dataContainer = document.getElementById("data-container");


const fetchData = async () => {
    try {
        // HÄMTA DATA FRÅN POKÉMONE API
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    
        // KONTROLLERAR OM FÖRFRÅGAN LYCKADES
        if (!response.ok) {
            throw new Error("HTTP-fel! Något gick snett i förfrågan.");
        }

        // KONVERTERA SVARET TILL JSON
        const data = await response.json();

        // HÄMTA DETALJER FÖR VARJE POKÉMON
        const detailedPokemonData = await fetchPokemonDetails(data.results);
        console.log(data);

        // RENDERA DATA PÅ SIDAN
        const pokemonHTML = detailedPokemonData.map((pokemon) => {
            return `<div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                </div>`;
        }).join("");

        // LÄGG TILL HTML-STRÄNGEN I DATACONTAINERN
        dataContainer.innerHTML = pokemonHTML;
    } catch (error) {
        // VISAR FELET I FRONETEND
        dataContainer.innerHTML = `<p>Någonting gick fel i hämtningen av Pokémons.</p>`;
    } finally {
        // Dölj laddningsikonen när datan har hämtats
        loader.style.display = "none";
    }
};

const fetchPokemonDetails = async (pokemons) => {
    // Använd Promise.all för att vänta på alla detaljer
    return Promise.all(pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return details; // Retur av detaljerad information
    }));
};

fetchData();

