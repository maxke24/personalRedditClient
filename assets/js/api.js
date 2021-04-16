"use strict";

async function getRedditPosts(reddits, sort = undefined) {
	disableFetch = true;
	let url;
	let redditUrl = "";
	reddits.forEach((reddit) => {
		redditUrl += `+${reddit}`;
	});
	sort
		? (url = `https://www.reddit.com/r/${redditUrl}/${sort}.json?limit=10`)
		: (url = `https://www.reddit.com/r/${redditUrl}.json?limit=10`);
	if (after) {
		url += `&after=${after}`;
	}
	const response = await fetch(url);
	if (response.ok === false) {
		return undefined;
	}
	const rs = await response.json();
	after = rs.data.after;
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
