const beforeStart = document.querySelector("div#beforeStart");
const initial = document.querySelector("input.w.initial")
const increment = document.querySelector("input.w.increment")
const begin = document.querySelector("button#begin");
const error = document.querySelector("p#error");
const afterStart = document.querySelector("div#afterStart");
const wTimeLeft = document.querySelector("p.w.timeLeft");
const wGuide = document.querySelector("p.w.guide");
const bTimeLeft = document.querySelector("p.b.timeLeft");
const bGuide = document.querySelector("p.b.guide");
const afterEnd = document.querySelector("div#afterEnd");
const endMsg = document.querySelector("p.afterEnd.msg");

[initial, increment].forEach(input => input.addEventListener("change", () => input.value = Math.floor(input.value)));

begin.onclick = () => {
	if (initial.value < 1 || increment.value < 0) {
		error.innerHTML = "Enter valid amounts!";
		return;
	}
	beforeStart.className = "hidden";
	var wRemaining = initial.value * 60000;
	var wIncrTime = increment.value * 1000;
	var bRemaining = wRemaining;
	var bIncrTime = wIncrTime;
	var wEnd = Date.now() + wRemaining, bEnd = Date.now() + bRemaining, turn = 0;
	endGame = (loser, time) => {
		afterStart.className = "hidden";
		endMsg.childNodes.forEach((node, i) => node.innerText = [["White", "Black"][loser], endMsg.childNodes[1].innerText, time / 1000, endMsg.childNodes[3].innerText][i]);
		afterEnd.className = "visible";
	};
	tick = () => {
		let wClockTime = wEnd - Date.now();
		if (!(turn % 2)) {
			wTimeLeft.childNodes.forEach((node, i) => node.innerText = [Math.floor(wClockTime / 3600000), ":", Math.floor(wClockTime / 60000) - Math.floor(wClockTime / 3600000) * 60, ":", Math.floor(wClockTime / 1000) - Math.floor(wClockTime / 60000) * 60, ".", Math.floor(wClockTime / 10) - Math.floor(wClockTime / 1000) * 100][i].toString().padStart(2 - i % 2, "0"));
			bGuide.classList.replace("visible", "hidden");
			wGuide.classList.replace("hidden", "visible");
			bTimeLeft.parentNode.classList.replace("current", "other");
			wTimeLeft.parentNode.classList.replace("other", "current");
		}
		let bClockTime = bEnd - Date.now();
		if (turn % 2) {
			bTimeLeft.childNodes.forEach((node, i) => node.innerText = [Math.floor(bClockTime / 3600000), ":", Math.floor(bClockTime / 60000) - Math.floor(bClockTime / 3600000) * 60, ":", Math.floor(bClockTime / 1000) - Math.floor(bClockTime / 60000) * 60, ".", Math.floor(bClockTime / 10) - Math.floor(bClockTime / 1000) * 100][i].toString().padStart(2 - i % 2, "0"));
			wGuide.classList.replace("visible", "hidden");
			bGuide.classList.replace("hidden", "visible");
			wTimeLeft.parentNode.classList.replace("current", "other");
			bTimeLeft.parentNode.classList.replace("other", "current");
		}
		if (wClockTime <= 0 && !(turn % 2)) {
			endGame(0, bRemaining);
		} else if (bClockTime <= 0 && turn % 2) {
			endGame(1, wRemaining);
		} else requestAnimationFrame(tick);
	};
	afterStart.className = "visible";
	requestAnimationFrame(tick);
	document.body.addEventListener("keyup", (e) => {
		if (e.code === "Space") {
			if (turn % 2) {
				wEnd = Date.now() + wRemaining + wIncrTime;
				bRemaining = bEnd - Date.now();
			} else {
				bEnd = Date.now() + bRemaining + bIncrTime;
				if (turn === 0) bEnd -= bIncrTime;
				wRemaining = wEnd - Date.now();
			}
			turn++;
		}
	});
	document.body.focus();
};