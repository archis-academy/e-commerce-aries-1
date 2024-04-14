const catContainer = document.getElementById("cat-container");

let containerItems = [
  { src: "cat-camera.svg", title: "Camera" },
  { src: "cat-celphone.svg", title: "Cellphone" },
  { src: "cat-computer.svg", title: "Computer" },
  { src: "cat-gamepad.svg", title: "Gamepad" },
  { src: "cat-headphone.svg", title: "Hadphone" },
  { src: "cat-smartwatch.svg", title: "Smartwatch" },
];

async function loadContainer() {
  let categoriesHtml = "";
  for (let i = 0; i < containerItems.length; i++) {
    categoriesHtml += `
      <div class="container-2-items" onmouseout="changeSVGcolorBlack(${i})"  onmouseover="changeSVGcolorWhite(${i})"> 
        <img id="${i}" src="/images/${containerItems[i].src}">
        <h4>${containerItems[i].title}</h4>
      </div>
    `;
  }

  catContainer.innerHTML += categoriesHtml;
}

loadContainer();

function changeSVGcolorWhite(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-white");
  element.classList.remove("filter-color-black");
}

function changeSVGcolorBlack(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-black");
  element.classList.remove("filter-color-white");
}
