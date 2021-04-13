"use strict";

async function getRedditPosts(subreddit, sort = undefined) {
	let url;
	sort
		? (url = `https://www.reddit.com/r/${subreddit}/${sort}.json`)
		: (url = `https://www.reddit.com/r/${subreddit}.json`);
	const response = await fetch(url);
	const rs = await response.json();
	return await rs.data.children;
}

async function getSubReddit(name) {
	let url = `https://www.reddit.com/api/search_reddit_names.json?query=${name}`;
	fetch(url).then((response) => {
		console.log(response);
	});
}
