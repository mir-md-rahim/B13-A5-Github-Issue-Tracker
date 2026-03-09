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

// priority styles
const priorityStyles = {
  high: "bg-pink-50 text-red-500",
  medium: "bg-yellow-50 text-yellow-500",
  low: "bg-gray-100 text-gray-800",
};

// labalesDetails styles
const priorityDetailsStyles = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-500 text-white",
  low: "bg-gray-500 text-white",
};
// level styles
const levelsStyles = {
  high: "bg-pink-50 text-red-500",
  medium: "bg-yellow-50 text-yellow-500",
  low: "bg-gray-100 text-gray-800",
};

// labels logo
const labelsLogoStyles = {
  bug: "🤖",
  "help wanted": "⚙️",
};

// labels styles
const labelsStyles = {
  bug: "bg-pink-50 text-red-500",
  "help wanted": "bg-yellow-50 text-yellow-500",
};

// labels mapping
const createLebelsElement = (arr) => {
  const htmlElements = arr.map(
    (el) => `

    <div class="flex items-center gap-1 ${labelsStyles[el] || "bg-green-50 text-green-500"} px-3 py-1 rounded-full  font-semibold">
                    <span>${labelsLogoStyles[el] || "✨"}</span>
                    <span class="uppercase text-sm tracking-tight">${el}</span>
                  </div>
  
  `,
  );
  return htmlElements.join("");
};

// display all issues data using card style
function displayAllItem(datas) {
  showLoadingBar(true);
  totalIssues.innerText = datas.length;
  allItemContainer.innerHTML = "";
  datas.forEach((item) => {
    const div = document.createElement("div");
    const itemString = JSON.stringify(item).replace(/"/g, "&quot;");
    div.innerHTML = ` 

            <div onClick="detailsCard(${itemString})"
                class="max-w-md mx-auto h-full overflow-hidden bg-white border-t-3 ${item.status === "open" ? "border-[#00A96E]" : "border-[#A855F6]"}  rounded-2xl p-6 shadow-sm font-sans"
              >
                <div class="flex justify-between items-center mb-6">
                  <div>
                    <img src="./assets/${item.status === "open" ? "Open-Status" : "Closed-Status"}.png" alt="" />
                  </div>

                  <span
                    class="${priorityStyles[item.priority] || "bg-green-50 text-green-500"} text-sm font-bold px-6 py-2 rounded-full tracking-wider uppercase"
                  >
                    ${item.priority}
                  </span>
                </div>

                <h2
                  class="text-2xl font-bold text-slate-800 leading-tight mb-3"
                >
                  ${item.title}
                </h2>

                <p class="text-slate-500 text-lg mb-6 line-clamp-2">
                  ${item.description}
                </p>

                <div class="flex gap-3 mb-8">
                  ${createLebelsElement(item.labels)}

                </div>

                <hr class="border-gray-200 mb-6" />

                <div class="text-slate-500 font-medium space-y-1">
                  <p>#${item.id} by ${item.author}</p>
                  <p>${new Date(!item.updatedAt ? item.createdAt : item.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
        
        `;
    allItemContainer.appendChild(div);
  });

  showLoadingBar(false);
}

// details card
function detailsCard(data) {
  console.log(data);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 font-sans">
  
        <h2 class="text-2xl font-bold text-slate-800 mb-3">
          ${data.title}
        </h2>

        <div class="flex items-center gap-3 mb-6 text-sm text-slate-500">
          <span class="${data.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F6]"} text-white px-4 py-1 rounded-full text-md font-semibold">
            ${data.status}
          </span>
          <span>•</span>
          <span>Opened by <span class="hover:underline cursor-pointer">${data.author}
          <span> ${new Date(!data.updatedAt ? data.createdAt : data.updatedAt).toLocaleDateString()}</span>
        </div>

        <div class="flex gap-2 mb-8">
          ${createLebelsElement(data.labels)}
        </div>

        <p class="text-slate-500 leading-relaxed mb-8">
          ${data.description}
        </p>

        <div class="bg-slate-50 rounded-lg p-6 flex justify-between items-center mb-8">
          <div>
            <p class="text-slate-400 text-sm mb-1">Assignee:</p>
            <p class="text-slate-800 font-bold text-lg">${data.assignee ? data.assignee : "Unassigned"}</p>
          </div>
          <div class="text-right">
            <p class="text-slate-400 text-sm mb-1 text-left">Priority:</p>
            <span class="${priorityDetailsStyles[data.priority] || "bg-green-500 text-white"} text-white px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
              ${data.priority}
            </span>
          </div>
        </div>
      </div>
  `;
  document.getElementById("details_modal").showModal();
}

// All button click
btnAll.addEventListener("click", function () {
  showLoadingBar(true);
  btnAll.classList.remove("btn-outline");
  btnOpen.classList.add("btn-outline");
  btnClosed.classList.add("btn-outline");
  displayAllItem(allIssues);
  showLoadingBar(false);
});

// Open button click
btnOpen.addEventListener("click", function () {
  showLoadingBar(true);
  btnOpen.classList.remove("btn-outline");
  btnAll.classList.add("btn-outline");
  btnClosed.classList.add("btn-outline");
  const openIssues = allIssues.filter(
    (item) => item.status.toLowerCase() === "open",
  );
  displayAllItem(openIssues);
  showLoadingBar(false);
});

// Closed button click
btnClosed.addEventListener("click", function () {
  showLoadingBar(true);
  btnClosed.classList.remove("btn-outline");
  btnAll.classList.add("btn-outline");
  btnOpen.classList.add("btn-outline");
  const closedIssues = allIssues.filter(
    (item) => item.status.toLowerCase() === "closed",
  );
  displayAllItem(closedIssues);
  showLoadingBar(false);
});

// Search
searchBtn.addEventListener("click", function () {
  showLoadingBar(true);
  btnClosed.classList.add("btn-outline");
  btnAll.classList.add("btn-outline");
  btnOpen.classList.add("btn-outline");
  const searchValue = searchInput.value.toLowerCase();
  const searchResult = allIssues.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue),
  );
  displayAllItem(searchResult);
  showLoadingBar(false);
});

allItemLoad();
