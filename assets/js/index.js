"use strict";
document.addEventListener("DOMContentLoaded", init);
let after = null;
let reddit = "aww";
let disableFetch = false;

function init() {
	fillRedditPosts(reddit);
	document.querySelector("form").addEventListener("submit", (ev) => {
		ev.preventDefault();
		let subReddit = document.querySelector("input").value;
		fillRedditPosts(subReddit, "hot");
		document.querySelector("input").value = "";
	});

	document
		.querySelector("input")
		.addEventListener("input", $.debounce(1000, getSubReddit));
}

async function fillRedditPosts(subreddit, sort) {
	if (disableFetch) return;
	let subRedditContainer = document.querySelector("#redditPosts");
	after = null;
	const posts = await getRedditPosts(subreddit);
	if (posts !== undefined) {
		subRedditContainer.innerHTML = "";
		createPosts(posts, subRedditContainer);
		document.querySelector("input").value = "";
		document.querySelector("datalist").innerHTML = "";
	}
	disableFetch = false;
}

async function loadExtraRedditPosts(subreddit, sort) {
	if (disableFetch) return;
	let subRedditContainer = document.querySelector("#redditPosts");
	const posts = await getRedditPosts(subreddit);
	createPosts(posts, subRedditContainer);
	disableFetch = false;
}

window.onscroll = function (ev) {
	if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
		loadExtraRedditPosts(reddit, "hot");
	}
};

function createPosts(posts, subRedditContainer) {
	for (let post of posts) {
		let imgUrl = post.data.url;
		let url = null;
		console.log(post);
		if (post.data.is_video) {
			url = post.data.media.reddit_video.fallback_url;
			let postLayout = `<article>
			<h1>${post.data.title}</h1>
			<figure>
			<video autoplay loop controls>
			<source src="${url}" type=video/mp4>
			</video>
			</figure>
			</article>`;

			subRedditContainer.innerHTML += postLayout;
		} else {
			if (post.data.preview) {
				url = post.data.preview.images[0].source.url;
			}
			if (imgUrl.indexOf(".jpg") >= 0) {
				url = imgUrl;
			}
			if (url) {
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
}
