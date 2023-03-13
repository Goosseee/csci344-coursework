/**
 * Your logic here (do it however you want).
 * 
 * The things you have to have:
 *    1. A function (i.e., "Event Handler") to initiate the search.
 *    2. Logic to take the user inputs to build the search query.
 *    3. Logic to send the search query to the relevant server.
 *    4. Logic to display the results to the screen.
 * 
 * Provider-specific instructions:
 *    1. If you choose Yelp, allow your user to input both a search term
 *       and a location.
 *    2. If you choose Spotify, allow your user to specify both a search term 
 *       and a resource type (album, artist, or track).
 *    3. If you choose Twitter, allow your user to specify both a search term
 *       and a result_type (mixed, recent, or popular).
 */
const rootURL = 'https://www.apitutor.org/spotify/v1/search';

const showSpotify = async() => {

    //Gathers query + type
    var query = document.getElementById("search_term").value;
    var type = document.getElementById("resource_type").value;

    //sends and receives server request

    const endPoint = `${rootURL}?q=${query}&type=${type}`;
    const response = await fetch(endPoint);
    const jsonData = await response.json();
    console.log(jsonData);

    if (type == "track"){
        console.log("fetching track data!");
        const htmlOutput = jsonData.map(trackToHtml).join('');
        document.querySelector("#results").innerhtml = htmlOutput;
    }else if (type == "artist"){
        console.log("fetching artist data!");
        const htmlOutput = jsonData.map(artistToHtml).join('');
        document.querySelector("#results").innerhtml = htmlOutput;
    }else{
        console.log("fetching album data!");
        const htmlOutput = jsonData.map(albumToHtml).join('');
        document.querySelector("#results").innerhtml = htmlOutput;
    }
}

const trackToHtml = track =>{
    return `
        <section class='track'>
        <h2>${track.name}</h2>
        <p>${track.preview.url}</p>
        </section>
    `
}

const artistToHtml = artist =>{
    return `
        <section class='artist'>
        <h2>${artist.name}</h2>
        <p>${artist.preview.url}</p>
        </section>
    `
}

const albumToHtml = album =>{
    return `
        <section class='album'>
        <h2>${album.name}</h2>
        <p>${album.preview.url}</p>
        </section>
    `
}