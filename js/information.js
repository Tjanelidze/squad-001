const allInput = document.querySelectorAll(".all-input");
const erorP = document.querySelector(".eror-input-name");
const erorWindow = document.querySelector(".eror-window");
const backBtn = document.querySelector(".back-button");
const personalInformacionBox = document.querySelector(
  ".personal-informacion-box"
);
const doubleGreenSign = document.querySelector(".double-green-sign");
const invalidEmailP = document.querySelector(".invalid-email-p");
const xSign = document.querySelector(".x-sign");
let inputNames = ["Name", "email address", "Phone number", "Date of birth"];
let namesForObject = ["name", "email", "phone", "date_of_birth"];

const userInformationObj = {};
const nextButton = document.querySelector(".Next-button");
const dateInput = allInput[3];
let regexArray = [
  /^[a-zA-Z]+ [a-zA-Z]+$/, // fullNameTester
  /^[a-zA-Z0-9._%+-]+@redberry.ge$/, // emailTester
  /^[0-9]{9}$/, // phoneNumberTester
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19[0-9][0-9]|20[0-3][0-9])$/, // dateOfBirthTester
];

// x ნიშანი

xSign.addEventListener("click", function () {
  erorWindow.style.display = "none";
});

// წითელი ვარსკვლავი ddda yuti roa

allInput.forEach(function (element) {
  element.addEventListener("input", function () {
    if (element.value !== "") {
      element.parentElement.style.setProperty("--content", "*");
      personalInformacionBox.style.backgroundColor = "rgba(233, 250, 241, 1)";
    } else {
      element.parentElement.style.setProperty("--content", "");
    }
  });
});

// მწვანე ნიშანი და ინფუთის ბექგრაუნდ ფერი

allInput.forEach(function (element, index) {
  element.addEventListener("input", function () {
    if (regexArray[index].test(element.value)) {
      element.previousElementSibling.style.display = "inline";
      element.style.color = "#212529";
      element.style.backgroundColor = "#FFFFFF";
    } else {
      element.previousElementSibling.style.display = "none";
    }
  });
});

//ერორი

function erorOFInformation(element, text) {
  erorWindow.style.display = "inline";
  element.style.backgroundColor = "#FFEFEF";
  element.style.color = "#DC3545";
  erorP.innerHTML = erorP.innerHTML += "Please enter valid " + text + "<br>";
}

//ბოლო,თარიღის ინფუთი

dateInput.addEventListener("input", function () {
  if (dateInput.value.length == 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length == 5) {
    dateInput.value += "/";
  }
});

dateInput.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && dateInput.value.endsWith("/")) {
    dateInput.value = dateInput.value.slice(0, -1);
  }
});

//ნექსთ ღილაკი

nextButton.addEventListener("click", function (event) {
  event.preventDefault();
  erorP.innerHTML = null;
  for (let i = 0; i < allInput.length; i++) {
    if (regexArray[i].test(allInput[i].value)) {
      userInformationObj[namesForObject[i]] = allInput[i].value;
    } else {
      erorOFInformation(allInput[i], inputNames[i]);
    }
  }
  for (let i = allInput.length - 1; i >= 0; i--) {
    if (!regexArray[i].test(allInput[i].value)) {
      invalidEmailP.innerHTML = "invalid ";
      invalidEmailP.innerHTML += inputNames[i];
    }
  }

  if (Object.keys(userInformationObj).length == namesForObject.length) {
    for (let key in userInformationObj) {
      let index = namesForObject.indexOf(key);
      if (index >= 0) {
        localStorage.setItem(namesForObject[index], userInformationObj[key]);
        window.open("experiance.html", "_self");
      }
    }
    erorWindow.style.display = "none";
  }
});

//დარეფრეშების შემთხვევაში ვინარჩუნებთ მონაცემებს

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < inputNames.length; i++) {
    allInput[i].value = localStorage.getItem(namesForObject[i]);
    if (allInput[i].value !== "") {
      allInput[i].parentElement.style.setProperty("--content", "*");
    } else {
      allInput[i].parentElement.style.setProperty("--content", "");
    }
  }
});
