const baseUrl = "https://cdn.contentful.com/spaces/";
const SPACE_ID = localStorage.getItem("space_id"); // Hämta från localStorage
const ACCESS_TOKEN = localStorage.getItem("access_token").trim(); // Hämta från localStorage och trimma eventuella mellanslag
const CONTENT_TYPE = "artist"; // Uppdatera med rätt content_type
const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

const artistImages = {
  "3EaJyvMEJZn0SEujFTAfhh": "IMG/bild1.jpg", // ARIANA GRANDE
  "3h10Md9vCJztB4LVWq4SZw": "IMG/bild2.jpg", // THE WEEKND
  "3dfDAlSCyLOEMjnLYRHDW3": "IMG/bild3.jpg", // TRAVIS SCOTT
  "6uOdMg1FwV2X0XzMbsRTqI": "IMG/bild4.jpg", // SNARKY PUPPY
  "4Jg8p2V4BRWHUWpMJTmLVb": "IMG/bild5.jpg", // IMAGINE DRAGONS
  "3POGTLp40vViwu3PYg4ZQs": "IMG/bild6.jpg", // THE LUMINEERS
  "1s4kb4NRwcIxXtH43ZwG2a": "IMG/bild7.jpg", // DRAKE
  "2y2H4WReTkLEuIsXb8TuV2": "IMG/bild8.jpg", // BILLIE EILISH
  "1kYPDZKvt1jknL0g37RDnJ": "IMG/bild9.jpg", // SLIPKNOT
  "1m6BKmWSVKkcanEncErKQv": "IMG/bild10.jpg", // METALLICA
};

let cardWithDetails = [];

const fetchData = async () => {
  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("HTTP-fel! Något gick snett i förfrågan.");
    }

    const data = await response.json();
    console.log("Data result:", data); // Logga hela API-svaret

    const days = new Set();
    const stages = new Set();
    const genres = new Set();

    cardWithDetails = data.items.map((item) => {
      const dayId = item.fields.day.sys.id;
      const stageId = item.fields.stage.sys.id;
      const genreId = item.fields.genre.sys.id;
      const dayEntry = data.includes.Entry.find((entry) => entry.sys.id === dayId);
      const stageEntry = data.includes.Entry.find((entry) => entry.sys.id === stageId);
      const genreEntry = data.includes.Entry.find((entry) => entry.sys.id === genreId);

      if (!dayEntry) {
        console.error(`DayId not found. ${dayId}`);
        return null;
      }

      if (!stageEntry) {
        console.error(`StageId not found. ${stageId}`);
        return null;
      }

      if (!genreEntry) {
        console.error(`GenreId not found. ${genreId}`);
        return null;
      }

      const dayDescription = dayEntry.fields.description; // Uppdatera för att få dagens beskrivning
      const stageName = stageEntry.fields.name; // Uppdatera för att få scenens namn
      const genreName = genreEntry.fields.name; // Uppdatera för att få genrens namn
      const date = dayEntry.fields.date; // Uppdatera för att få datumet

      days.add(dayDescription);
      stages.add(stageName);
      genres.add(genreName);

      const artistCard = {
        artist: item.fields.name,
        description: item.fields.description,
        day: dayDescription,
        stage: stageName,
        genre: genreName,
        date: date,
        image: artistImages[item.sys.id] || "IMG/default.jpg" // Lägg till bildvägen
      };

      // Logga artistCard för varje artist
      console.log("Artist Card:", artistCard);

      return artistCard;
    }).filter(card => card !== null); // Filtrera bort null-värden

    // Sortera artistkort i bokstavsordning
    cardWithDetails.sort((a, b) => a.artist.localeCompare(b.artist));

    // Sammanställ filterresultat
    const filterResult = {
      days: Array.from(days),
      stages: Array.from(stages),
      genres: Array.from(genres)
    };

    console.log("Filter Result:", filterResult);

    // FILTRERING
    const dayFilter = document.getElementById("day-filter");
    const stageFilter = document.getElementById("stage-filter");
    const genreFilter = document.getElementById("genre-filter");

    filterResult.days.forEach(day => {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      dayFilter.appendChild(option);
    });

    filterResult.stages.forEach(stage => {
      const option = document.createElement("option");
      option.value = stage;
      option.textContent = stage;
      stageFilter.appendChild(option);
    });

    filterResult.genres.forEach(genre => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
    });

    // Visa alla artistkort initialt
    displayCards(cardWithDetails);

  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
};

const displayCards = (cards) => {
  const container = document.getElementById("card-container");
  if (!container) {
    console.error("Element with id 'card-container' not found.");
    return;
  }

  const cardHTML = cards.map((card) => {
    return `<div class="card" style="background-image: url('${card.image}');">
              <div class="card-content">
                <h2>${card.artist}</h2>
                <p>${card.description}</p>
                <div class="card-details">
                  <p><strong>Genre: </strong>${card.genre}</p>
                  <p><strong>Scen: </strong>${card.stage}</p>
                  <p><strong>Dag: </strong>${card.day}</p>
                  <p><strong>Datum: </strong>${card.date}</p>
                </div>
                <a href="/Musikfestival copy/ticket.html" class="corner-banner">BOKA BILJETTER</a>
              </div>
            </div>`;
  }).join(''); // Kombinera HTML-strängarna till en enda sträng

  container.innerHTML = cardHTML; // Sätt innerHTML till den kombinerade strängen
};

const applyFilters = () => {
  const selectedDay = document.getElementById("day-filter").value;
  const selectedStage = document.getElementById("stage-filter").value;
  const selectedGenre = document.getElementById("genre-filter").value;

  const filteredCards = cardWithDetails.filter(card => {
    return (selectedDay === "all" || card.day === selectedDay) &&
           (selectedStage === "all" || card.stage === selectedStage) &&
           (selectedGenre === "all" || card.genre === selectedGenre);
  });

  displayCards(filteredCards);
};

document.getElementById("filter-btn").addEventListener("click", applyFilters);

fetchData();

