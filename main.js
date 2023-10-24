let cardInven = document.getElementById("card-inven");
let searchButton = document.getElementById("search-button");
let inputValueArea = document.getElementById("input_value");
let btnTop = document.getElementById("btn_top");

// 1. API 연결

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5Mzg5ZDZmNzJmN2ZhMGExZDlmNjE5OTk1MTIzZSIsInN1YiI6IjY1MmYzYjZmYTgwMjM2MDBjMzE2MWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M5F3fvn12gepcDxfYBe3rwlQRiDzjkBKIS7J_C-MIXs",
    },
};

fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
    options
)
    .then((response) => response.json())
    .then((data) => {
        const movieData = data.results; // 20개짜리 배열을 넣어준다.
        movieData.forEach((a) => {
            let title = a["title"];
            let overview = a["overview"];
            let poster_path = a["poster_path"];
            let vote_average = a["vote_average"];
            let id_area = a["id"];
            let temp_html = `<div class="card">
            <div>
                <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="card-image"  class="hover11" onclick="alert(' id 값 :${id_area}')" style="cursor:pointer;">
            </div>
            <div id="card_name">${title}</div>
            <div id="card_content">"${overview}"</div>
            <div id="card-score"> Rating : ${vote_average} ❤️❤️❤️❤️</div>
        </div>`;

            cardInven.innerHTML += temp_html; //
        });
    });

///  2. 검색 기능 ( get 요청하여 검색하여 정보를 가지고 옴)

function search() {
    const inputValueDOM = document.getElementById("input_value");
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5Mzg5ZDZmNzJmN2ZhMGExZDlmNjE5OTk1MTIzZSIsInN1YiI6IjY1MmYzYjZmYTgwMjM2MDBjMzE2MWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M5F3fvn12gepcDxfYBe3rwlQRiDzjkBKIS7J_C-MIXs",
        },
    };

    fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputValueDOM.value}&include_adult=false&language=ko-KR&page=1`,
        options
    )
        .then((response) => response.json())
        .then((data) => {
            const cardInven = document.getElementById("card-inven");
            cardInven.innerHTML = "";

            data.results.forEach((a) => {
                let title = a["title"].toLowerCase();
                let overview = a["overview"];
                let poster_path = a["poster_path"];
                let vote_average = a["vote_average"];
                let id_area = a["id"];
                let temp_html = ``;

                temp_html = `<div class="card">
                    <div>
                    <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="card-image" onclick="alert(' id 값 :${id_area}')" style="cursor:pointer;">
                    </div>
                    <div id="card_name">${title}</div>
                    <div id="card_content">${overview}</div>
                    <div >평점 :${vote_average} ❤️❤️❤️❤️</div>
                    </div>
                    `;

                cardInven.innerHTML += temp_html; //
            });
        })
        .catch((err) => console.error(err));
}

// 클릭시 search 함수가 작동된다.
searchButton.addEventListener("click", () => {
    search();
});

// input 입력 후 엔터칠 시 검색이 작동된다.

document.getElementById("input_value").addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
        document.getElementById("search-button").click();
    }
});
