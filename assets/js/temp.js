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

	if (scroll) return;
	const middleElement = document.querySelector(`#${loadNext}`);
	if (window.scrollY > middleElement.offsetTop + middleElement.offsetHeight) {
		loadExtraRedditPosts();
	}
};
