const toggleThemeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleThemeButton.textContent = "Byt till Light Mode";
} else {
  document.body.classList.remove("dark-mode");
  toggleThemeButton.textContent = "Byt till Dark Mode";
}

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");

  toggleThemeButton.textContent = isDarkMode
    ? "Byt till Light Mode"
    : "Byt till Dark Mode";

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Hämta HTML-elementen
const movieList = document.getElementById('movie-list');
const newMovieInput = document.getElementById('new-movie');
const addMovieButton = document.getElementById('add-movie');

// Lista med initiala filmer
const movies = ["Inception", "Titanic", "The Matrix"];

// Lägg till initiala filmer till listan
movies.forEach(movie => {
    addMovieToList(movie);
});

// Funktion för att lägga till en film i listan
function addMovieToList(movieName) {
    // Skapa <li>-element för filmen
    const li = document.createElement('li');
    li.textContent = movieName;

    // Skapa och lägg till "Ta bort"-knappen
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Ta bort";
    deleteButton.classList.add('delete-btn');  // Lägg till en klass för knappen (valfritt, för stil)

    // Lägg till en eventlistener på knappen för att ta bort filmen
    deleteButton.addEventListener('click', () => {
        movieList.removeChild(li);  // Ta bort li-elementet från listan
    });

    // Lägg till knappen till <li>-elementet
    li.appendChild(deleteButton);

    // Lägg till en eventlistener på <li> för att markera som sedd/avmarkerad
    li.addEventListener('click', () => {
        li.classList.toggle('seen');  // Växla mellan att lägga till eller ta bort 'seen' klassen
    });

    // Lägg till <li>-elementet i <ul>-listan
    movieList.appendChild(li);
}

// Funktion för att lägga till en ny film när knappen klickas
function addNewMovie() {
    const newMovieName = newMovieInput.value.trim(); // Ta bort eventuella extra mellanslag
    
    if (newMovieName === "") {
        console.log("Skriv in ett filnamn!");  // Felmeddelande om fältet är tomt
    } else {
        addMovieToList(newMovieName);  // Lägg till filmen i listan
        newMovieInput.value = "";       // Töm input-fältet efter att filmen lagts till
    }
}

// Lägg till eventlistener på knappen för att lägga till ny film
addMovieButton.addEventListener('click', addNewMovie);
