const spaceId = localStorage.getItem("space_id");
const accessToken = localStorage.getItem("access_token");
const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}`;

// Hämtar container från DOM
const dataContainer = document.getElementById("data-container");

const fetchData = async () => {
  try {
    // Gör API-anropet
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Något gick fel vid hämtningen av data");
    }
    
    // Hämta datan i JSON-format
    const data = await response.json();
    
    // Logga data för att se strukturen
    console.log(data);

    // Kontrollera om items finns och generera HTML för korten
    if (data.items && data.items.length > 0) {
      const cardHTML = data.items.map(item => {
        // Kontrollera att rätt fält finns
        const title = item.fields.title || "Ingen titel"; // Fallback till "Ingen titel" om title saknas
        const informationText = item.fields.informationText || "Ingen beskrivning"; // Fallback om informationText saknas

        return `
          <div class="card">
            <h2>${title}</h2>
            <p>${informationText}</p>
          </div>
        `;
      }).join(""); // Slå ihop alla kort till en sträng

      // Uppdatera HTML på sidan
      dataContainer.innerHTML = cardHTML;
    } else {
      dataContainer.innerHTML = "<p>Inga data hittades.</p>";
    }

  } catch (error) {
    // Logga fel om det uppstår
    console.error("Fel vid hämtning av data:", error);
    dataContainer.innerHTML = "<p>Det gick inte att hämta data.</p>"; // Visa användaren ett felmeddelande
  }
};

fetchData();

