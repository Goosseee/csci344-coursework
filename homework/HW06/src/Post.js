// Job of this component is to display a post
// and to allow users to interact with the post

import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Post({post, token}) {
    let lastComment = post.comments.length -1; 
    let hasComment = lastComment > 0; 

    const [actualPost, setActualPost] = useState(post);

    async function requeryPost() {
        // get a fresh copy of the post
            const response = await fetch(`/api/posts/${post.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        lastComment = post.comments.length -1; 
        hasComment = lastComment > 0;
        const data = await response.json();
        console.log(data);

        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
  
        setActualPost(data);
    }
   


    // JSX representation of a Post
    return (
        <div className="post" key={post.id}>
            <h1>{actualPost.user.username}</h1>
            <img src={actualPost.image_url} alt={post.caption} />
            <div>{actualPost.caption}</div>
            
            <section className="intbar">
                <LikeButton 
                    post={actualPost} 
                    token={token} 
                    requeryPost={requeryPost} />

                < BookmarkButton 
                    post={actualPost} 
                    token={token} 
                    requeryPost={requeryPost} />
            </section>

            {hasComment? 
            <section className = "comment">
                        <p tabIndex="0">
                            <strong>{post.comments[lastComment].user.username} </strong>{post.comments[lastComment].text}
                        </p>
            </section>: ""}
            <AddComment
            post={actualPost}
            token ={token}
            requeryPost ={requeryPost}
            />
        </div> 
    )  
}