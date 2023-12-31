import { makeRatingCircle } from "./util.js";
import { swear_words_arr } from "./filter.js";

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
const createMovieCard = (movieData, keyword) => {
  const { results, total_pages, page } = movieData;
  if (results.length === 0) {
    alert("검색된 데이터가 없습니다!");
    return;
  }
  const cardInven = document.getElementById("card-inven");
  cardInven.innerHTML = "";
  results.forEach((a) => {
    const { id, title, overview, poster_path, vote_average } = a;
    const movieCard = `
            <div class="card" onclick="location.href='/detail.html?movie_id=${id}'">
              <div>
                  <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="card-image"  class="hover11" style="cursor:pointer;">
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
  // pagination 버튼 생성 함수
  makePagination(page, total_pages, keyword);
};

function makePagination(currentPage, totalPages, keyword) {
  totalPages = totalPages > 500 ? 500 : totalPages;
  // 한 페이지에 보여줄 컨텐츠 개수
  const pageLimit = 20;
  // 페이징 넘버 그룹당 보여줄 숫자 개수
  const pageGroupLimit = 5;
  // 현재 페이지 그룹
  const currentPageGroup = Math.ceil(currentPage / pageGroupLimit);
  // loop 시작 번호
  const loopStartNum = (currentPageGroup - 1) * pageGroupLimit + 1;
  // loop 마지막 번호
  let loopEndNum = currentPageGroup * pageGroupLimit;
  loopEndNum = loopEndNum > totalPages ? totalPages : loopEndNum;

  const pageCard = document.createElement("div");

  pageCard.innerHTML += `<button value="1">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
  >
    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <path
      fill="currentColor"
      d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
    ></path>
  </svg>
</button>
<button value="${currentPage - 1 <= 0 ? 1 : currentPage - 1}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 320 512"
  >
    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <path
      fill="currentColor"
      d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
    ></path>
  </svg>
</button>`;
  for (let i = loopStartNum; i <= loopEndNum; i++) {
    // console.log(i);
    // console.log(`<button>${i}</button>`);
    pageCard.innerHTML += `<button value="${i}" 
    class = "${currentPage === i ? "active-pagination" : ""} ">${i}</button>`;
  }
  pageCard.innerHTML += `<button value="${
    currentPage + 1 > totalPages ? totalPages : currentPage + 1
  }">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 320 512"
  >
    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <path
      fill="currentColor"
      d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
    ></path>
  </svg>
</button>
<button value="${totalPages}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
  >
    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <path
      fill="currentColor"
      d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
    ></path>
  </svg>
</button>`;
  // console.log(pageCard);

  let paginationWrapper = document.querySelector(".pagination-wrapper");
  paginationWrapper.innerHTML = "";
  paginationWrapper.append(pageCard);

  // console.log(pageCard);
  // console.log(currentPage);

  const paginationBtns = document.querySelectorAll(
    ".pagination-wrapper button",
  ); // 배열 -> 반복문 사용 가능
  // console.log(paginationBtns);
  paginationBtns.forEach(function (i) {
    i.addEventListener("click", function (event) {
      currentPage = event.target.value;
      // console.log(currentPage);
      search(keyword, currentPage);
      pageCard.innerHTML = "";
    });
    // console.log(i);
  });
}

///  2. 검색 기능 ( get 요청하여 검색하여 정보를 가지고 옴)

async function search(keyword = "", currentPage = 1) {
  let url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`;
  if (keyword !== "") {
    url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=${currentPage}`;
  }
  const movieData = await getMovies(url);
  createMovieCard(movieData, keyword);
}

document.getElementById("search_form").addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = e.target.querySelector("#input_value").value;
  if (keyword.replaceAll(" ", "") === "") {
    alert("검색어를 입력해주세요.");
    return;
  }

  for (let i = 0; i < swear_words_arr.length; i++) {
    if (keyword.includes(swear_words_arr[i])) {
      alert("비속어는 입력할 수 없습니다.");
      return;
    }
  }

  search(keyword);
});

search();

document.querySelector("#btn_top").addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
