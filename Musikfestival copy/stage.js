const baseUrl = "https://cdn.contentful.com/spaces/";
const SPACE_ID = localStorage.getItem("space_id");
const ACCESS_TOKEN = localStorage.getItem("access_token").trim();
const CONTENT_TYPE = "artist";
const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

const artistImages = {
  "3EaJyvMEJZn0SEujFTAfhh": "IMG/bild1.jpg",  // ARIANA GRANDE
  "3h10Md9vCJztB4LVWq4SZw": "IMG/bild2.jpg",  // THE WEEKND
  "3dfDAlSCyLOEMjnLYRHDW3": "IMG/bild3.jpg",  // TRAVIS SCOTT
  "6uOdMg1FwV2X0XzMbsRTqI": "IMG/bild4.jpg",  // SNARKY PUPPY
  "4Jg8p2V4BRWHUWpMJTmLVb": "IMG/bild5.jpg",  // IMAGINE DRAGONS
  "3POGTLp40vViwu3PYg4ZQs": "IMG/bild6.jpg",  // THE LUMINEERS
  "1s4kb4NRwcIxXtH43ZwG2a": "IMG/bild7.jpg",  // DRAKE
  "2y2H4WReTkLEuIsXb8TuV2": "IMG/bild8.jpg",  // BILLIE EILISH
  "1kYPDZKvt1jknL0g37RDnJ": "IMG/bild9.jpg",  // SLIPKNOT
  "1m6BKmWSVKkcanEncErKQv": "IMG/bild10.jpg", // METALLICA
};

let sortedStageCards = [];

const fetchData = async () => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("HTTP-fel! Något gick snett i förfrågan.");

    const data = await response.json();
    const days = new Set();
    const stages = new Set();
    const genres = new Set();
    const stageCards = {};

    data.items.forEach((item) => {
      const dayId = item.fields.day.sys.id;
      const stageId = item.fields.stage.sys.id;
      const genreId = item.fields.genre.sys.id;
      const dayEntry = data.includes.Entry.find((entry) => entry.sys.id === dayId);
      const stageEntry = data.includes.Entry.find((entry) => entry.sys.id === stageId);
      const genreEntry = data.includes.Entry.find((entry) => entry.sys.id === genreId);

      if (!dayEntry || !stageEntry || !genreEntry) return;

      const dayDescription = dayEntry.fields.description;
      const stageName = stageEntry.fields.name;
      const genreName = genreEntry.fields.name;
      const date = dayEntry.fields.date;
      const area = stageEntry.fields.area || "N/A";

      days.add(dayDescription);
      stages.add(stageName);
      genres.add(genreName);

      if (!stageCards[stageId]) {
        stageCards[stageId] = { stage: stageName, area: area, artists: [] };
      }

      stageCards[stageId].artists.push({
        artist: item.fields.name,
        description: item.fields.description,
        day: dayDescription,
        genre: genreName,
        date: date,
        image: artistImages[item.sys.id] || "IMG/default.jpg"
      });
    });

    sortedStageCards = Object.values(stageCards).sort((a, b) => a.stage.localeCompare(b.stage));

    
    const filterResult = {
      days: Array.from(days),
      stages: Array.from(stages),
      genres: Array.from(genres)
    };

    const dayFilter = document.getElementById("day-filter");
    const stageFilter = document.getElementById("stage-filter");
    const genreFilter = document.getElementById("genre-filter");

    if (dayFilter) {
      filterResult.days.forEach(day => {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        dayFilter.appendChild(option);
      });
    }

    if (stageFilter) {
      filterResult.stages.forEach(stage => {
        const option = document.createElement("option");
        option.value = stage;
        option.textContent = stage;
        stageFilter.appendChild(option);
      });
    }

    if (genreFilter) {
      filterResult.genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
      });
    }

    displayCards(sortedStageCards);

  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
};

const displayCards = (cards) => {
  const container = document.getElementById("card-container");
  if (!container) return;

  const cardHTML = cards.map((card) => {
    const artistsHTML = card.artists.map(artist => {
      return `<div class="artist-info">
                <h4>Artist: ${artist.artist}</h4>
                <p>Dag: ${artist.day}</p>
                <p>Genre: ${artist.genre}</p>
                <p>Beskrivning: ${artist.description}</p>
                <img src="${artist.image}" alt="${artist.artist}">
              </div>`;
    }).join('');

    return `<div class="stage-card">
              <div class="card-content">
                <h2>${card.stage}</h2>
                <h3>Area: ${card.area}</h3>
                ${artistsHTML}
              </div>
            </div>`;
  }).join('');

  container.innerHTML = cardHTML;
};

const applyFilters = () => {
  const selectedDay = document.getElementById("day-filter").value;
  const selectedStage = document.getElementById("stage-filter").value;
  const selectedGenre = document.getElementById("genre-filter").value;

  const filteredCards = sortedStageCards.filter(card => {
    return card.artists.some(artist => 
      (selectedDay === "all" || artist.day === selectedDay) &&
      (selectedStage === "all" || card.stage === selectedStage) &&
      (selectedGenre === "all" || artist.genre === selectedGenre)
    );
  });

  displayCards(filteredCards);
};

document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filter-btn");
  if (filterBtn) filterBtn.addEventListener("click", applyFilters);
  fetchData();
});

