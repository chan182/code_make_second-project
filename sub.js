const inputName = document.getElementById("input-name");
const inputContent = document.getElementById("input-content");
const inputPassword = document.getElementById("input-password");
const deleteButton = document.getElementById("delete-button");
const cardList = document.getElementById("review-list");
const INFO_KEY = "infos";

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
    id: Date.now(),
  };
  inFos.push(newInfoObj);
  render(newInfoObj);
  saveInfos(inFos);
}

// 삭제

function deleteInfos(event) {
  let newPAssword = prompt();
  const div0 = event.target.parentElement;
  div0.remove();
  const filterInFos = inFos.filter((info) => info.id !== parseInt(div0.id));
  saveInfos(filterInFos);
}

// 수정

// function modifyInfos(event) {
//   const div = event.target.parentElement;
// }

// 2. 가져오기 및 그려주기

function render(newInfoObj) {
  const div0 = document.createElement("div");
  div0.id = newInfoObj.id;
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
  div0.appendChild(divName);
  div0.appendChild(divContent);
  div0.appendChild(button1);
  div0.appendChild(button2);
  cardList.appendChild(div0);
}

const savedInfos = localStorage.getItem(INFO_KEY);

if (savedInfos !== null) {
  const parsedInfos = JSON.parse(savedInfos);
  inFos = parsedInfos;
  parsedInfos.forEach(render);
}
