const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", (e) => {
  console.log("clicked");
  if (username.value === "admin" && password.value === "admin123") {
    window.location.href = "./dashboard.html";
  } else {
    alert("Invalid Username or Password");
  }
});
