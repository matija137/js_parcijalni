var input = document.querySelector("input");
var section = document.querySelector(".items");
var loader = document.querySelector("#loading");

input.addEventListener("keyup", (event) => {
  let inputValue = event.target.value;

  removeAllArticles();

  if (inputValue.length > 0) {
    displayLoading();

    fetch(`https://api.tvmaze.com/search/shows?q="${inputValue}"`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.length > 0) {
          for (const item of data) {
            let summary = item.show.summary === null ? "-" : item.show.summary;
            let rating =
              item.show.rating.average === null
                ? "-"
                : item.show.rating.average;

            let genresTxt = item.show.genres.join(", ");
            // for (const genre of item.show.genres) {
            //   genresTxt += genre + " ";
            // }

            genresTxt = item.show.genres.length == 0 ? "-" : genresTxt;

            let article = document.createElement("article");
            article.innerHTML = `<h1>${item.show.name}</h1> <p><strong>Rating:</strong> ${rating}</p> <p><strong>Genre:</strong> ${genresTxt}</p> <p><strong>Summary:</strong> ${summary}</p>`;

            section.appendChild(article);
          }
          hideLoading();
        } else {
          displayMessage(`<p>There is no data for your query!</p>`);
          hideLoading();
        }
      })
      .catch((error) => {
        displayMessage(`Error: ${error}`);
        hideLoading();
      });
  }
});

function removeAllArticles() {
  document.querySelector(".items").innerHTML = "";
}

function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

function displayMessage(innerHTML) {
  let article = document.createElement("article");
  article.innerHTML = innerHTML;

  section.appendChild(article);
}
