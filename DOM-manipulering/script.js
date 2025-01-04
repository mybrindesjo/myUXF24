const apiUrl = "https://cdn.contentful.com/spaces/"; // API-url (ändra till verklig URL)
const spaceId = localStorage.getItem('space_id');
const accessToken = localStorage.getItem('access_token');

// Funktion för att hämta data från API:t
const fetchData = async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Något gick fel vid hämtning av data.');
        }
        const data = await response.json();
        displayArtists(data.artists);
    } catch (error) {
        console.error('Fel vid hämtning av data:', error);
    }
};

// Funktion för att visa artister
const displayArtists = (artists) => {
    const artistsContainer = document.getElementById('artists-container');
    artistsContainer.innerHTML = ''; // Töm container innan ny data läggs till

    artists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        artistsContainer.appendChild(artistCard);
    });

    // Fyll i genre-filter
    const genres = [...new Set(artists.map(artist => artist.genre))]; // Unika genrer
    const genreSelect = document.getElementById('filter-genre');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
};

// Funktion för att skapa en artistkort
const createArtistCard = (artist) => {
    const card = document.createElement('div');
    card.classList.add('artist-card');

    const content = `
        <h2>${artist.name}</h2>
        <p><strong>Dag:</strong> ${artist.day}</p>
        <p><strong>Scen:</strong> ${artist.stage}</p>
        <p><strong>Genre:</strong> ${artist.genre}</p>
    `;

    card.innerHTML = content;
    return card;
};

// Eventlyssnare för genre-filter
document.getElementById('filter-genre').addEventListener('change', (event) => {
    const selectedGenre = event.target.value;
    filterArtistsByGenre(selectedGenre);
});

// Funktion för att filtrera artister baserat på genre
const filterArtistsByGenre = (genre) => {
    const artistsContainer = document.getElementById('artists-container');
    const allArtists = artistsContainer.children;

    for (let artistCard of allArtists) {
        const artistGenre = artistCard.querySelector('p:nth-child(4)').textContent.split(': ')[1];
        if (genre === 'all' || artistGenre === genre) {
            artistCard.style.display = 'block';
        } else {
            artistCard.style.display = 'none';
        }
    }
};

// Kör fetchData när sidan laddas
fetchData();
