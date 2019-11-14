const artists = require("./artists");
const albums = require("./albums");
const songs = require("./songs");
const wrapper = document.querySelector(".wrapper");

module.exports = {

    createButtons() {
        var buttons = ['Artists', 'Albums', 'Songs', 'Delete'];
        buttons.forEach(function (button) {
            const buttonLowerCase = button.toLowerCase();
            const buttonElement = document.createElement("button");
            buttonElement.innerHTML = button;
            buttonElement.classList.add("nav-button");
            buttonElement.classList.add(buttonLowerCase + "-button");
            wrapper.append(buttonElement);
        });
        this.addButtonOnclicks();
    },

    addButtonOnclicks() {
        const artistsButtonElement = document.querySelector(".artists-button");
        artistsButtonElement.onclick = () => {
            artists.renderArtists();
            artists.renderAlbumsOfArtistsById();
        }
        const albumsButtonElement = document.querySelector(".albums-button");
        albumsButtonElement.onclick = () => {
            albums.renderAlbums();
        }
        const songsButtonElement = document.querySelector(".songs-button");
        songsButtonElement.onclick = () => {
            songs.renderSongs();
        }
        const deleteButtonElement = document.querySelector(".delete-button");
        deleteButtonElement.onclick = () => {
            this.deleteEntity();
        }
    },




    deleteEntity() {
        const contentContainer = document.querySelector(".content-record");
        contentContainer.remove();
    }


}
