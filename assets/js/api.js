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

const searchSubReddit = debounce(function(){
		let name = document.querySelector("input").value;
		if (name.length > 3) {
			console.log(name);
			let url = `https://www.reddit.com/api/search_reddit_names.json?query=${name}`;
			const response = await fetch(url);
			const rs = await response.json();
			console.log(rs);
			}
		}, 500);

function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let context = this,
			args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
