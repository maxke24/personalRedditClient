"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
	registerServiceWorker();
}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts();
	}
};

function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/sw.js")
			.then((res) =>
				console.log(
					`successfully registered serviceWorker with scope ${res.scope}`
				)
			)
			.catch((err) => console.error("Error installing serviceWorker", err));
	}
}
