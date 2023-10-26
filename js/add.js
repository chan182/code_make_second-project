const commentForm = document.querySelector("#reviewarea");

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentName = document.querySelector("#name");
  const commentPassword = document.querySelector("#password");
  const commentTextArea = document.querySelector("#contentinput");
  const list = document.querySelector("#list");
  const name = commentName.value;
  const password = commentPassword.value;
  const comment = commentTextArea.value;

  // 유효성 검사
  if (name === "") {
    alert("작성자명이 비었습니다!");
    return;
  } else if (password === "") {
    alert("비밀번호를 입력해주세요!");
    return;
  } else if (comment === "") {
    alert("내용을 한 글자 이상 입력해주세요!");
    return;
  }

  let reviewobj = {
    id: Date.now(),
    username: name,
    userpassword: password,
    usercomment: comment,
  };

  const prevReviews = localStorage.getItem("review") ?? "[]";
  const parsedReviews = [...JSON.parse(prevReviews), reviewobj];
  localStorage.setItem("review", JSON.stringify(parsedReviews));
});
