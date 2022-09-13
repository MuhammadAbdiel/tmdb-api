import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";

const resultSearch = document.querySelector(".movie-title");

function main() {
  const baseUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=1a641cbf6e1dd166c45cd44c8fe2f840";

  const getMovie = () => {
    $("#loading").append(`
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `);

    axios
      .get(`${baseUrl}`)
      .then((response) => {
        $("#loading").empty();

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
            <img src="https://image.tmdb.org/t/p/w500${
              movie.backdrop_path
            }" alt="">
            <div class="card-body text-center">
              <h5>${movie.title}</h5>
              <p><i class="fa-solid fa-star text-warning"></i>&nbsp; ${
                movie.vote_average
              }</p>
              <button class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#${movie.title
                .split(" ")
                .join("")
                .replace(
                  /[^\w\s]/gi,
                  ""
                )}"><i class="fa-solid fa-circle-info"></i>&nbsp; Detail</button>
            </div>
          </div>
        </div>

        <div class="modal fade" id="${movie.title
          .split(" ")
          .join("")
          .replace(
            /[^\w\s]/gi,
            ""
          )}" tabindex="-1" aria-labelledby="${movie.title
        .split(" ")
        .join("")
        .replace(/[^\w\s]/gi, "")}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${movie.title
                  .split(" ")
                  .join("")
                  .replace(/[^\w\s]/gi, "")}Label">${movie.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body movie" id="movie">
                <div class="movie-detail">
                  <img class="movie__poster" src="https://image.tmdb.org/t/p/w500${
                    movie.poster_path
                  }" alt="${movie.title}" />
                  <div class="movie__info">
                    <h3>Information</h3>
                    <h4>Release Date</h4>
                    <p>${movie.release_date}</p>
                    <h4>Rating</h4>
                    <p><i class="fa-solid fa-star text-warning"></i>&nbsp; ${
                      movie.vote_average
                    }</p>
                  </div>
                </div>
                <div class="movie__overview">
                  <h3>Overview</h3>
                  <p>${movie.overview}</p>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i>&nbsp; Close</button>
              </div>
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
      $("#loading").append(`
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `);

      axios
        .get(`${searchUrl}`)
        .then((response) => {
          $("#loading").empty();

          if (response.error) {
            showResponseMessage(
              response.message,
              "error",
              "Something went wrong!"
            );
          } else if (response.data.results.length == 0) {
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
      icon,
      title,
      text: message,
      confirmButtonColor: "#3085d6",
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    getMovie();
  });
}

export default main;
