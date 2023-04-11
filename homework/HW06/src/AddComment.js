//  React code for posting comments
import React from 'react';
import { getHeaders } from './utils';

export default function AddComment({post, token, requeryPost}){

async function postComment(){
    const postData = {
        "post_id": post.id,
        "text": document.getElementById(post.id).value
        };
    
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/comments", {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify(postData)
        });

        const data = await response.json();
        console.log(data);
        requeryPost();
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
           
        // });
        // requeryPost();
    }
    
    return (
    <section className="mycomment" tabIndex="0">
        <i className="fa-regular fa-face-smile"></i>
        <input type="text" id={post.id} placeholder="Add a comment..."/>
        <button id="postbutton" className="open" onClick={postComment}>Post</button>
    </section>
    )
    
}