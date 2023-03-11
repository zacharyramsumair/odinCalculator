let buttons = document.querySelectorAll(".button");
let equation = document.querySelector(".equation");
let result = document.querySelector(".displayResult");

equation.textContent = "0";
let displayExpression = "0";

buttons.forEach((btn) => {
	btn.addEventListener("click", () => updateEquation(btn));
});

let findBtn = (e) => {
	console.log(e.keyCode);
	let index = 0;

	//go through each btn and check which one has the keyCode attribute equal to the keycode pressed
	for (let btn of buttons) {
		if (
			btn.getAttribute("data-keycode") == e.keyCode ||
			btn.getAttribute("data-keycode2") == e.keyCode
		) {
			// find the index of that btn

			index = Array.from(buttons).indexOf(btn);
		}
	}
	// send buttons[index of that button] as the parameter to update equation

	updateEquation(buttons[index]);
};

document.onkeydown = findBtn;

let updateEquation = (btn) => {
	let input = btn.getAttribute("data-input");

	if (input == "clear") {
		displayExpression = "0";
	} else if (input == "delete") {
		if (
			displayExpression.at(-1) == "+" ||
			displayExpression.at(-1) == "-" ||
			displayExpression.at(-1) == "*" ||
			displayExpression.at(-1) == "/"
		) {
			displayExpression = displayExpression.substring(
				0,
				displayExpression.length - 2
			);
		} else {
			displayExpression = displayExpression.substring(
				0,
				displayExpression.length - 1
			);
		}

		if (displayExpression == "") {
			displayExpression = "0";
		}
	} else if (input == "=") {
		solveEquation();
		return;
	} else if (displayExpression == "0") {
		displayExpression = input;
	} else if (
		input == "+" ||
		input == "-" ||
		input == "*" ||
		input == "/" ||
		displayExpression.at(-1) == "+" ||
		displayExpression.at(-1) == "-" ||
		displayExpression.at(-1) == "*" ||
		displayExpression.at(-1) == "/"
	) {
		displayExpression += ` ${input}`;
	} else if (input == ".") {
		let numbers = displayExpression.split(" ");
		console.log(numbers);
		if (!numbers.at(-1).includes(".")) {
			displayExpression += `${input}`;
		}
	} else {
		displayExpression += `${input}`;
	}

	console.log(displayExpression);
	equation.textContent = displayExpression
		.replace(/\s*\*+\s*/g, " × ")
		.replace(/\s*\/+\s*/g, " ÷ ");

	result.textContent = "";
};

let solveEquation = () => {
	try {
		const answer = math.evaluate(displayExpression);
		answer == "Infinity" ? (answer = "ERROR / 0") : answer;
		result.textContent = answer;
	} catch (err) {
		result.textContent = "ERROR";
	}
};
