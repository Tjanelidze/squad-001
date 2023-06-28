const star = document.querySelector(".star");
const textBox = document.querySelector(".textBox");
const inputYes = document.querySelector(".input-yes");
const inputNo = document.querySelector(".input-no");
let levelOfknowledge = "";
function show(anything) {
  textBox.value = anything;
}

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
  levelOfknowledge = textBox.value;
  localStorage.setItem("levelOfknowledge", levelOfknowledge);
};

let countOfYesAndNo = "";

inputYes.addEventListener("input", function () {
  countOfYesAndNo = inputYes.value;
  localStorage.setItem("countOfYesAndNo", countOfYesAndNo);
});
inputNo.addEventListener("input", function () {
  countOfYesAndNo = inputNo.value;
  localStorage.setItem("countOfYesAndNo", countOfYesAndNo);
});

document.addEventListener("DOMContentLoaded", function () {
  const levelOfknowledgeValue = localStorage.getItem("levelOfknowledge");
  textBox.value = levelOfknowledgeValue;
  //წითელი ვარსკვლავი ექსფერიენს ინფუთისტვის

  if (textBox.value !== "") {
    star.style.display = "none";
  } else {
    star.style.display = "inline";
  }
  const countOfYesAndNoValue = localStorage.getItem("countOfYesAndNo");
  if (countOfYesAndNoValue == "yes") {
    inputYes.checked = true;
  } else if (countOfYesAndNoValue == "no") {
    inputNo.checked = true;
  }
});
window.addEventListener("onbeforeunload", function () {
  localStorage.removeItem(key);
  return "";
});
