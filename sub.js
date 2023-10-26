const inputName = document.getElementById("input-name");
const inputContent = document.getElementById("input-content");
const inputPassword = document.getElementById("input-password");
const deleteButton = document.getElementById("delete-button");
const cardList = document.getElementById("review-list");
const REVIEW_KEY = "reviews";
const movieId = 1203232;
const buttonClick = document.getElementById("button-click");
const savedInfos = localStorage.getItem(REVIEW_KEY);
let review = [];

buttonClick.addEventListener("click", checking);
buttonClick.addEventListener("click", play);

// 유효성 검사
function checking() {
  if (inputName.value === "") {
    alert("작성자명이 비었습니다!");
    return;
  } else if (inputPassword.value === "") {
    alert("비밀번호를 입력해주세요");
    return;
  } else if (inputContent.value === "") {
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
  const newName = inputName.value;
  const newContent = inputContent.value;
  const newPassword = inputPassword.value;
  const newInfoObj = {
    name: newName,
    content: newContent,
    password: newPassword,
    movieId,
    id: Date.now(),
  };
  console.log(review);
  review.push(newInfoObj);
  saveInfos(review);
  render(newInfoObj);
}

// 삭제버튼 클릭시 비밀번호 입력 값 받고 맞으면 삭제 처리

function deleteInfos(event) {
  let newPassword = prompt();

  const parentDiv = event.target.parentElement;

  if (newPassword !== parentDiv.dataset.password) {
    alert("비밀번호가 다릅니다.");
    return;
  }

  const filterInFos = inFos.filter(
    (info) => info.id !== parseInt(parentDiv.id),
  );
  saveInfos(filterInFos);
  render();
}

// 수정

// 2. 가져오기 및 그려주기

function render() {
  cardList.innerHTML = "";
  const reviews = localStorage.getItem("reviews");

  JSON.parse(reviews)
    .filter((item) => {
      return item.movieId === movieId;
    })
    .forEach((newInfoObj) => {
      const parentDiv = document.createElement("div");
      parentDiv.id = newInfoObj.id;
      parentDiv.dataset.password = newInfoObj.password;
      const divName = document.createElement("div");
      divName.innerText = `이름 : ${newInfoObj.name}`;
      const divContent = document.createElement("div");
      divContent.innerText = `한줄평 : ${newInfoObj.content}`;
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "삭제";
      const modifyButton = document.createElement("button");
      modifyButton.innerText = "수정";
      deleteButton.addEventListener("click", deleteInfos);
      // modifyButton.addEventListener("click", modifyInfos);
      parentDiv.appendChild(divName);
      parentDiv.appendChild(divContent);
      parentDiv.appendChild(deleteButton);
      parentDiv.appendChild(modifyButton);
      cardList.appendChild(parentDiv);
    });
}

if (savedInfos !== null) {
  const parsedReviews = JSON.parse(savedInfos);
  inFos = parsedReviews;
  parsedReviews.forEach(render);
}
