let inputName = document.getElementById("input-name");
let buttonClick = document.getElementById("button-click");

buttonClick.addEventListener("click", play);

function play() {
  nameContent = inputName.value;
  localStorage.setItem("nickname", nameContent);
  render();
}
function render() {
  let name = localStorage.getItem("nickname");
  console.log(name);
  let resultHTML = `<div class="cards">
<div id="result-nickname">
    닉네임 : ${name}
</div>
<div>
    한줄평 : 너무 재미있어요
</div>
<div>
    확인 비밀번호 : 1234
</div>
<div class="input-control">

    <button>수정</button>
    <button>삭제</button>
</div>
</div>`;

  document.getElementsByClassName("review-list").innerHTML = resultHTML;
}
// function render() {
//   const name = localStorage.getItem("nikname");
//   console.log(name);
//   let resultHTML = `<div class="cards">
//   <div id="result-nickname">
//       닉네임 : ${name}
//   </div>
//   <div>
//       한줄평 : 너무 재미있어요
//   </div>
//   <div>
//       확인 비밀번호 : 1234
//   </div>
// </div>`;
// }
