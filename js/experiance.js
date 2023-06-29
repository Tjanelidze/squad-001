const star = document.querySelector(".star");
const star2 = document.querySelector(".star2");
const textBox = document.querySelector(".textBox");
const textBox2 = document.querySelector(".textBox2");
const inputYes = document.querySelector(".input-yes");
const inputNo = document.querySelector(".input-no");
let levelOfknowledge = "";
const personName = document.querySelectorAll(".imgtext");
const imageContainer = document.querySelectorAll(".imgdiv");
const personImage = document.querySelectorAll(".person-image");
let dropdown2 = document.querySelector(".dropdown2");
let character = "";
let countOfYesAndNo = "";
let characterId = "";

//წითელი ვარსკვლავი

function redStar(a, b) {
  if (a.value !== "") {
    b.style.display = "none";
  } else {
    b.style.display = "inline";
  }
}

// ვიღებთ ინფორმაციას ლინკიდან და გადავცემტ შესაბამის ელემენტებს

fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    for (let i = 0; i < 4; i++) {
      personName[i].innerHTML = data[i].name;
      personImage[i].src = data[i].image;
      imageContainer[i].appendChild(personImage[i]);
      characterId = data[i].id;
    }
  });

// პერსონაჟს ვარჩევტ და გამოგვაქვს ინფუთის ეკრანზე

imageContainer.forEach(function (element, index) {
  element.addEventListener("click", function () {
    textBox2.value = personName[index].innerHTML;
    // userInformationObj["character_id"] = characterId[index];
    // console.log(userInformationObj);
  });
});

//პერსონაჟს გადავცემთ ლოკალ სთორს

dropdown2.onclick = function () {
  dropdown2.classList.toggle("active");
  character = textBox2.value;
  localStorage.setItem("character", character);
  redStar(textBox2, star2);
};

// ვიგებთ მომხმარებლის გამოცდილებას და გადავცემთ ლოკალ სთორს

function show(anything) {
  textBox.value = anything;
}
let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
  levelOfknowledge = textBox.value;
  localStorage.setItem("levelOfknowledge", levelOfknowledge);

  redStar(textBox, star);
};

//ვარკვევტ აქვს თუ არა ტურნიტში მონაწილეობა მიღებული

inputYes.addEventListener("input", function () {
  countOfYesAndNo = inputYes.value;
  localStorage.setItem("countOfYesAndNo", countOfYesAndNo);
});
inputNo.addEventListener("input", function () {
  countOfYesAndNo = inputNo.value;
  localStorage.setItem("countOfYesAndNo", countOfYesAndNo);
});

//ვუზრუნველვყობთ რომ რეფრეშის შემდეგაც მნიშვნელობა არ დაიკარგოს

document.addEventListener("DOMContentLoaded", function () {
  textBox.value = localStorage.getItem("levelOfknowledge");
  textBox2.value = localStorage.getItem("character");
  redStar(textBox2, star2);
  redStar(textBox, star);
  const countOfYesAndNoValue = localStorage.getItem("countOfYesAndNo");
  if (countOfYesAndNoValue == "yes") {
    inputYes.checked = true;
  } else if (countOfYesAndNoValue == "no") {
    inputNo.checked = true;
  }
});
