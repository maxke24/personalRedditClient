"use strict";

async function getRedditPosts(reddits, amount = 10) {
	let url;
	let redditUrl = "";
	reddits.forEach((reddit) => {
		redditUrl += `+${reddit}`;
	});
	/* 	sort
		? (url = `https://www.reddit.com/r/${redditUrl}/${sort}.json?limit=${amount}`)
		: (); */
	url = `https://www.reddit.com/r/${redditUrl}.json?limit=${amount}`;
	if (after) {
		url += `&after=${after}`;
	}
	const response = await fetch(url);
	if (response.ok === false) {
		return undefined;
	}
	const rs = await response.json();
	after = rs.data.after;
	let i = Math.floor(amount / 2);
	loadNext = rs.data.children[i].data.name;
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
