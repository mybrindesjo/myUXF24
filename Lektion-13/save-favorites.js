// Array of product objects
const products = [
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://via.placeholder.com/150",
      price: "$199.00",
      description:
        "High-quality wireless headphones with noise-canceling and a 20-hour battery life.",
    },
    {
      id: "2",
      name: "Smartphone Stand",
      image: "https://via.placeholder.com/150",
      price: "$25.00",
      description:
        "A sleek and adjustable stand for smartphones, perfect for hands-free video calls or watching movies.",
    },
    {
      id: "3",
      name: "Portable Blender",
      image: "https://via.placeholder.com/150",
      price: "$49.99",
      description:
        "A compact and powerful portable blender for super smooth smoothies on the go.",
    },
  ];

  const productList = document.querySelector(".product-list");
  let favorites = []

  const renderProduct = () => {
    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.dataset.id = product.id;
      listItem.classList.add("product-card");
  
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.classList.add("product-iamge");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = product.price;
        price.classList.add("product-price");

        
        const description = document.createElement("description");
        description.textContent = product.description;
        description.classList.add("product-decription");

        const favButton = document.createElement("button");
        favButton.classList.add("fav-btn");

        // Check if the product is in the favorites list
        favButton.innerHTML = favorites.some((fav) => fav.id === product.id)
        ? "❤️" // Marked as favorite
        : "🤍"; // Not marked as favorite

        favButton.addEventListener("click", () => {
            const favoriteIndex = favorites.findIndex(
                (favoriteItem) => favoriteItem.id === product.id
            );
            console.log("favorite index:", favoriteIndex);

            if (favoriteIndex > -1) {
                favorites.splice(favoriteIndex, 1);
                favButton.innerHTML = "🤍";
            } else {
                favorites.push(product);
                favButton.innerHTML = "❤️";
            }
        });

        listItem.appendChild(image);
        listItem.appendChild(name);
        listItem.appendChild(price);
        listItem.appendChild(description);
        listItem.appendChild(favButton);


      productList.appendChild(listItem);
    });
  };

  // Call function on initial load
  renderProduct();

/*   const favoriteButton = document.querySelector(".fav-btn");
  console.log(favoriteButton);

  favoriteButton.addEventListener("click", () => {
    console.log("clicked");
  }); */

/*   productList.addEventListener("click", (event) => {
    console.log(event.target);
    const listItem = event.target.closest("li");
    const productId = listItem.dataset.id;

    const product = products.find((product) => product.id === productId);

    const favoriteIndex = favorites.findIndex(
        (favorite) => favorite.id === product.id
    );

    if (favoriteIndex > -1) {
        event.target.innerHTML = "🤍";;
    }else{
        favorites.push(product);
        event.target.innerHTML = "❤️";
    }

  }); */


