"use strict";

const DARKMODE = [
	"#202020ff",
	"#3F3F3Fff",
	"#ffffffff",
	"#ffffffff",
	"#707070ff",
];
const LIGHTMODE = [
	"#89ABE3FF",
	"#FCF6F5FF",
	"#20202080",
	"#20202080",
	"#20202080",
];

function openNav() {
	document.querySelector("nav").classList.add("open");
	document.querySelector("nav").classList.remove("close");
}

function closeNav() {
	document.querySelector("nav").classList.remove("open");
	document.querySelector("nav").classList.add("close");
}

function loadColors() {
	let colorNav = document.querySelector("#colorChangeButtons");
	colorNav.innerHTML += `<a href="#" data-value="${0}">Original</a>`;
	for (let i = 1; i < OPTIONS.length; i++) {
		colorNav.innerHTML += `<a href="#" data-value="${i}">option ${i}</a>`;
	}
}

function darkMode() {
	setStyling(DARKMODE);
}

function lightMode() {
	setStyling(LIGHTMODE);
}

function selectStyling(e) {
	e.preventDefault();
	const id = e.target.getAttribute("data-value");
	setStyling(OPTIONS[id]);
	if (window.innerWidth < 1050) {
		closeNav();
	}
}

function setStyling(theme) {
	document.documentElement.style.setProperty("--primary", theme[0]);
	document.documentElement.style.setProperty("--secondary", theme[1]);
	document.documentElement.style.setProperty("--title", theme[2]);
	document.documentElement.style.setProperty("--subtext", theme[3]);
	document.documentElement.style.setProperty("--text", theme[4]);
	localforage.setItem("theme", theme);
}

$("nav").load("nav.html", () => {
	document.querySelector("#openMenu").addEventListener("click", openNav);
	document.querySelector(".closebtn").addEventListener("click", closeNav);
	document.querySelector("#addReddits").addEventListener("click", (ev) => {
		ev.preventDefault();
		let element = document.querySelector("#addMultipleReddits");
		element.style.display = "flex";
	});

	document
		.querySelector("#addMultipleReddits")
		.addEventListener("submit", addMultipleReddits);
});
