let after = null;
let scrollIndex;
let reddit = ["all"];
let disableFetch = false;

async function SearchReddit(ev = null) {
	disableFetch = true;
	if (ev) {
		ev.preventDefault();
		document.querySelector("#menu").classList.toggle("show");
		const overlay = document.querySelector("#overlay");
		overlay.classList.toggle("blackOverlay");
	}
	let newReddit = document.querySelector("#extraSubreddit").value;
	if (newReddit.length >= 3) {
		reddit = [newReddit];
	}
	loadReddits(10);
}

async function loadReddits(amount = 5) {
	const err = document.querySelector("#menu #err");
	err.innerText = "";
	const subRedditContainer = document.querySelector("#redditPosts");
	after = null;
	const posts = await getRedditPosts(reddit, amount);
	if (posts !== undefined) {
		subRedditContainer.innerHTML = "";
		createPosts(posts, subRedditContainer);
		document.querySelector("input").value = "";
	} else {
		err.innerText = "Subreddit not found!";
		disableFetch = false;
		return;
	}

	const redditList = document.querySelector("#subRedditList");
	const h1 = document.querySelector("h1");
	redditList.innerHTML = "";
	h1.innerHTML = "";
	reddit.forEach((r) => {
		redditList.innerHTML += `<p id="redditButtons">r/${r}\n</p>`;
		h1.innerHTML += `r/${r} `;
	});

	document.querySelectorAll("#redditButtons").forEach((button) => {
		button.addEventListener("click", removeFromSubredditList);
	});
}

function removeFromSubredditList(ev) {
	disableFetch = true;
	ev.preventDefault();
	const index = reddit.indexOf(ev.target.innerText.split("/")[1]);
	if (index >= 0) {
		reddit.splice(index, 1);
	}

	if (reddit.length === 0) {
		reddit.push("all");
	}

	loadReddits();
}

async function loadExtraRedditPosts() {
	if (disableFetch) return;
	disableFetch = true;
	const subRedditContainer = document.querySelector("#redditPosts");
	const posts = await getRedditPosts(reddit);
	createPosts(posts, subRedditContainer);
}

function createPosts(posts, subRedditContainer) {
	for (let post of posts) {
		const imgUrl = post.data.url;
		let url = null;
		if (post.data.is_video) {
			url = post.data.media.reddit_video.fallback_url;
			const postLayout = `<article id=${post.data.name}>
			<h1>${post.data.title}</h1>
			<figure>
			<video mute controls>
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
				const postLayout = `<article id=${post.data.name}>
				<h1>${post.data.title}</h1>
				<figure>
				<img src="${url}" loading="lazy" alt="imgur images don't work atm">
				</figure>
				</article>`;

				subRedditContainer.innerHTML += postLayout;
			}
		}
	}
	disableFetch = false;
}

function addSubReddit(ev) {
	ev.preventDefault();

	if (disableFetch) return;
	disableFetch = true;
	const input = document.querySelector("#extraSubreddit").value;
	const err = document.querySelector("#menu #err");
	err.innerText = "";
	if (reddit.indexOf(input) >= 0) {
		err.innerText = "Reddit already added!";
		disableFetch = false;
		return;
	}
	if (reddit.length === 1 && reddit[0] === "all") {
		reddit = [input];
	} else {
		reddit.push(input);
	}
	loadReddits();
}
