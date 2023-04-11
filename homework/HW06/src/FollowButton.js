import React from 'react';
import {getHeaders} from "./utils";
import {useState} from "react";

export default function FollowButton({ user_id, token, requerySuggestion}){
    const followingId =0; 

    // async function checkFollowing(){ 
    //     const response = await fetch('/api/following',{
    //         method: "GET", 
    //         headers: getHeaders(token)
    //     });
    //     const data = await response.json(); 
    //     followingId = data.id;
    //     console.log("following: " + data);
    // }

    async function FollowUnfollow(){
    const storeId = user_id
    if (followingId){ 
        console.log("unfollow!")
        const response = await fetch (`/api/following/${followingId}`, {
            method: 'DELETE', 
            headers: getHeaders(token)
        });

        const data = await response.json(); 
        console.log(data); 
        requerySuggestion(); 
    }
    
    else { 
        const postData ={ 
            "user_id": storeId
        };

        console.log("followed!")
        const response = await fetch (`/api/following/`, {
            method: "POST", 
            headers: getHeaders(token),
            body: JSON.stringify(postData)
        });

        const data = await response.json(); 
        console.log(data); 
        requerySuggestion(); 
    }
}

return (
    <button onClick={FollowUnfollow} > {followingId ? "unfollow" : 'follow'} </button>
)


}