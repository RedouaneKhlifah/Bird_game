"use Strict";

let bg = document.querySelector(".bg");
let treesContainer = document.querySelector(".treesContainer");

// login butons
const Gotlogin = document.getElementById("GoTologin");
const loginContainer = document.querySelector(".containerLogin");
const loginBtn = document.getElementById("login");

// register buttons
const GoToregister = document.getElementById("goToregister");
const registerContainer = document.querySelector(".containerRegister");
const registerBtn = document.getElementById("register");

// innputs register
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// inpute login
const login_emailInput = document.getElementById("login_email");
const login_passwordInput = document.getElementById("login_password");

// overlay
const overlay = document.querySelector(".overlay");

// track id
let interval;

// score counter
let scoreCounter = 0;

// elemeent to maange the state
let tempElement;

//// form handling ///

// form changing

GoToregister.addEventListener("click", (e) => {
  initialzeInput();
  e.preventDefault();
  loginContainer.classList.add("hide");
  console.log(registerContainer);
  registerContainer.classList.remove("hide");
});

Gotlogin.addEventListener("click", (e) => {
  initialzeInput();
  e.preventDefault();
  registerContainer.classList.add("hide");
  loginContainer.classList.remove("hide");
});

// User DATA structure
const UserData = {
  email: "",
  Name: "",
  password: "",
};

// regix
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// register
registerBtn.addEventListener("click", (e) => {
  let email = emailInput.value;
  let name = nameInput.value;
  let password = passwordInput.value;
  if (!email.match(emailRegex)) {
    emailInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
  } else if (name == "") {
    nameInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
  } else if (!password.match(passwordRegex)) {
    passwordInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
  } else {
    UserData.email = email;
    UserData.Name = name;
    UserData.password = password;

    localStorage.setItem(`user${usersNum}`, JSON.stringify(UserData));
    usersNum++;

    // Optionally, you can clear the input fields

    initialzeInput();
    overlay.classList.add("hide");
    createEvirement();
  }
  // Get the values from the input fields

  // Save UserData to localStorage
});

// login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = login_emailInput.value;
  let password = login_passwordInput.value;

  const storedData = Object.keys(localStorage).map((key) => {
    return JSON.parse(localStorage.getItem(key));
  });

  const matchedUserEmail = storedData.find((user) => {
    login_emailInput.style.border = "2px solid rgb(255, 255, 255, 0.2)";
    return user.email === email;
  });
  console.log(matchedUserEmail);

  const user = storedData.find((user) => {
    return user.email === email && user.password === password;
  });

  console.log(user);

  if (matchedUserEmail && !user) {
    login_passwordInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
  } else if (user) {
    console.log("Good");
    overlay.classList.add("hide");
    createEvirement(user);
  } else {
    login_emailInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
    login_passwordInput.style.border = "2px solid rgba(255, 0, 0, 0.5)";
  }
});

// create the enviremnt to play //

function createEvirement(user) {
  // create threes
  createTree(5);

  // shoing fox
  interval = setInterval(() => {
    showbird();
  }, 2000);

  createScoreUser(user);

  // temporery element
  tempElement = createElement("sniper-container", "sniper", "img/sniper2.png");

  // add event lisiner to keybord
  document.addEventListener("keydown", (keyBord) => {
    switch (keyBord.key.toLowerCase()) {
      case "x":
        tempElement.style.opacity = 0;
        bg.style.cursor = "url('/img/please.png') 8 8, pointer";

        break;
      case "c": {
        tempElement.style.opacity = 1;
        bg.style.Cursor = `pointer`;
        break;
      }
    }
  });
}

// envirment functions //

// create tree func
let tree;
let treeContainer;
function createTree(numOfTree) {
  for (let i = 1; i <= numOfTree; i++) {
    treeContainer = document.createElement("div");
    treeContainer.classList.add(`treeContainer`);
    treeContainer.setAttribute("id", `treeContainer${i}`);

    tree = document.createElement("img");
    tree.src = "img/tree.png";
    tree.classList.add(`tree`);
    // Add the draggable attribute
    treeContainer.appendChild(tree);
    treesContainer.appendChild(treeContainer);
  }
}

// add birds to holes func
let showbird = () => {
  if (scoreCounter >= 10) {
    treesContainer.remove();
    tempElement.remove();
    bg.style.backgroundImage = "url('img/win.png')";
    clearInterval(interval);
    scoreCounter = 0;
  } else {
    console.log("playing");
    // Generate random tree element
    tree = randomTree();
    let tempImage;
    //   Check if document has a img
    if (!tree.querySelector(".fox")) {
      tempImage = createImage("img/hungry.png", "fox");
      tree.appendChild(tempImage);
      tempImage.addEventListener("click", () => {
        tree.removeChild(tempImage);
        tempImage = createImage("img/fed.png", "fox");
        tree.appendChild(tempImage);
        scoreCounter++;
        scoredocument.innerText = `10 / ${scoreCounter}`;
      });
      setTimeout(() => {
        if (tempImage.src !== "http://127.0.0.1:5501/img/fed.png") {
          tree.removeChild(tempImage);
          tempImage = createImage("img/sad.png", "fox");
          tree.appendChild(tempImage);
        }
        setTimeout(() => {
          tempImage.removeEventListener("click", () => {
            tempImage = createImage("img/fed.png", "fox");
            tree.appendChild(tempImage);
            scoreCounter++;
            scoredocument.innerText = `10 / ${scoreCounter}`;
          });
          tree.removeChild(tempImage);
          tempImage = createImage("img/leaving.png", "fox");
          tree.appendChild(tempImage);
          setTimeout(() => {
            tree.removeChild(tempImage);
          }, 2000);
        }, 2000);
      }, 2000);
    }
  }
};

// crrate score
let scoredocument;
function createScoreUser(user) {
  let title = document.createElement("div");
  title.classList.add("userScore");
  let Username = document.createElement("p");
  Username.classList.add("userName");
  Username.innerText = user.Name;
  scoredocument = document.createElement("p");
  scoredocument.classList.add("score");
  scoredocument.innerText = `10/${scoreCounter}`;
  title.appendChild(Username);
  title.appendChild(scoredocument);
  bg.appendChild(title);
}

// Helpers functions

// create image
function createImage(src, classList) {
  let img = document.createElement("img");
  img.src = src;
  console.log(classList);
  img.classList.add(classList);
  return img;
}

// generate random tree element
function randomTree() {
  let randomID = Math.floor(Math.random() * 5) + 1;

  let tree = document.getElementById(`treeContainer${randomID}`);
  return tree;
}

// create element with image inside
function createElement(ContainerClasslist, imgClassList, imgSrc) {
  const element = document.createElement("div");
  element.classList.add(ContainerClasslist);
  const img = document.createElement("img");
  img.classList.add(imgClassList);
  img.src = imgSrc;
  bg.appendChild(element);
  element.appendChild(img);

  return element;
}

// intialze inputes
function initialzeInput() {
  emailInput.value = "";
  passwordInput.value = "";

  emailInput.style.border = "2px solid rgb(255, 255, 255, 0.2)";
  emailInput.style.border = "2px solid rgb(255, 255, 255, 0.2)";
  passwordInput.style.border = "2px solid rgb(255, 255, 255, 0.2)";
}
