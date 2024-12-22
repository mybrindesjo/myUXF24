const baseUrl = "https://cdn.contentful.com/spaces/";
const SPACE_ID = localStorage.getItem("space_id");
const ACCESS_TOKEN = localStorage.getItem("access_token");
const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}`;

const fetchData = async () => {
  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("HTTP-fel! Något gick snett i förfrågan.");
    }

    const data = await response.json();
    console.log(data);

    // Om includes finns, få referenser till Entry för day, genre och stage
    const dayEntries = data.includes && data.includes.Entry ? data.includes.Entry : [];
    const genreEntries = data.includes && data.includes.Entry ? data.includes.Entry : [];
    const stageEntries = data.includes && data.includes.Entry ? data.includes.Entry : [];

    // Skapa en ny array med detaljer för varje artist
    const postsWithDetails = data.items.map((post) => {
      const dayId = post.fields.day ? post.fields.day.sys.id : null;
      const genreId = post.fields.genre ? post.fields.genre.sys.id : null;
      const stageId = post.fields.stage ? post.fields.stage.sys.id : null;

      // Hitta Day från includes
      const day = dayId ? dayEntries.find(entry => entry.sys.id === dayId) : null;

      // Hitta Genre från includes
      const genre = genreId ? genreEntries.find(entry => entry.sys.id === genreId) : null;

      // Hitta Stage från includes
      const stage = stageId ? stageEntries.find(entry => entry.sys.id === stageId) : null;

      // Returnera ett nytt objekt med artistens namn, beskrivning och detaljer om day, genre, stage
      return {
        name: post.fields.name,
        description: post.fields.description,
        day: day ? day.fields.name : 'Ingen dag', // Om day finns, visa day.name
        genre: genre ? genre.fields.name : 'Ingen genre', // Om genre finns, visa genre.name
        stage: stage ? stage.fields.name : 'Ingen scen', // Om stage finns, visa stage.name
      };
    });

    // Hitta container för korten
    const postContainer = document.getElementById("info-container");
    if (postContainer) {
      // Skapa HTML för alla poster
      const postHTML = postsWithDetails.map(post => {
        return `
          <div class="artist-card">
            <h2>${post.name}</h2>
            <p class="description">${post.description}</p>
            <p class="day">Day: ${post.day}</p>
            <p class="genre" >Genre: ${post.genre}</p>
            <p class="genre">Stage: ${post.stage}</p>
          </div>
        `;
      }).join("");

      // Lägg till HTML i container
      postContainer.innerHTML = postHTML;
    }

  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
};

fetchData();


