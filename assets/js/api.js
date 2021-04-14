"use strict";

async function getRedditPosts(subreddit, sort = undefined) {
	disableFetch = true;
	let url;
	sort
		? (url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=10`)
		: (url = `https://www.reddit.com/r/${subreddit}.json?limit=10`);
	if (after) {
		url += `&after=${after}`;
	}
	const response = await fetch(url);
	const rs = await response.json();
	after = rs.data.after;
	return await rs.data.children;
}

async function getSubReddit(ev) {
	ev.preventDefault();
	const input = document.querySelector("input");
	const subReddits = document.querySelector("datalist");
	const name = input.value;
	const url = `https://www.reddit.com/api/search_reddit_names.json?query=${name}`;
	const response = await fetch(url);
	const rs = await response.json();
	rs.names.forEach((element) => {
		subReddits.innerHTML += `<option value="${element}">${element}</option>`;
	});

	/* 	const redditList = document.querySelector("datalist").forEach((option) => {
		option.addEventListener("input", (ev) => {
			ev.preventDefault();
			console.log(ev);
			fillRedditPosts();
		});
	}); */

	document.querySelector("input").addEventListener("input", (ev) => {
		ev.preventDefault();
		console.log(ev);
		fillRedditPosts(ev.target.value);
	});
}
