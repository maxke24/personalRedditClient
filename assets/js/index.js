"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
	fillRedditPosts("ProgrammerHumor", "hot");
}

async function fillRedditPosts(subreddit, sort) {
	let subRedditContainer = document.querySelector("#redditPosts");
	const posts = await getRedditPosts(subreddit);
	for (let post of posts) {
		if (post.data.url.indexOf(".jpg") >= 0) {
			let postLayout = `<article>
			<h1>${post.data.title}</h1>
			<img src="${post.data.url}">
			</article>`;

			subRedditContainer.innerHTML += postLayout;
		}
	}
}
