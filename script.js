const searchForm = document.querySelector("form");
const searchResult = document.querySelector("#result-container");
const container = document.querySelector("#container-height");
const pagination = document.querySelector("#pagination ul");

const APP_ID = "3ac59c47";
const APP_KEY = "6b4d3971f7d3022076a60100e77805da";

let searchQuery = "";
let currentPage = 1;
let pageSize = 10;

// Event listener for form submission that identify the input value and list the recipes by calling the function listRecipes()
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector("input").value;

  listRecipes();
});

// Event listener for search event and also verify if the input is empty, it will clean the page
document.addEventListener("search", () => {
  searchQuery = document.querySelector("#searchInput").value;

  // Clear search result and pagination if the input is empty
  if (searchQuery === "") {
    searchResult.innerHTML = null;
    pagination.innerHTML = "";
    currentPage = 1;
    container.style.height = "100vh";
  }
});

// This function will display the list of recipes and pages by fetching data from api edaman and calling the functions addContainer() and createPafination()
// It will also show a spinner when the page is loading and if there is no recipes, it will show a custom message after the spinner
function listRecipes() {
  searchResult.innerHTML = "";

  document.querySelector("#spinner").classList.add("loading");

  const uri = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${
    (currentPage - 1) * pageSize + 1
  }&to=${currentPage * pageSize}`;

  fetch(uri)
    .then((res) => res.json())
    .then((data) => {
      // Check if any recipes were found
      if (data.hits.length === 0) {
        setTimeout(() => {
          document.querySelector("#spinner").classList.remove("loading");
          searchResult.innerHTML =
            "<p class='alert alert-danger'>No recipes found</p>";
        }, 500);
      }

      // Calling function to display each recipe
      addContainer(data.hits);
      // Calling function to Create pagination based on the total number of recipes
      createPagination(data.count);
    })
    .catch((error) => console.log("Error: " + error))
    .finally(() => {
      document.querySelector("#spinner").classList.remove("loading");
    });
}

// Function to add each card recipe on the container by looping the results(recipes list) and displaying each one with dynamically created page elements
function addContainer(results) {
  results.forEach((result) => {
    // Creating the container
    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe-container", "card", "text-center");

    // Adding image
    const image = document.createElement("img");
    image.classList.add("img-fluid", "rounded");
    image.src = result.recipe.image;

    // Creating the card for each recipe
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Adding Title
    const title = document.createElement("h3");
    title.classList.add("text-wrap", "text-center", "fs-5", "recipe-title");
    title.style.width = "18rem";
    title.textContent = result.recipe.label;

    // Adding container for the button
    const viewRecipeBtnContainer = document.createElement("div");

    // Creating the button that will show more information about the recipe
    const viewRecipeBtn = document.createElement("a");
    viewRecipeBtn.classList.add("btn", "btn-success");
    viewRecipeBtn.href = result.recipe.url;
    viewRecipeBtn.target = "_blank";
    viewRecipeBtn.textContent = "View Recipe";

    // Appending each element to create the structure of the recipe card
    cardBody.appendChild(title);
    recipeContainer.appendChild(image);
    recipeContainer.appendChild(cardBody);
    viewRecipeBtnContainer.appendChild(viewRecipeBtn);
    recipeContainer.appendChild(viewRecipeBtnContainer);

    searchResult.appendChild(recipeContainer);
  });

  container.style.height = "50vh";
}

// Function to create the pagination using the parameter totalResult which is the total number of results returned by the API
function createPagination(totalResults) {
  const totalPages = Math.ceil(totalResults / pageSize);
  let showPage = "";

  if (totalPages > 1) {
    // Calculate the start and end page numbers for display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Creation of buttons from pagination nav

    // Add previous button
    showPage += `<li class="page-item previous ${
      currentPage === 1 ? "disabled" : ""
    }">
    <a class="page-link" href="#" onclick="changePage(${
      currentPage - 1
    })">Previous</a>
    </li>`;

    // Add page numbers by looping through the range of page numbers
    for (let i = startPage; i <= endPage; i++) {
      showPage += `<li class="page-item ${
        currentPage === i ? "active" : ""
      }"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }

    // Add next button
    showPage += `<li class="page-item next ${
      currentPage === totalPages ? "disabled" : ""
    }"><a class="page-link" href="#" onclick="changePage(${
      currentPage + 1
    })">Next</a></li>`;

    pagination.innerHTML = showPage;
  } else {
    pagination.innerHTML = "";
  }
}

// Function that will be called to handle the page change
function changePage(page) {
  currentPage = page;
  // Call the function listRecipes to fetch and display recipes for the new page
  listRecipes();
}
