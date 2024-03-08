const searchForm = document.querySelector("form");
const searchResult = document.querySelector("#result-container");
const container = document.querySelector("#container-height");
const APP_ID = "3ac59c47";
const APP_KEY = "6b4d3971f7d3022076a60100e77805da";

let searchQuery = "";
let currentPage = 1;
let pageSize = 10;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector("input").value;

  searchRecipes();
});

function searchRecipes() {
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
  let addedContainer = "";
  results.map((result) => {
    addedContainer += `
        <div class="recipe-container card text-center">
          <img src="${result.recipe.image}" class="img-fluid rounded"/>
          <div class="card-body">
          <h3 class="text-wrap text-center fs-5" style="width: 18rem;">${result.recipe.label}</h3>
          
          </div>
          <div>
            <a href="${result.recipe.url}" target="_blank" class="btn btn-success">View Recipe</a>
          </div>
        </div>
    `;
  });

  container.style.height = "50vh";
  searchResult.innerHTML = addedContainer;
}

function createPagination(totalResults) {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pagination = document.querySelector("#pagination ul");
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
  searchRecipes();
}
