
// The job of Suggestions is to display suggestions
import React from 'react';

import { useState,useEffect } from 'react';
import {getHeaders} from './utils';

    export default function Suggestions({token}) {
        // console.log(token);
        const [suggestions, setSuggestions] = useState([]); 
    
        useEffect(() => {
            async function fetchSuggestions() {
                const response = await fetch('/api/suggestions', {
                    headers: getHeaders(token)
                }); 
                const data = await response.json();
                setSuggestions(data);
                console.log(data);
            }
            fetchSuggestions();
        }, [token]);


    // return some JSX
    return (
        <div className ="suggestions">
            {
            suggestions.map(suggestion =>{
                return(
                    <div key={suggestion.id} className="suggestion">
                    <img src={suggestion.thumb_url}/>
            
                    <section className="text">
                    <strong>{suggestion.username}</strong>
                    <p>suggested for you</p>
                    </section>
                        
                    <button id="followbutton">follow</button>
                    </div>
                )
            }) 
       

            }
            </div> 
    );
}