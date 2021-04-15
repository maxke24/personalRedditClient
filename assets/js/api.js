"use strict";

async function getRedditPosts(subreddit, sort = undefined) {
	disableFetch = true;
	let url;
	let subreddits = "";
	console.log(subreddit);
	subreddit.forEach((reddit) => {
		subreddits += `+reddit`;
	});

	sort
		? (url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=10`)
		: (url = `https://www.reddit.com/r/${subreddit}.json?limit=10`);
	if (after) {
		url += `&after=${after}`;
	}
	const response = await fetch(url);
	if (response.ok === false) {
		getRedditPosts(reddit);
		return;
	}
	const rs = await response.json();
	after = rs.data.after;
	reddit = [subreddit];
	document.querySelector("h1").innerHTML = `r/${reddit}`;
	return await rs.data.children;
}

async function getSubReddit(ev) {
	ev.preventDefault();
	const input = document.querySelector("input");
	const subReddits = document.querySelector("datalist");
	const name = input.value;
	if (name.length >= 3) {
		const url = `https://www.reddit.com/api/search_reddit_names.json?query=${name}`;

		const response = await fetch(url);
		const rs = await response.json();
		rs.names.forEach((element) => {
			subReddits.innerHTML += `<option value="${element}">${element}</option>`;
		});
	}
}
