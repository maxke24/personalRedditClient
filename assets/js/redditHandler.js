let after = null;
let reddit = ["aww"];
let disableFetch = false;

async function SearchReddit(ev = null) {
	if (ev) {
		ev.preventDefault();
	}
	let newReddit = document.querySelector("#extraSubreddit").value;
	if (newReddit.length > 3) {
		reddit = [newReddit];
	}
	if (disableFetch) return;
	let subRedditContainer = document.querySelector("#redditPosts");
	after = null;
	const posts = await getRedditPosts(reddit);
	if (posts !== undefined) {
		subRedditContainer.innerHTML = "";
		createPosts(posts, subRedditContainer);
		document.querySelector("input").value = "";
		document.querySelector("#menu").classList.toggle("show");
	} else {
		document.querySelector("#menu #err").innerText = "Subreddit not found!";
		return;
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

function createPosts(posts, subRedditContainer) {
	for (let post of posts) {
		let imgUrl = post.data.url;
		let url = null;
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
				<img src="${url}" loading="lazy" alt="imgur images don't work atm">
				</figure>
				</article>`;

				subRedditContainer.innerHTML += postLayout;
			}
		}
	}
}

function addSubReddit(ev) {
	ev.preventDefault();
	let input = document.querySelector("#extraSubreddit").value;
	reddit.push(input);
	SearchReddit();
	document.querySelector("#addMultipleReddits").style.display = "hidden";
}
