
// The job of Suggestions is to display suggestions
import React from 'react';
import Suggestion from "./Suggestion"

import { useState,useEffect } from 'react';
import {getHeaders} from './utils';

    export default function Suggestions({token}) {
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
              suggestions.map(suggestion => <Suggestion 
                key = {suggestion.id} 
                token={token} 
                suggestion={suggestion}/>)  
            }
            </div> 
    );
}
