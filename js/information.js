const allInput = document.querySelectorAll(".all-input");
const erorP = document.querySelector(".eror-input-name");
const erorWindow = document.querySelector(".eror-window");
const personalInformacionBox = document.querySelector(
  ".personal-informacion-box"
);
const doubleGreenSign = document.querySelector(".double-green-sign");
const invalidEmailP = document.querySelector(".invalid-email-p");
const xSign = document.querySelector(".x-sign");
let inputNames = ["Name", "email address", "Phone number", "Date of birth"];
const userInformationObj = {};
const nextButton = document.querySelector(".Next-button");
let regexArray = [
  /^[a-zA-Z]+ [a-zA-Z]+$/, // fullNameTester
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // emailTester
  /^((\+995)|(0{2}995)|0)5\d{8}$/, // phoneNumberTester
  /^\d{1,2}\/\d{1,2}\/\d{4}$/, // dateOfBirthTester
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
//ნექსთ ღილაკი

nextButton.addEventListener("click", function (event) {
  event.preventDefault();
  erorP.innerHTML = null;
  for (let i = 0; i < allInput.length; i++) {
    if (regexArray[i].test(allInput[i].value)) {
      userInformationObj[inputNames[i]] = allInput[i].value;
    } else {
      erorOFInformation(allInput[i], inputNames[i]);
    }
  }
  if (Object.keys(userInformationObj).length == inputNames.length) {
    for (let key in userInformationObj) {
      let index = inputNames.indexOf(key);
      if (index >= 0) {
        localStorage.setItem(inputNames[index], userInformationObj[key]);
      }
    }
  }
});

//დარეფრეშების შემთხვევაში ვინარჩუნებთ მონაცემებს

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < inputNames.length; i++) {
    allInput[i].value = localStorage.getItem(inputNames[i]);
    if (allInput[i].value !== "") {
      allInput[i].parentElement.style.setProperty("--content", "*");
    } else {
      allInput[i].parentElement.style.setProperty("--content", "");
    }
  }
});

//ბოლო,თარიღის ინფუთი

allInput[3].addEventListener("input", function () {
  if (allInput[3].value.length == 2) {
    allInput[3].value += "/";
  }
  if (allInput[3].value.length == 5) {
    allInput[3].value += "/";
  }

  // let day = parseInt(allInput[3].value.slice(0, 2));
  // let month = parseInt(allInput[3].value.slice(3, 5));
  // let year = parseInt(allInput[3].value.slice(6, 10));
  // if (day < 1 || day > 31) {
  //   allInput[3].value = allInput[3].value.slice(0, 3);
  // }
  // if (month < 1 || month > 12) {
  //   allInput[3].value = allInput[3].value.slice(0, 6);
  // }

  // if (year < 1900 || year > 2023) {
  //   allInput[3].value = allInput[3].value.slice(0, 10);
  // }
});

allInput[3].addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && allInput[3].value.endsWith("/")) {
    allInput[3].value = allInput[3].value.slice(0, -1);
  }
});
