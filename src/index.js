// const Deact = require("deact");
const elements = require("./elements");

// import { create } from "domain";
// import { stringify } from "querystring";


const wrapper = document.querySelector(".wrapper");

const render = element => {

  const createdElement = document.createElement("H2");
  createdElement.innerHTML = "Butter Records";  
  element.append(createdElement);

  const artistsButton = document.createElement("button");
  artistsButton.innerHTML = "Artists";
  createdElement.classList.add("album-button");
  createdElement.classList.add("nav-button");
  element.append(artistsButton);

  const albumsButton = document.createElement("button");
  albumsButton.innerHTML = "Albums";
  createdElement.classList.add("album-button");
  createdElement.classList.add("nav-button");
  element.append(albumsButton);

  

  const songsButton = document.createElement("button");
  songsButton.innerHTML = "Songs";
  songsButton.classList = "song-button";
  createdElement.classList.add("nav-button");
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

  document.getElementsByTagName("button")[2].onclick = () => {
    renderSongs();
  };

  function renderAlbums() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some albums:";
    fetch("http://localhost:8080/api/albums")
      .then(res => res.json())
      .then(function (data) {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
          
          
          
          const albumTitle = document.createElement("article");
          albumTitle.innerHTML = data[index].title;
          element.append(albumTitle);
          
          const albumArtist = document.createElement("article");
          albumArtist.innerHTML = data[index].artist;
          element.append(albumArtist);

          const albumId = document.createElement("article");
          albumId.innerHTML = data[index].id;
          element.append(albumId);
        }

    })
}

function renderSongs() {
  document.getElementsByTagName("p")[0].innerHTML = "Here are some songs:";
  fetch("http://localhost:8080/api/songs")
    .then(res => res.json())
    .then(function (data) {

      for (let index = 0; index < data.length; index++) {
        const songName = document.createElement("article");
        songName.innerHTML = data[index].title;
        element.append(songName);
        
        const albumName = document.createElement("article");
        albumName.innerHTML = data[index].album;
        element.append(albumName);

        const songDuration = document.createElement("article");
        songDuration.innerHTML = data[index].duration;
        element.append(songDuration);
      }

  })
}

function renderArtists() {
  document.getElementsByTagName("p")[0].innerHTML = "Here are some artist:";
  fetch("http://localhost:8080/api/artists")
    .then(res => res.json())
    .then(function (data) {
      for (let index = 0; index < data.length; index++) {
           const artistName = document.createElement("article");
          artistName.innerHTML = data[index].name;
          element.append(artistName);
      }
  })
}

}



render(document.querySelector('#app'));
elements.createButtons();