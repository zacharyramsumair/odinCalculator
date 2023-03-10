let buttons = document.querySelectorAll(".button");
let equation = document.querySelector(".equation");
let result = document.querySelector(".displayResult");

buttons.forEach((btn) => {
	btn.addEventListener("click", () => getData(btn));
});

let getData = (btn) => {
	// console.log(btn);
	console.log(`${btn.textContent}`);
};
