"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts(reddit, "hot");
	}
};
