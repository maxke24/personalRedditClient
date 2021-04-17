"use strict";
$("nav").load("./nav.html", (e) => {
	document.querySelector("#overlay").addEventListener("click", (ev) => {
		ev.preventDefault();
		document.querySelector("#menu").classList.toggle("show");
		const overlay = document.querySelector("#overlay");
		overlay.classList.toggle("blackOverlay");
		let text;
		overlay.classList.contains("blackOverlay")
			? (text = "Click here to close the menu")
			: (text = "Click here to add a subreddit");
		document.querySelector("#overlay a").innerText = text;
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
};
