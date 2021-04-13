"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
	fillRedditPosts("ProgrammerHumor", "hot");
	/* document.querySelector("form").addEventListener("submit", getSubReddit); */
	document.querySelector("input").addEventListener("input", searchSubReddit);
}

function getSubReddit(ev) {
	ev.preventDefault();
	let value = document.querySelector("input").value;
	document.querySelector("input").value = "";
	fillRedditPosts(value);
}

async function fillRedditPosts(subreddit, sort) {
	let subRedditContainer = document.querySelector("#redditPosts");
	subRedditContainer.innerHTML = "";
	const posts = await getRedditPosts(subreddit);
	for (let post of posts) {
		if (post.data.url.indexOf(".jpg") >= 0) {
			let postLayout = `<article>
			<h1>${post.data.title}</h1>
			<figure></figure><img src="${post.data.url}"></figure>
			</article>`;

			subRedditContainer.innerHTML += postLayout;
		}
	}
}
