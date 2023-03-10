let buttons = document.querySelectorAll(".button");
let equation = document.querySelector(".equation");
let result = document.querySelector(".displayResult");

equation.textContent = "0";

buttons.forEach((btn) => {
	btn.addEventListener("click", () => updateEquation(btn));
});

let updateEquation = (btn) => {
	let input = btn.getAttribute("data-input");

	if (input == "clear") {
		equation.textContent = "0";
	} else if (input == "delete") {
		if (
			equation.textContent.at(-1) == "+" ||
			equation.textContent.at(-1) == "-" ||
			equation.textContent.at(-1) == "*" ||
			equation.textContent.at(-1) == "/"
		) {
			equation.textContent = equation.textContent.substring(
				0,
				equation.textContent.length - 2
			);
		} else {
			equation.textContent = equation.textContent.substring(
				0,
				equation.textContent.length - 1
			);
		}

		if (equation.textContent == "") {
			equation.textContent = "0";
		}
	} else if (input == "=") {
		solveEquation();
		return;
	} else if (equation.textContent == "0") {
		equation.textContent = input;
	} else if (
		input == "+" ||
		input == "-" ||
		input == "*" ||
		input == "/" ||
		equation.textContent.at(-1) == "+" ||
		equation.textContent.at(-1) == "-" ||
		equation.textContent.at(-1) == "*" ||
		equation.textContent.at(-1) == "/"
	) {
		equation.textContent += ` ${input}`;
	} else if (input == ".") {
		let numbers = equation.textContent.split(" ");
		console.log(numbers);
		if (!numbers.at(-1).includes(".")) {
			equation.textContent += `${input}`;
		}
	} else {
		equation.textContent += `${input}`;
	}

	result.textContent = "";
};

let solveEquation = () => {
	try {
		const answer = math.evaluate(equation.textContent);
		answer == "Infinity" ? (answer = "ERROR / 0") : answer;
		result.textContent = answer;
	} catch (err) {
		result.textContent = "ERROR";
	}
};
