"use strict";
document.addEventListener("DOMContentLoaded", init);
let after = null;
let reddit = "all";

function init() {
	fillRedditPosts("aww");
	document.querySelector("form").addEventListener("submit", (ev) => {
		ev.preventDefault();
		reddit = document.querySelector("input").value;
		fillRedditPosts(reddit, "hot");
		document.querySelector("input").value = "";
	});
}

async function fillRedditPosts(subreddit, sort) {
	let subRedditContainer = document.querySelector("#redditPosts");
	subRedditContainer.innerHTML = "";
	const posts = await getRedditPosts(subreddit);
	for (let post of posts) {
		if (post.data.url.indexOf(".jpg") >= 0) {
			let url = post.data.preview.images[0].source.url;
			let postLayout = `<article>
			<h1>${post.data.title}</h1>
			<figure>
			<img src="${url}" alt="imgur images don't work atm">
			</figure>
			</article>`;

			subRedditContainer.innerHTML += postLayout;
		}
	}
}

async function loadExtraRedditPosts(subreddit, sort) {
	let subRedditContainer = document.querySelector("#redditPosts");
	const posts = await getRedditPosts(subreddit);
	for (let post of posts) {
		if (post.data.url.indexOf(".jpg") >= 0) {
			let url = post.data.preview.images[0].source.url;
			let postLayout = `<article>
			<h1>${post.data.title}</h1>
			<figure>
			<img src="${url}" alt="imgur images don't work atm">
			</figure>
			</article>`;

			subRedditContainer.innerHTML += postLayout;
		}
	}
}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts(reddit, "hot");
	}
};
