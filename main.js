// 1. API

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5Mzg5ZDZmNzJmN2ZhMGExZDlmNjE5OTk1MTIzZSIsInN1YiI6IjY1MmYzYjZmYTgwMjM2MDBjMzE2MWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M5F3fvn12gepcDxfYBe3rwlQRiDzjkBKIS7J_C-MIXs",
    },
};

let cardStr = document.getElementById("card-str");
let searchButton = document.getElementById("search-button");
let inputValueArea = document.getElementById("input_value");
let btnTop = document.getElementById("btn_top");

fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
)
    .then((response) => response.json())
    .then((data) => {
        const movieData = data.results; // 20개짜리 배열을 넣어준다.
        // forEach로 각각 훓는다.
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

            cardStr.innerHTML += temp_html; //
        });
    });

///  2. 검색 기능

function search() {
    fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
    )
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .then((data) => {
            const movieData = data.results;
            const inputValue = inputValueArea.value.toLowerCase();
            const cardStr = document.getElementById("card-str");

            cardStr.innerHTML = "";

            movieData.forEach((a) => {
                let title = a["title"].toLowerCase();
                let overview = a["overview"];
                let poster_path = a["poster_path"];
                let vote_average = a["vote_average"];
                let id_area = a["id"];
                let temp_html = ``;

                // the 검색 해보는 것 ( filter...?)
                // 문제점) 타이틀 제목이 동일하게 검색해야 뜬다..

                if (title.includes(inputValue)) {
                    temp_html = `<div class="card">
                    <div>
                    <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="card-image" onclick="alert(' id 값 :${id_area}')" style="cursor:pointer;">
                    </div>
                    <div id="card_name">${title}</div>
                    <div id="card_content">${overview}</div>
                    <div >평점 :${vote_average} 👍👍👍</div>
                    </div>
                    `;
                } else {
                    temp_html = ``;
                }

                cardStr.innerHTML += temp_html; //
            });
        });
}

searchButton.addEventListener("click", () => {
    search();
});

// 자바스크립트 저장
// 전체 데이터베이스가 필요함 . 그 전테 데이터베이스 훓기 , 있으면 남기기 없으면 가리기
//

// 검색 api      search-MOVIES  // 한글 .... ㅅㅂ...  language  : kr-KR
// 1. 어떤 영화가 있는지 가져오기 ( 불러온 데이터 )
// const cards = document.getElementsByClassName("card");
// console.log(cards);
//

// })
// 2. 내가 검색한 데이터가 무엇인지 확인하기
// 3. 1 가져오데인터와 2번 데이터가 일치하는지 확인
// 3-1 . 일치하는 데이터가 있다면 보여주기
// 3-2 그렇지 않다면 가려주기
