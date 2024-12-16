const dataContainer = document.getElementById("data-container");
const loader = document.getElementById("loader");

const fetchData = async () => {
    try {
        // Visa laddningsikonen
        loader.style.display = "block";

        // Hämta data från PokeAPI
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        
        // Kontrollera om förfrågan lyckades
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        // Omvandla svaret till JSON-format
        const data = await response.json();
        
        // Logga resultatet för att kontrollera datan
        console.log(data);

        // Hämta och visa Pokémon-data
        const pokemonHTML = data.results.map(pokemon => {
            return `<div class="pokemon-card">
                        <h2>${pokemon.name}</h2>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
                    </div>`;
        }).join("");

        // Lägg till den renderade HTML-koden i datasektionen
        dataContainer.innerHTML = pokemonHTML;

    } catch (error) {
        // Om ett fel inträffar, visa ett felmeddelande
        console.error("Något gick fel:", error);
        dataContainer.innerHTML = `<p>Misslyckades med att hämta data. Försök igen senare.</p>`;
    } finally {
        // Dölj laddningsikonen när datan har hämtats
        loader.style.display = "none";
    }
};

// Kör funktionen för att hämta data
fetchData();
