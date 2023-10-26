const inputName = document.getElementById("input-name");
const inputContent = document.getElementById("input-content");
const inputPassword = document.getElementById("input-password");
const deleteButton = document.getElementById("delete-button");
const cardList = document.getElementById("review-list");
const INFO_KEY = "infos";

const movieId = 1203232;

let inFos = [];

let buttonClick = document.getElementById("button-click");

buttonClick.addEventListener("click", play);

// 저장하기 3
function saveInfos(newInfos) {
  localStorage.setItem(INFO_KEY, JSON.stringify(newInfos));
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
  inFos.push(newInfoObj);
  saveInfos(inFos);
  render(newInfoObj);
}

// 삭제

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

// function modifyInfos(event) {
//   const div = event.target.parentElement;
// }

// 2. 가져오기 및 그려주기

function render() {
  cardList.innerHTML = "";
  const reviews = localStorage.getItem("infos");

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
      const button1 = document.createElement("button");
      button1.innerText = "삭제";
      const button2 = document.createElement("button");
      button2.innerText = "수정";
      button1.addEventListener("click", deleteInfos);
      // button2.addEventListener("click", modifyInfos);
      parentDiv.appendChild(divName);
      parentDiv.appendChild(divContent);
      parentDiv.appendChild(button1);
      parentDiv.appendChild(button2);
      cardList.appendChild(parentDiv);
    });
}

const savedInfos = localStorage.getItem(INFO_KEY);

if (savedInfos !== null) {
  const parsedInfos = JSON.parse(savedInfos);
  inFos = parsedInfos;
  parsedInfos.forEach(render);
}
