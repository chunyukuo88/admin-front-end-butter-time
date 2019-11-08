import { create } from "domain";

const wrapper = document.querySelector(".wrapper");

const render = element => {
  const createdElement = document.createElement("H2");
  createdElement.innerHTML = "Butter Records";
  element.append(createdElement);

  const albumsButton = document.createElement("button");
  albumsButton.innerHTML = "Albums";
  element.append(albumsButton);

  const artistsButton = document.createElement("button");
  artistsButton.innerHTML = "Artists";
  element.append(artistsButton);

  const songsButton = document.createElement("button");
  songsButton.innerHTML = "Songs";
  songsButton.classList = "song-button";
  element.append(songsButton);

  const textSpace = document.createElement("p");
  textSpace.innerHTML = "Plz cleck teh boton";
  element.append(textSpace);


  document.getElementsByTagName("button")[0].onclick = () => {
    renderAlbums();
  };

  document.getElementsByTagName("button")[1].onclick = () => {
    renderArtists();
  };

  document.querySelector(".song-button").onclick = () => {
    renderSongs();
  };

  function renderAlbums() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some albums:";
    fetch("http://localhost:8080/api/albums")
      .then(res => res.json())
      .then(data => console.log(data))
  }

  function renderArtists() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some artists:";
  }

  function renderSongs() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some songs:";
    fetch("http://localhost:8080/api/songs")    
      .then(response => response.json())
      .then(data => displaySongData(data));

    function displaySongData(data) {      
      console.log(data);
      console.log(data.toString());
      const songDataContainer = document.createElement("div");
      
      // json.response.forEach(song => {
      //   console.log("in the loop!");
      // });
    
      // This doesn't work :-(
      songDataContainer.innerHTML = JSON.stringify(data.title);
      wrapper.append(songDataContainer);

    }

    //     const app = document.querySelector("#app");
    //     app.append(document.createElement("input"));

    //     const addSongButton = document.createElement("button");
    //     addSongButton.innerHTML = "Add Song";
    //     addSongButton.classList = "add-song-button";
    //     element.append(addSongButton);

    //     fetch(`http://localhost:8081/api/songs/`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ title: cohortTitle })
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(cohort => {
    //     console.log(cohort);
    //   });
  }

}





render(document.querySelector('#app'));