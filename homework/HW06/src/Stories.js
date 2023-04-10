
// The job of Suggestions is to display suggestions


import React from 'react';

import { useState,useEffect } from 'react';
import {getHeaders} from './utils';

export default function Stories({token}) {
//  logic here

        // console.log(token);
        const [stories, setStories] = useState([]); 
    
        useEffect(() => {
            async function fetchStories() {
                const response = await fetch('/api/stories', {
                    headers: getHeaders(token)
                }); 
                const data = await response.json();
                setStories(data);
                console.log(data);
            }
            fetchStories();
        }, [token]);

//        return some JSX
    return (
        <header className="stories">
            {
                stories.map(story => {
                    return(
                        <section key={story.id}>
                            <img src ={story.user.thumb_url}/>
                        </section>
                    )
                })
            }
        </header>
    )
}