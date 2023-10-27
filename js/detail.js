//  영화 세부사항

//현재 선택한 영화의 ID 값 + 페이지 값 받기
// console.log('현재 url의 파라미터 값'+window``.location.search)
// const url =window.location.href;
// const urlParams=url.searchParams;
// const movieId=urlParams.get('movie-id');
// const page=urlParams.get('페이지값');

const url = window.location.href;
const path = new URL(url);
const movieId = path.searchParams.get("영화아이디");
const currntPage = path.searchParams.get("페이지");

let mvid = 231;

// aysnc await 으로 받아오면 되고
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGM4ZDRmN2VmYjZjOGJhOThmZTZiMzQ2N2YzNzk1YyIsInN1YiI6IjY1MmY1NDk1MzU4ZGE3NWI2MWY5Y2I2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gklymgfGe7dK275X0yVEaiH-XFq6c2vDBFyK0Ef7vus",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${mvid}?language=ko-KR`, options)
  .then((response) => response.json())
  .then((response) => {
    const { title, backdrop_path, overview, release_date, runtime } = response;

    //nav bar
    let nav = document.querySelector("#navbar");
    const navhtml = `<div class='nav'><img class='nav-img'src='https://image.tmdb.org/t/p/w300${backdrop_path}'></div>
    <div class='nav'><span style='font-weight:800; font-size:20px;'> ${title}</span><br></br><br></br>
    <span style='font-weight:700;'>개봉일:</span>  ${release_date}<br></br><br></br>
    <span style='font-weight:700;'>상영시간:</span>  ${runtime} 분
    </div>
    `;
    nav.innerHTML = navhtml;
    //nav bar


    // 상세페이지
    const detailMain = document.querySelector(".detail-main");
    let text = ` 
  <div class="item"><img class='detail-img'src='https://image.tmdb.org/t/p/w300${backdrop_path}'></div>
  <div class="item title" style='border-bottom:1px solid black; 
  font-size:30px; font-weight:700;'>제목:${title}  </div>
  <div class="item">개봉일:${release_date} </div>
  <div class="item">상영시간:${runtime}분  </div>
  <div class="item">줄거리:${overview}  </div>`;
    detailMain.innerHTML = text;
    // 상세페이지

    document.querySelector('.content').append(`${overview}`);
  })
  .catch((err) => console.error(err));


//  Tab 생성 start
const btnTab = document.querySelector(".list");
const tabContents = document.querySelectorAll(".tab-content");
btnTab.addEventListener("click", function (e) {
  for (let i = 0; i < e.currentTarget.children.length; i++) {
    e.currentTarget.children[i].classList.remove("selected");
    tabContents[i].classList.remove("show");
    console.log("돌아돌아");
  }
  //이 for문으로 인해 select 된 태그를 초기화 시켜준다. -> 현재 보여지는 selected를 없애줌
  e.target.classList.add("selected");
  tabContents[e.target.dataset.id].classList.add("show");
});
//  Tab 생성 end

//navbar+sticky

window.onscroll = function () {
  scrollFunction();
  myFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 470 ||
    document.documentElement.scrollTop > 470
  ) {
    document.getElementById("navbar").style.top = "0px";
  } else {
    document.getElementById("navbar").style.top = "-200px";
  }
}

let navbar = document.querySelector("ul.list");
let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}





//navbar +sticky
