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
let array = [];
const userInformation = {
  Name: "",
  "email address": "",
  "Phone number": "",
  "Date of birth": "",
};
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

// ერორის ფანჯარა

function erorwindow01() {
  erorP.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    invalidEmailP.innerHTML = "Invalid " + array[0];
    erorP.innerHTML += "Please enter valid " + array[i] + "<br>";
  }
  if (array.length == 0) {
    erorWindow.style.display = "none";
  } else {
    erorWindow.style.display = "inline";
  }
}
//  ერორების არაიდან ვიგებ იმ წევრებს რომლებმაც გაიარეს რეგეხი

allInput.forEach(function (element, index) {
  element.addEventListener("input", function () {
    if (regexArray[index].test(element.value)) {
      array.splice(array.indexOf(inputNames[index]), 1);
    }
    erorwindow01();
  });
});

// ვქმნი ობჯექთს მომხმარებლის მონაცემების შესანახად

allInput.forEach(function (element, index) {
  element.addEventListener("input", function () {
    if (regexArray[index].test(element.value)) {
      userInformation[inputNames[index]] = element.value;
    } else {
      userInformation[inputNames[index]] = "";
    }
    if (element.value == "") {
      userInformation[inputNames[index]] = "";
    }
  });
});

//ნექსთ ღილაკი

nextButton.addEventListener("click", function (event) {
  event.preventDefault();

  let count = 0;
  for (let element in userInformation) {
    if (userInformation[element] == "") {
      if (array.indexOf(element) == -1) {
        array.push(element);
        allInput[inputNames.indexOf(element)].style.backgroundColor = "#FFEFEF";
        allInput[inputNames.indexOf(element)].style.color = "#DC3545";
      }
      erorwindow01();
    } else {
      count++;
    }
  }
  if (count === 4) {
    localStorage.setItem("userInformation", JSON.stringify(userInformation));
    doubleGreenSign.style.display = "block";
  }
});

// **********************************************************

allInput[3].addEventListener("input", function () {
  if (allInput[3].value.length == 2) {
    allInput[3].value += "/";
  }
  if (allInput[3].value.length == 5) {
    allInput[3].value += "/";
  }
  let day = parseInt(allInput[3].value.slice(0, 2));
  let month = parseInt(allInput[3].value.slice(3, 5));
  let year = parseInt(allInput[3].value.slice(6, 10));
  if (day < 1 || day > 31) {
    allInput[3].value = allInput[3].value.slice(0, 3);
  }
  if (month < 1 || month > 12) {
    allInput[3].value = allInput[3].value.slice(0, 6);
  }

  if (year < 1900 || year > 2023) {
    allInput[3].value = allInput[3].value.slice(0, 9);
  }
});
allInput[3].addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && allInput[3].value.endsWith("/")) {
    allInput[3].value = allInput[3].value.slice(0, -1);
  }
});
