const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");
const totalIssues = document.getElementById("totalIssues");
const allItemContainer = document.getElementById("allItemContainer");
const loadingBar = document.getElementById("loadingBar");

let allIssues = [];

console.log(
  searchBtn,
  searchInput,
  btnAll,
  btnOpen,
  btnClosed,
  totalIssues,
  allItemContainer,
  loadingBar,
);

function showLoadingBar(isLoading) {
  if (isLoading) {
    loadingBar.classList.remove("hidden");
    allItemContainer.classList.remove("hidden");
  } else {
    loadingBar.classList.add("hidden");
    allItemContainer.classList.remvoe("hidden");
  }
}

async function allItemLoad() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  displayAllItem(allIssues);
}

allItemLoad();
