//  Job of Suggestion is to display a single suggestion
// + implement the method for follow/unfollow
import React from 'react';
import FollowButton from './FollowButton';
import { useState} from 'react';
import {getHeaders} from './utils';

    export default function Suggestion({suggestion, token}) {
        // console.log(token);
        
        const [actualSuggestion, setActualSuggestion] = useState(suggestion); 
        async function requerySuggestion() {
                const response = await fetch('/api/suggestions', {
                method: "GET",
                headers: getHeaders(token)
                }); 
                const data = await response.json();
                setActualSuggestion(data);
        }

        return (
            <div className="suggestion" >
                <img src={actualSuggestion.thumb_url} />

                <section className="text">
                    <strong>{actualSuggestion.username}</strong>
                    <p>suggested for you</p>
                </section>

              <FollowButton 
              token = {token} 
              user_id ={actualSuggestion.id}
              requerySuggestion = {requerySuggestion}/>
            </div>
        );
}

