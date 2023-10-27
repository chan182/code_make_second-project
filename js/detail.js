import { makeRatingCircle } from "./util.js";

//  영화 세부사항

const url = window.location.href;
const path = new URL(url);
const movieId = path.searchParams.get("movie_id");
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
// const currntPage = path.searchParams.get("페이지");

// aysnc await 으로 받아오면 되고
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGM4ZDRmN2VmYjZjOGJhOThmZTZiMzQ2N2YzNzk1YyIsInN1YiI6IjY1MmY1NDk1MzU4ZGE3NWI2MWY5Y2I2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gklymgfGe7dK275X0yVEaiH-XFq6c2vDBFyK0Ef7vus",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options)
  .then((response) => response.json())
  .then((response) => {
    const {
      title,
      backdrop_path,
      overview,
      release_date,
      runtime,
      belongs_to_collection,
      genres,
      vote_average,
      tagline,
    } = response;

    document.title = title;

    //  장르
    const createGenres = genres.map((item) => {
      return item.name;
    });

    // review wrapper imgage 변경
    const reviewWrapper = document.querySelector(".review-wrapper");
    reviewWrapper.style.backgroundImage = `url(${IMG_PATH}${backdrop_path})`;

    //nav bar
    let nav = document.querySelector("#navbar");
    const navhtml = `
    <div class="nav">
      <img class="nav-img" src="${IMG_PATH}${backdrop_path}">
        ${makeRatingCircle(vote_average, "sticky-circle")}
      </div>
      <div class="nav"><span style="font-weight:800; font-size:20px;"> ${title}</span><br></br><br></br>
      <span style="font-weight:700;">개봉일:</span>  ${release_date}<br></br><br></br>
      <span style="font-weight:700;">상영시간:</span>  ${runtime} 분
    </div>
    `;
    nav.innerHTML = navhtml;
    //nav bar

    // 상세페이지
    const detailMain = document.querySelector(".detail-main");
    detailMain.innerHTML = ` 
  <div class="item">
  <img class="detail-img" src="${IMG_PATH}${backdrop_path}">
  ${makeRatingCircle(vote_average, "detail")}
  </div>
  
  <div class="item title" style="border-bottom:1px solid black; font-size:30px; font-weight:700;">${title}</div>
  <div class="item">개봉일: ${release_date} </div>
  <div class="item">상영시간: ${runtime}분  </div>
  <div class="item">장르: ${createGenres}  </div>
  `;
    // 상세페이지

    document.querySelector(".content").innerHTML = `
      <br/>
      <h1 style="font-size:4rem; font-weight: bold;">${title}</h1>
      <br/>
      <br/>
      <strong style="font-size:3.2rem; font-weight: bold;">${tagline}</strong>
      <br/>
      <br/>
      ${overview === "" ? "줄거리가 없습니다." : overview}  `;
  })
  .catch((err) => console.error(err));

//  Tab 생성 start
const btnTab = document.querySelectorAll(".list > li");
const tabContents = document.querySelectorAll(".tab-content");
btnTab.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const parent = e.target.parentNode;
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].classList.remove("selected");
      tabContents[i].classList.remove("show");
    }
    //이 for문으로 인해 select 된 태그를 초기화 시켜준다. -> 현재 보여지는 selected를 없애줌
    e.target.classList.add("selected");
    tabContents[e.target.dataset.id].classList.add("show");
  });
});
//  Tab 생성 end

//navbar+sticky

window.onscroll = function () {
  scrollFunction();
  myFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop >= 445 ||
    document.documentElement.scrollTop >= 445
  ) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100%";
  }
}

function myFunction() {
  const navbar = document.querySelector("ul.list");
  const content = document.querySelector(".tab-content.show");
  const sticky = navbar.offsetTop;
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    content.style.paddingTop = "390px";
  } else {
    navbar.classList.remove("sticky");
    content.style.paddingTop = "0";
  }
}

// reviews start

const inputName = document.getElementById("input-name");
const inputContent = document.getElementById("input-content");
const inputPassword = document.getElementById("input-password");
const deleteButton = document.getElementById("delete-button");
const cardList = document.querySelector(".review-list");
const REVIEW_KEY = "reviews";
const buttonClick = document.getElementById("button-click");
const savedInfos = localStorage.getItem(REVIEW_KEY) ?? "[]";
let review = [...JSON.parse(savedInfos)];

buttonClick.addEventListener("click", play);

// 유효성 검사
function checking() {
  if (inputName.value === "") {
    alert("작성자명이 비었습니다!");
    return;
  }
  if (inputPassword.value === "") {
    alert("비밀번호를 입력해주세요");
    return;
  }
  if (inputContent.value === "") {
    alert("내용을 한 글 자 이상 입력해주세요!");
    return;
  }
}

// 저장하기 3
function saveInfos(newreview) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(newreview));
}

// 저장하기 1
function play() {
  checking();
  const newName = inputName;
  const newContent = inputContent;
  const newPassword = inputPassword;
  const newInfoObj = {
    name: newName.value,
    content: newContent.value,
    password: newPassword.value,
    movieId,
    id: Date.now(),
  };
  newName.value = "";
  newContent.value = "";
  newPassword.value = "";

  review.push(newInfoObj);
  saveInfos(review);
  render(newInfoObj);
}

// 삭제버튼 클릭시 비밀번호 입력 값 받고 맞으면 삭제 처리

function deleteInfos(event) {
  let newPassword = prompt();

  const parentDiv = event.target.parentElement;
  console.log(parentDiv);

  if (newPassword !== parentDiv.dataset.password) {
    alert("비밀번호가 다릅니다.");
    return;
  }

  const filterInFos = review.filter(
    (info) => info.id !== parseInt(parentDiv.id),
  );
  saveInfos(filterInFos);
  render();
}

// 수정

// 2. 가져오기 및 그려주기

function render() {
  cardList.innerHTML = "";
  const reviews = localStorage.getItem("reviews") ?? "[]";

  JSON.parse(reviews)
    .filter((item) => {
      return item.movieId === movieId;
    })
    .forEach((newInfoObj) => {
      const parentDiv = document.createElement("div");

      parentDiv.id = newInfoObj.id;
      parentDiv.dataset.password = newInfoObj.password;
      parentDiv.classList.add("review-content__wrapper");
      parentDiv.innerHTML = `
        <div class='review-content'>이름 : ${newInfoObj.name}</div>
        <div class='review-content'>한줄평 : ${newInfoObj.content}</div>
        <div class="review-btn-group" id="${newInfoObj.id}" data-password="${newInfoObj.password}">
        <button>삭제</button><!--<button>수정</button>-->
        </div>
      `;

      parentDiv.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", deleteInfos);
      });
      // modifyButton.addEventListener("click", modifyInfos);
      cardList.appendChild(parentDiv);
    });
}

render();
