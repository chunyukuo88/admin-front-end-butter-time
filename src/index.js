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

  function renderArtists() {
    document.getElementsByTagName("p")[0].innerHTML = "Here are some artists:";
    fetch("http://localhost:8080/api/artists")
    .then(res => res.json())
    .then(function (data) {
      const artistResult = document.createElement("article");
      artistResult.innerHTML = JSON.stringify(data);
      element.append(artistResult);
  })
}




}





render(document.querySelector('#app'));