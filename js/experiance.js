const star = document.querySelector(".star");
const star2 = document.querySelector(".star2");
const inputArray = document.querySelectorAll(".textBox");
const textBox = document.querySelector(".textBox1");
const textBox2 = document.querySelector(".textBox2");
const inputYes = document.querySelector(".input-yes");
const inputNo = document.querySelector(".input-no");
let levelOfknowledge = null;
const personName = document.querySelectorAll(".imgtext");
const imageContainer = document.querySelectorAll(".imgdiv");
const personImage = document.querySelectorAll(".person-image");
let dropdown2 = document.querySelector(".dropdown2");
let dropdown = document.querySelector(".dropdown");
let character = "";
let countOfYesAndNo = "";
let characterId = "";
let countOfYesAndNoValue = "";
let doneButton = document.querySelector(".done-button");
const erorP = document.querySelector(".eror-input-name");
const erorWindow = document.querySelector(".eror-window");
const invalidEmailP = document.querySelector(".invalid-email-p");
const xSign = document.querySelector(".x-sign");

let erorArray = ["level of knowledge", "character", "experiance"];
const url = "https://chess-tournament-api.devtest.ge/api/register";

let userInformationAndExperiance = {
  name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  experience_level: "",
  already_participated: "",
  character_id: "",
};

//ერორის ფანჯრის დახურვა.

xSign.addEventListener("click", function () {
  erorWindow.style.display = "none";
});

//წითელი ვარსკვლავი.

function redStar(a, b) {
  if (a.value !== "") {
    b.style.display = "none";
  } else {
    b.style.display = "inline";
  }
}

// ვიღებთ ინფორმაციას ლინკიდან და გადავცემტ შესაბამის ელემენტებს.

fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < 4; i++) {
      personName[i].innerHTML = data[i].name;
      personImage[i].src = data[i].image;
      imageContainer[i].appendChild(personImage[i]);
    }
  });

// პერსონაჟს ვარჩევთ, გამოგვაქვს ინფუთის ეკრანზე და გადავცემთ ლოქალ სთორს.

imageContainer.forEach(function (element, index) {
  element.addEventListener("click", function () {
    textBox2.value = personName[index].innerHTML;
    character = textBox2.value;
    localStorage.setItem("character", character);
    localStorage.setItem("character_id", index + 1);
  });
});

// დროპდაუნ მენიუ.

dropdown2.onclick = function () {
  dropdown2.classList.toggle("active");
  redStar(textBox2, star2);
};

// ვიგებთ მომხმარებლის გამოცდილებას და გადავცემთ ლოკალ სთორს.

function show(anything) {
  textBox.value = anything;
}
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
  levelOfknowledge = textBox.value;
  localStorage.setItem("experience_level", levelOfknowledge);
  redStar(textBox, star);
};

//ვარკვევტ აქვს თუ არა ტურნიტში მონაწილეობა მიღებული.

inputYes.addEventListener("input", function () {
  countOfYesAndNo = true;
  localStorage.setItem("already_participated", countOfYesAndNo);
});
inputNo.addEventListener("input", function () {
  countOfYesAndNo = false;
  localStorage.setItem("already_participated", countOfYesAndNo);
});

//ვუზრუნველვყობთ რომ რეფრეშის შემდეგაც მნიშვნელობა არ დაიკარგოს.

document.addEventListener("DOMContentLoaded", function () {
  textBox.value = localStorage.getItem("experience_level");
  textBox2.value = localStorage.getItem("character");

  redStar(textBox2, star2);
  redStar(textBox, star);

  countOfYesAndNoValue = localStorage.getItem("already_participated");
  if (countOfYesAndNoValue === "true") {
    inputYes.checked = true;
  } else if (countOfYesAndNoValue === "false") {
    inputNo.checked = true;
  }
});

// დან ღილაკი

doneButton.addEventListener("click", function () {
  // ვქმნით ახალ მასივს და მასში ვფუშავთ მესამე გვერდზე არსებული სამივე ინპუთის მნიშვნელობას,
  //ასევე ვქმნით ქაუნთს ერორების დასათვლელად.

  let erorCount = 0;
  countOfYesAndNoValue = localStorage.getItem("already_participated");
  let inputValueArray = [];
  erorP.innerHTML = "";
  for (let i = 0; i < inputArray.length; i++) {
    inputValueArray.push(inputArray[i].value);
  }
  inputValueArray.push(countOfYesAndNoValue);

  // ვამოწმებთ ინფუთების მნიშვნელობას თუ საჭიროა, ეკრანზე გამოგვაქვს ერორ ფანჯარა.

  for (let i = 0; i < inputValueArray.length; i++) {
    if (inputValueArray[i] == null || inputValueArray[i] == "") {
      erorWindow.style.display = "block";
      erorP.innerHTML += "Please specify your " + erorArray[i] + "<br>";
      erorCount++;
    }
  }
  for (let i = inputValueArray.length - 1; i >= 0; i--) {
    if (inputValueArray[i] == null || inputValueArray[i] == "") {
      invalidEmailP.innerHTML = null;
      invalidEmailP.innerHTML = "invalid " + erorArray[i];
    }
  }

  //იმ შმთხვევაში თუ ერორი არ გვაქვს ლოქალ სთორიდან ინფორმაციას ვიღებთ წინასწარ შექმნილი ობჯექთის საშუალებით
  // ვაგზავნიტ ინფორმაციას api-ს გამოყენებით.

  if (erorCount === 0) {
    for (let key in userInformationAndExperiance) {
      userInformationAndExperiance[key] = localStorage
        .getItem(key)
        .toLowerCase();
    }

    userInformationAndExperiance["already_participated"] = Boolean(
      userInformationAndExperiance["already_participated"]
    );
    userInformationAndExperiance["character_id"] = Number(
      userInformationAndExperiance["character_id"]
    );
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInformationAndExperiance),
    })
      .then((response) => {
        localStorage.clear();
        console.log(response);
        window.open("final.html", "_self");
      })

      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("Error:", error);
      });
  }
});
