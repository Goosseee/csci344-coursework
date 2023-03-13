// Maximize: shift + ⌘ + [
// Minimize: shift + ⌘ + ]

/********************/
/* Global Variables */
/********************/
const rootURL = 'https://photo-app-secured.herokuapp.com';
let token; 

/******************/
/* Your Functions */
/******************/

const showStories = async () => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    const htmlChunk = data.map(storyToHtml).join('');
    document.querySelector('.stories').innerHTML = htmlChunk;
}

const storyToHtml = story =>{ 
    return `
    <div class = "story">
    <img src="${story.user.thumb_url}" id="jen">
    <p>${story.user.username}</p>
    </div>`;
}

const getProfile = async (token) => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers:{ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json(); 
    console.log("User Profile:", data);

    const user = data;
    profileToHtml(user);
}

function profileToHtml(user){ 
    document.querySelector("#profile").innerHTML = `        
    <h1>Photo App</h1>

    <section id="login">
        <p>${user.username}</p>
        <a>Sign out</a>
    </section>`
}

const showPosts = async () => {
    // 1. go out to the internet and grab our posts
    // 2. save the resulting data to a variable
    // 3. transform the data into an HTML represention
    // 4. display it:
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);

    const arrayOfHTML = data.map(postToHTML);
    const htmlString = arrayOfHTML.join('');
    document.querySelector('#posts').innerHTML = htmlString;
}

const postToHTML = post => {
    return`  
    <div class="post" id="${post.id}">
        <section class="header">
        <h1>${post.user.username}</h1>
        <i class="fa-solid fa-ellipsis"></i> 
        </section>

        <img src="${post.image_url}">

    <section class = intbar>
        <div class="icons">
            ${likeStatus(post)}
            <button class="fa-regular fa-comment"></button>
            <button class="fa-regular fa-paper-plane"></button> 
        </div>           
        ${bookmarkStatus(post)}
    </section>

    <section class="description">
        <strong>${post.likes.length} likes </strong>
        <p><strong>${post.user.username}</strong>
           ${post.caption}</p>
            <p id="timestamp">${post.display_time}</p>
    </section>
       ${showCommentAndButtonIfItMakesSense(post)}

    <section class="mycomment">
        <i class="fa-regular fa-face-smile"></i>
        <p>add comment...</p>
        <button id="postbutton" class="open">Post</button>
    </section>
    </div>
</div>
    `
}

//if status is something, then new html is the opposite 
// targetElementAndReplace("#bookmark", newHTML)
// targetElementAndReplace("#like", newHTML)

const bookmarkStatus = post =>{ 
    const bookmarked = `
    <button class="fa-solid fa-bookmark" id="like" 
    onclick = "deleteBookmark(${post.current_user_bookmark_id})">
    </button>` 

    const unmarked =`
    <button class="fa-regular fa-bookmark" id="like" 
    onclick = "createBookmark(${post.id})">
    </button>`

    if(post.current_user_bookmark_id != undefined){
        return bookmarked
    }else{ 
        return unmarked
    }
}

const likeStatus = post =>{ 
    const liked = `
    <button class="fa-solid fa-heart" id="bookmark" 
    onclick = "deleteLike(${post.current_user_like_id})">
    </button>` 

    const unliked =`
    <button class="fa-regular fa-heart" id="bookmark"
    onclick = "createLike(${post.id})">
    </button>`

    if(post.current_user_like_id != undefined){
        return liked
    }else{ 
        return unliked
    }
}

const createBookmark = async (post_id) => {
    // define the endpoint:
    const endpoint = `https://photo-app-secured.herokuapp.com/api/bookmarks/`;
    const postData = {
        "post_id": post_id // replace with the actual post ID
    };

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    showPosts(token);
}

const deleteBookmark = async (bookmark_id) => {
    // define the endpoint:
    const endpoint = `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmark_id}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    showPosts(token);
}

const createLike = async (post_id) => {
    // define the endpoint:
    const endpoint = `https://photo-app-secured.herokuapp.com/api/posts/likes`;
    const postData = {
        "post_id": post_id // replace with the actual post ID
    };

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    console.log(data);
    showPosts(token);
}

const deleteLike = async (like_id) => {
    // define the endpoint:
    const endpoint = `https://photo-app-secured.herokuapp.com/api/posts/likes/${like_id}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    showPosts(token);
}

showModal = () => {
    alert('Show Modal');
}

const showCommentAndButtonIfItMakesSense = post => {
    const hasComments = post.comments.length > 0;
    const lastCommentIndex = post.comments.length - 1;
    if (hasComments) {
        return `<div>
            <button onclick="showModal()">View all ${post.comments.length} comments</button>
            <p>${post.comments[lastCommentIndex].text}</p>
        </div>`;
    } else {
        return '';
    } 
}


const initPage = async () => {
    // set the token as a global variable 
    // (so that all of your other functions can access it):
    token = await getAccessToken(rootURL, 'webdev', 'password');
    console.log(token);
    
    // then use the access token provided to access data on the user's behalf
    showStories();
    showPosts();

    // query for the user's profile
    // query for suggestions
}

/********************/
/* Helper Functions */
/********************/

// helper function for logging into the website:
const getAccessToken = async (rootURL, username, password) => {
    const postData = {
        "username": username,
        "password": password
    };
    const endpoint = `${rootURL}/api/token/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data.access_token;
}

/**
 * Helper function to replace a DOM element.
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
 * 
 *  Arguments: 
 *     1. selector: the selector you want to target (string)
 *     2. newHTML:  the HTML you want to replace
 */
const targetElementAndReplace = (selector, newHTML) => { 
	const div = document.createElement('div'); 
	div.innerHTML = newHTML;
	const newEl = div.firstElementChild; 
    const oldEl = document.querySelector(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}


/******************************************/
/* Invoke initPage to kick everything off */
/******************************************/
initPage();
