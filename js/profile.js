//LogOut
const userName = JSON.parse(localStorage.getItem("userName"));
const logOutBtn = document.getElementById("logOut");
let h2 = document.querySelector("h2");

h2.innerText = `Welcome ${userName}`;

logOutBtn.addEventListener("click", () => {
  logOut();
});

function logOut() {
  localStorage.removeItem("userName");
  location.href = "index.html";
}
