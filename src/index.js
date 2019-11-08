import { create } from "domain";

const render = element => {
    const createdElement = document.createElement("marquee");
    createdElement.innerHTML ="Butter Records";
    element.append(createdElement);

    const albumsButton= document.createElement("button");
    albumsButton.innerHTML ="Albums";
    element.append(albumsButton);

    const artistsButton = document.createElement("button");
    artistsButton.innerHTML ="Artists";
    element.append(artistsButton);
    
    const songsButton = document.createElement("button");
    songsButton.innerHTML = "Songs";
    songsButton.classList = "song-button";
    element.append(songsButton);

    const textSpace = document.createElement("p");
    textSpace.innerHTML ="Plz cleck teh boton";
    element.append(textSpace);


    document.getElementsByTagName("button")[0].onclick = () => {
        function1();
    };

    document.getElementsByTagName("button")[1].onclick = () => {
        function2();
    };
    
    document.querySelector(".song-button").onclick = () => {
        renderSongs();
    };

    function function1() {
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

    function function2() {
        document.getElementsByTagName("p")[0].innerHTML = "Here are some artists:";
    }

    
   

    function renderSongs() {
        document.getElementsByTagName("p")[0].innerHTML = "Here are some songs:";

        const app = document.querySelector("#app");
        app.append(document.createElement("input"));

        const addSongButton = document.createElement("button");
        addSongButton.innerHTML = "Add Song";
        addSongButton.classList = "add-song-button";
        element.append(addSongButton);

        fetch(`http://localhost:8081/api/songs/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: cohortTitle })
    })
      .then(response => {
        return response.json();
      })
      .then(cohort => {
        console.log(cohort);
      });
  }

    }

    

    

render(document.querySelector('#app'));