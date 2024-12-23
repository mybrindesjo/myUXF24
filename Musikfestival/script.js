document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://cdn.contentful.com/spaces/";
  const SPACE_ID = localStorage.getItem("space_id"); // Hämta från localStorage
  const ACCESS_TOKEN = localStorage.getItem("access_token"); // Hämta från localStorage
  const CONTENT_TYPE = "artist"; // Uppdatera med rätt content_type
  const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

  console.log("API URL:", apiURL); // Logga API-URL för felsökning

  const fetchContentTypes = async () => {
    const contentTypeURL = `${baseUrl}${SPACE_ID}/content_types?access_token=${ACCESS_TOKEN}`;
    try {
      const response = await fetch(contentTypeURL);
      if (!response.ok) {
        throw new Error("HTTP-fel! Något gick snett i förfrågan.");
      }
      const data = await response.json();
      console.log("Content Types:", data);
    } catch (error) {
      console.error("Fel vid hämtning av content types:", error);
    }
  };

  // Anropa funktionen för att hämta och logga alla innehållstyper
  fetchContentTypes();

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error("HTTP-fel! Något gick snett i förfrågan.");
      }

      const data = await response.json();
      console.log(data);

      // Logga data.includes.Entry för felsökning
      console.log("Includes Entry:", data.includes.Entry);

      const cardWithDetails = data.items.map((item) => {
        const dayId = item.fields.day.sys.id;
        const dayEntry = data.includes.Entry.find((entry) => entry.sys.id === dayId);

        if (!dayEntry) {
          console.error(`Day entry not found for dayId: ${dayId}`);
          return null;
        }

        // Logga dayEntry för felsökning
        console.log("Day Entry:", dayEntry);

        const dayDescription = dayEntry.fields.description; // Uppdatera för att få dagbeskrivningen

        return {
          artist: item.fields.name,
          description: item.fields.description,
          day: dayDescription,
        };
      }).filter(card => card !== null); // Filtrera bort null-värden

      const container = document.getElementById("artist-container");
      if (!container) {
        console.error("Element with id 'artist-container' not found.");
        console.log("Current HTML document:", document.documentElement.innerHTML); // Logga hela HTML-dokumentet
        return;
      }

      cardWithDetails.forEach((card) => {
        const cardHTML = `
          <div class="card">
            <h2>${card.artist}</h2>
            <p>${card.day}</p>
            <p>${card.description}</p>
          </div>
        `;
        container.innerHTML += cardHTML;
      });

    } catch (error) {
      console.error("Fel vid hämtning av data:", error);
    }
  };

  fetchData();
});


