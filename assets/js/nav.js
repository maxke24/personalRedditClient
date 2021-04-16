"use strict";
$("nav").load("nav.html", (e) => {
	document
		.querySelector("#addMultipleReddits")
		.addEventListener("click", (ev) => {
			ev.preventDefault();
			document.querySelector("#menu").classList.toggle("show");
		});
	document.querySelector("#addReddit").addEventListener("click", addSubReddit);
	document
		.querySelector("#searchReddit")
		.addEventListener("click", SearchReddit);
	loadReddits();
});

window.onscroll = function (e) {
	const menu = document.querySelector("#menu");
	if (menu.classList.contains("show"))
		document.querySelector("#menu").classList.toggle("show");

	const middleElement = document.querySelector(`#${loadNext}`);

	if (isScrolledIntoView(middleElement)) {
		loadExtraRedditPosts();
	}
};

function isScrolledIntoView(el) {
	let rect = el.getBoundingClientRect();
	let elemTop = rect.top;
	let elemBottom = rect.bottom;

	// Only completely visible elements return true:
	let isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
	// Partially visible elements return true:
	//isVisible = elemTop < window.innerHeight && elemBottom >= 0;
	return isVisible;
}
