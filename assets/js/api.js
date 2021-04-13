"use strict";

async function getRedditPosts(subreddit, sort = undefined) {
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
	let input = document.querySelector("input");
	const name = input.value;
	input.value = "";
	const url = `https://www.reddit.com/api/search_reddit_names.json?query=${name}`;
	const response = await fetch(url);
	const rs = await response.json();
	console.log(rs);
}
