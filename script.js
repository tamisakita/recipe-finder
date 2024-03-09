const searchForm = document.querySelector("form");
const searchResult = document.querySelector("#result-container");
const container = document.querySelector("#container-height");
const pagination = document.querySelector("#pagination ul");

const APP_ID = "3ac59c47";
const APP_KEY = "6b4d3971f7d3022076a60100e77805da";

let searchQuery = "";
let currentPage = 1;
let pageSize = 10;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector("input").value;

  listRecipes();
});

document.addEventListener("search", () => {
  searchQuery = document.querySelector("#searchInput").value;

  if (searchQuery === "") {
    searchResult.innerHTML = null;
    pagination.innerHTML = "";
  }
});

function listRecipes() {
  searchResult.innerHTML = "";

  document.querySelector("#spinner").classList.add("loading");

  const uri = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${
    (currentPage - 1) * pageSize + 1
  }&to=${currentPage * pageSize}`;

  fetch(uri)
    .then((res) => res.json())
    .then((data) => {
      if (data.hits.length === 0) {
        setTimeout(() => {
          document.querySelector("#spinner").classList.remove("loading");
          searchResult.innerHTML =
            "<p class='alert alert-danger'>No recipes found</p>";
        }, 500);
      }

      addContainer(data.hits);
      createPagination(data.count);
    })
    .catch((error) => console.log("Error: " + error))
    .finally(() => {
      document.querySelector("#spinner").classList.remove("loading");
    });
}

function addContainer(results) {
  results.forEach((result) => {
    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe-container", "card", "text-center");

    const image = document.createElement("img");
    image.classList.add("img-fluid", "rounded");
    image.src = result.recipe.image;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h3");
    title.classList.add("text-wrap", "text-center", "fs-5", "recipe-title");
    title.style.width = "18rem";
    title.textContent = result.recipe.label;

    const viewRecipeBtnContainer = document.createElement("div");

    const viewRecipeBtn = document.createElement("a");
    viewRecipeBtn.classList.add("btn", "btn-success");
    viewRecipeBtn.href = result.recipe.url;
    viewRecipeBtn.target = "_blank";
    viewRecipeBtn.textContent = "View Recipe";

    cardBody.appendChild(title);
    recipeContainer.appendChild(image);
    recipeContainer.appendChild(cardBody);
    viewRecipeBtnContainer.appendChild(viewRecipeBtn);
    recipeContainer.appendChild(viewRecipeBtnContainer);

    searchResult.appendChild(recipeContainer);
  });

  container.style.height = "50vh";
}

function createPagination(totalResults) {
  const totalPages = Math.ceil(totalResults / pageSize);
  let showPage = "";

  if (totalPages > 1) {
    // Calculate the start and end page numbers for display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Add previous button
    showPage += `<li class="page-item previous ${
      currentPage === 1 ? "disabled" : ""
    }"><a class="page-link" href="#" onclick="changePage(${
      currentPage - 1
    })">Previous</a></li>`;

    // Add page numbers
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

function changePage(page) {
  currentPage = page;
  listRecipes();
}
