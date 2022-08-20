import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";

const resultSearch = document.querySelector(".movie-title");

function main() {
  const baseUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=1a641cbf6e1dd166c45cd44c8fe2f840";

  const getMovie = () => {
    axios
      .get(`${baseUrl}`)
      .then((response) => {
        if (response.error) {
          showResponseMessage(
            response.message,
            "error",
            "Something went wrong!"
          );
        } else {
          renderAllMovies(response.data.results);
        }
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });
  };

  const renderAllMovies = (movies) => {
    const listMovieElement = document.querySelector("#listMovie");
    listMovieElement.innerHTML = "";

    movies.forEach((movie) => {
      listMovieElement.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6" style="margin-top: 12px;">
          <div class="card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
            <div class="card-body text-center">
              <h5>${movie.title}</h5>
              <p><i class="fa-solid fa-star text-warning"></i>&nbsp; ${movie.vote_average}</p>
            </div>
          </div>
        </div>
      `;
    });
  };

  const searchButton = $(".button-search");
  searchButton.on("click", (event) => {
    event.preventDefault();
    const searchInput = $("#input-search");
    const searchValue = searchInput.val();
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=1a641cbf6e1dd166c45cd44c8fe2f840&query=${searchValue}`;

    if (searchValue === "") {
      showResponseMessage(
        "Please fill the search field!",
        "warning",
        "Search not found!"
      );

      resultSearch.innerHTML = "Popular Movies";

      getMovie();
    } else {
      axios
        .get(`${searchUrl}`)
        .then((response) => {
          if (response.error) {
            showResponseMessage(
              response.message,
              "error",
              "Something went wrong!"
            );
          } else {
            if (response.data.results.length == 0) {
              showResponseMessage(
                "Please make sure you type correctly!",
                "question",
                "Is your search correct?"
              );

              resultSearch.innerHTML = "Popular Movies";

              getMovie();
            } else {
              resultSearch.innerHTML = `Search result for "${searchValue}"`;

              renderAllMovies(response.data.results);
            }
          }
        })
        .catch((error) => {
          showResponseMessage(error, "error", "Something went wrong!");
        });
    }
  });

  const showResponseMessage = (
    message = "Check your internet connection",
    icon,
    title
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#3085d6",
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    getMovie();
  });
}

export default main;
