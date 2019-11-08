import { create } from "domain";

const render = element => {
    const createdElement = document.createElement("H2");
    createdElement.innerHTML ="Butter Records";
    element.append(createdElement);

    const albumsButton= document.createElement("button");
    albumsButton.innerHTML ="Albums";
    element.append(albumsButton);

    const artistsButton = document.createElement("button");
    artistsButton.innerHTML ="Artists";
    element.append(artistsButton);
    
    const songsButton = document.createElement("button");
    songsButton.innerHTML ="Songs";
    element.append(songsButton);

    const textSpace = document.createElement("p");
    textSpace.innerHTML ="Plz cleck teh boton";
    element.append(textSpace);


    document.getElementsByTagName("button")[0].onclick = () => {
        renderAlbums();
    };

    document.getElementsByTagName("button")[1].onclick = () => {
        renderArtists();
    };
    
    document.getElementsByTagName("button")[2].onclick = () => {
        renderSongs();
    };

    function renderAlbums() {
        document.getElementsByTagName("p")[0].innerHTML = "Here are some albums:";
        fetch("http://localhost:8080/api/albums", {
            method: "GET",
            headers: {
              "Content-Type": "text/plain",
            },
            // My spider sense tells me I did this one wrong:
            body: JSON.stringify({
                Name: title,
                Date: publishyear,
            })
          })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    function renderArtists() {
        document.getElementsByTagName("p")[0].innerHTML = "Here are some artists:";
    }

    function renderSongs() {
        document.getElementsByTagName("p")[0].innerHTML = "Here are some songs:";
    }

    
}
    

render(document.querySelector('#app'));