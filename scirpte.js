"use strict";

let earth = document.getElementById("earth");

let holes = document.querySelectorAll(".hole");

// create holes func
let hole;
let createWholes = (numOfHoles) => {
  for (let i = 1; i <= numOfHoles; i++) {
    hole = document.createElement("div");
    hole.classList.add(`whole`);
    hole.setAttribute("id", `hole${i}`);
    earth.appendChild(hole);
  }
};

// add birds to holes func
let addILittleBirds = () => {
  // Generate random number
  let randomID = Math.floor(Math.random() * 6) + 1;

  // create hungry image
  let hungry = document.createElement("img");
  hungry.src = "img/hungry.png";
  hungry.style.width = "80px";

  // create sad image
  let sadOrFed = document.createElement("img");
  sadOrFed.src = "img/sad.png";
  sadOrFed.style.width = "80px";

  // create leaving image
  let leaving = document.createElement("img");
  leaving.src = "img/leaving.png";
  leaving.style.width = "80px";

  // create fed image
  let fed = document.createElement("img");
  fed.src = "img/fed.png";
  fed.style.width = "80px";

  let hole = document.getElementById(`hole${randomID}`);

  //   Check if document has a bird
  if (!hole.querySelector("img")) {
    hole.appendChild(hungry);
    hungry.addEventListener("mouseover", () => {
      hole.style.cursor = "url('/img/cursor-worm_small.png') 8 8, pointer";
      hole.addEventListener("click", () => {
        sadOrFed.src = "img/fed.png";
      });
      hole.removeEventListener("click", false);
    });
    setTimeout(() => {
      hole.removeChild(hungry);
      hole.appendChild(sadOrFed);
      sadOrFed.addEventListener("mouseover", () => {
        hole.style.cursor = "url('/img/cursor-worm_small.png') 8 8, pointer";
      });
      hole.addEventListener("click", () => {
        sadOrFed.src = "img/fed.png";
      });
      setTimeout(() => {
        hole.removeChild(sadOrFed);
        hole.style.cursor = "url('/img/cursor_small.png') 8 8, pointer";
        hole.appendChild(leaving);
        sadOrFed.removeEventListener("mouseover", () => {
          hole.style.cursor = "url('/img/cursor-worm_small.png') 8 8, pointer";
        });
        setTimeout(() => {
          hole.removeChild(leaving);
          hole.removeEventListener("click", () => {
            hole.style.cursor =
              "url('/img/cursor-worm_small.png') 8 8, pointer";
          });
        }, 1000);
      }, 1000);
    }, 1000);
  }
};

// functions invoking
createWholes(6);
setInterval(() => addILittleBirds(), 500);
