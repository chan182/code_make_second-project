import { makeRatingCircle } from "./util.js";

// 1. API 연결
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5Mzg5ZDZmNzJmN2ZhMGExZDlmNjE5OTk1MTIzZSIsInN1YiI6IjY1MmYzYjZmYTgwMjM2MDBjMzE2MWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M5F3fvn12gepcDxfYBe3rwlQRiDzjkBKIS7J_C-MIXs",
  },
};

const getMovies = async (url = "") => {
  return await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

// html 생성 함수
const createMovieCard = (movieData) => {
  const { results } = movieData;
  if (results.length === 0) {
    alert("검색된 데이터가 없습니다!");
    return;
  }
  const cardInven = document.getElementById("card-inven");
  cardInven.innerHTML = "";
  results.forEach((a) => {
    const { id, title, overview, poster_path, vote_average } = a;
    const movieCard = `
            <div class="card">
              <div>
                  <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="card-image"  class="hover11" onclick="alert(' id 값 :${id}')" style="cursor:pointer;">
                  ${makeRatingCircle(vote_average)}
              </div>
            <div id="card_name">${title}</div>
            <div id="card_content">${
              overview === "" ? "줄거리가 없습니다." : overview
            }</div>
          </div>
        `;
    cardInven.innerHTML += movieCard;
  });
};

///  2. 검색 기능 ( get 요청하여 검색하여 정보를 가지고 옴)

async function search(keyword = "") {
  let url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
  if (keyword !== "") {
    url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;
  }
  const movieData = await getMovies(url);
  createMovieCard(movieData);
}

document.getElementById("search_form").addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = e.target.querySelector("#input_value").value;
  if (keyword.replaceAll(" ", "") === "") {
    alert("검색어를 입력해주세요.");
    return;
  }
  search(keyword);
});

search();

document.querySelector("#btn_top").addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
