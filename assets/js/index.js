"use strict";
document.addEventListener("DOMContentLoaded", init);
let after = null;
let reddit = "all";
let disableFetch = false;

function init() {
	fillRedditPosts("aww");
	document.querySelector("form").addEventListener("submit", (ev) => {
		ev.preventDefault();
		reddit = document.querySelector("input").value;
		fillRedditPosts(reddit, "hot");
		document.querySelector("input").value = "";
	});

	document
		.querySelector("input")
		.addEventListener("input", $.debounce(500, getSubReddit));
}

async function fillRedditPosts(subreddit, sort) {
	if (disableFetch) return;
	let subRedditContainer = document.querySelector("#redditPosts");
	after = null;
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
	document.querySelector("input").value = "";
	document.querySelector("datalist").innerHTML = "";
	disableFetch = false;
}

async function loadExtraRedditPosts(subreddit, sort) {
	if (disableFetch) return;
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
	disableFetch = false;
}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts(reddit, "hot");
	}
};
