  const baseUrl = "https://cdn.contentful.com/spaces/";
  const SPACE_ID = localStorage.getItem("space_id"); // Hämta från localStorage
  const ACCESS_TOKEN = localStorage.getItem("access_token").trim(); // Hämta från localStorage och trimma eventuella mellanslag
  const CONTENT_TYPE = "artist"; // Uppdatera med rätt content_type
  const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error("HTTP-fel! Något gick snett i förfrågan.");
      }

      const data = await response.json();
      console.log("Data result:", data); // Logga hela API-svaret

      const cardWithDetails = data.items.map((item) => {
        const dayId = item.fields.day.sys.id;
        const stageId = item.fields.stage.sys.id;
        const dayEntry = data.includes.Entry.find((entry) => entry.sys.id === dayId);
        const stageEntry = data.includes.Entry.find((entry) => entry.sys.id === stageId);

        if (!dayEntry) {
          console.error(`DayId not found. ${dayId}`);
          return null;
        }

        if (!stageEntry) {
          console.error(`StageId not found. ${stageId}`);
          return null;
        }

        const dayDescription = dayEntry.fields.description; // Uppdatera för att få dagens beskrivning
        const stageName = stageEntry.fields.name; // Uppdatera för att få scenens namn
        const date = dayEntry.fields.date; // Uppdatera för att få datumet

        const artistCard = {
          artist: item.fields.name,
          description: item.fields.description,
          day: dayDescription,
          stage: stageName,
          date: date,
        };

        // Logga artistCard för varje artist
        console.log("Artist Card:", artistCard);

        return artistCard;
      }).filter(card => card !== null); // Filtrera bort null-värden

      const container = document.getElementById("card-container");
      if (!container) {
        console.error("Element with id 'card-container' not found.");
        return;
      }

      const cardHTML = cardWithDetails.map((card) => {
        return `<div class="card">
                  <h2>${card.artist}</h2>
                  <p>${card.description}</p>
                  <p>${card.day}</p>
                  <p>${card.stage}</p>
                  <p>${card.date}</p>
                </div>`;
      }).join(''); // Kombinera HTML-strängarna till en enda sträng

      container.innerHTML = cardHTML; // Sätt innerHTML till den kombinerade strängen

    } catch (error) {
      console.error("Fel vid hämtning av data:", error);
    }
  };

  fetchData();

