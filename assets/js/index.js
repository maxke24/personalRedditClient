"use strict";
document.addEventListener("DOMContentLoaded", init);
let after = null;
let reddit = "aww";
let disableFetch = false;

function init() {
	fillRedditPosts(reddit);
}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts(reddit, "hot");
	}
};
