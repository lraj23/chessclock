const beforeStart = document.getElementById("beforeStart");
const initial = document.getElementById("initial")
const increment = document.getElementById("increment")
const begin = document.getElementById("begin");
const error = document.getElementById("error");
const afterStart = document.getElementById("afterStart");
const wTimeLeft = document.querySelector("p.w.timeLeft");
const wGuide = document.getElementById("wGuide");
const bTimeLeft = document.querySelector("p.b.timeLeft");
const bGuide = document.getElementById("bGuide");
const afterEnd = document.getElementById("afterEnd");
const endMsg = document.getElementById("msg");

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
		msg.childNodes.forEach((node, i) => node.innerText = [["White", "Black"][loser], msg.childNodes[1].innerText, time / 1000, msg.childNodes[3].innerText][i]);
		afterEnd.className = "visible";
	};
	tick = () => {
		let wClockTime = wEnd - Date.now();
		if (!(turn % 2)) {
			wTimeLeft.childNodes.forEach((node, i) => node.innerText = [Math.floor(wClockTime / 3600000), ":", Math.floor(wClockTime / 60000) - Math.floor(wClockTime / 3600000) * 60, ":", Math.floor(wClockTime / 1000) - Math.floor(wClockTime / 60000) * 60, ".", Math.floor(wClockTime / 10) - Math.floor(wClockTime / 1000) * 100][i].toString().padStart(2 - i % 2, "0"));
			bGuide.className="hidden";
			wGuide.className="visible";
			bTimeLeft.parentNode.classList.replace("current", "other");
			wTimeLeft.parentNode.classList.replace("other", "current");
		}
		let bClockTime = bEnd - Date.now();
		if (turn % 2) {
			bTimeLeft.childNodes.forEach((node, i) => node.innerText = [Math.floor(bClockTime / 3600000), ":", Math.floor(bClockTime / 60000) - Math.floor(bClockTime / 3600000) * 60, ":", Math.floor(bClockTime / 1000) - Math.floor(bClockTime / 60000) * 60, ".", Math.floor(bClockTime / 10) - Math.floor(bClockTime / 1000) * 100][i].toString().padStart(2 - i % 2, "0"));
			wGuide.className="hidden";
			bGuide.className="visible";
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