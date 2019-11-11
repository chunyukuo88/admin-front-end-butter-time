import { create } from "domain";
import { stringify } from "querystring";

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
      .then(function (data) {
        const albumResult = document.createElement("article");
        albumResult.innerHTML = JSON.stringify(data);
        element.append(albumResult);
    })
}

  function renderArtists() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some artists:";
  }

  function renderSongs() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some songs:";
    fetch("http://localhost:8080/api/songs")    
      .then(res => res.json())
      .then(data => displaySongData(data));

    function displaySongData(data) {      
      console.log(data);
      console.log(data.toString());
      const songDataContainer = document.createElement("div");
      
   
    document.getElementsByTagName("button")[2].onclick = () => {
        renderSongs();
    };

      // This doesn't work :-(
      songDataContainer.innerHTML = JSON.stringify(data.title);
      wrapper.append(songDataContainer);


    }

  }

}





render(document.querySelector('#app'));