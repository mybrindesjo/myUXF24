// script.js
const spaceId = "r4n29c9w5edo";
const accessToken = "HOUWZG6vybQ5Hwy7bA-YtTeNZ6bK_FoSlS9VG0eUv0w";
const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=artist`;

const artistListContainer = document.getElementById("artist-list");

async function fetchArtists() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(artist => {
                const artistCard = createArtistCard(artist);
                artistListContainer.appendChild(artistCard);
            });
        } else {
            artistListContainer.innerHTML = "<p>Ingen artist hittades.</p>";
        }
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
        artistListContainer.innerHTML = "<p>Kunde inte hämta artister.</p>";
    }
}

function createArtistCard(artist) {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    const artistName = document.createElement("h2");
    artistName.textContent = artist.fields.name;
    
    const artistDescription = document.createElement("p");
    artistDescription.textContent = artist.fields.description || "Ingen beskrivning tillgänglig.";

    // Hämta relaterad genre, scen och dag
    const genre = artist.fields.genre ? artist.fields.genre.sys.id : "Ingen genre";
    const stage = artist.fields.stage ? artist.fields.stage.sys.id : "Ingen scen";
    const day = artist.fields.day ? artist.fields.day.sys.id : "Ingen dag";

    const artistDetails = document.createElement("p");
    artistDetails.innerHTML = `<strong>Genre:</strong> ${genre} <br><strong>Scen:</strong> ${stage} <br><strong>Dag:</strong> ${day}`;

    artistCard.appendChild(artistName);
    artistCard.appendChild(artistDescription);
    artistCard.appendChild(artistDetails);

    return artistCard;
}

// Hämta artister när sidan laddas
document.addEventListener("DOMContentLoaded", fetchArtists);
