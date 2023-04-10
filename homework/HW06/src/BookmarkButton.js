import React from 'react';
import {getHeaders} from './utils';


export default function BookmarkButton({post, token, requeryPost}) {

    // some logic at the top:
    const bmId = post.current_user_bookmark_id;
    const postId = post.id;

    async function bookmarkUnbookmark() {
        console.log(bmId, postId);
        // if it's bookmarked, unbookmark it, else bookmark it

        if (bmId) {
            console.log('unbookmark!')
            const response = await fetch(`/api/bookmarks/${bmId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();

        } else {
            // code to bookmark a post:
            console.log('bookmark!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/bookmarks/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        }
    }

    // return some JSX:
    return (
        <button onClick={bookmarkUnbookmark} > {bmId ? 'unbookmark' : 'bookmark'} </button>
    )

}