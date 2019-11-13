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
            this.renderArtists();
            this.renderAlbumsOfArtistsById();
        }
        const albumsButtonElement = document.querySelector(".albums-button");
        albumsButtonElement.onclick = () => {
            this.renderAlbums();
        }
        const songsButtonElement = document.querySelector(".songs-button");
        songsButtonElement.onclick = () => {
            this.renderSongs();
        }
        const deleteButtonElement = document.querySelector(".delete-button");
        deleteButtonElement.onclick = () => {
            this.deleteEntity();
        }
    },

    renderArtists() {
        const textSpace = document.querySelector(".page-title");
        textSpace.textContent = "Here are some artists:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        fetch("http://localhost:8080/api/artists")
            .then(res => res.json())
            .then(function (data) {
                for (let index = 0; index < data.length; index++) {

                    const contentRecord = document.createElement("div");
                    contentRecord.classList.add("content-record");

                    const artistName = document.createElement("article");
                    artistName.innerHTML = data[index].name;
                    artistName.classList.add("content-record-item");
                    artistName.classList.add("content-record-item-name");
                    contentRecord.append(artistName);

                    contentContainer.append(contentRecord);

                }
            })

        this.addArtistForm();

    },

    renderAlbumsOfArtistsById() {
        fetch("http://localhost:8080/api/artists/{id}/albums")
            .then(res => res.json())
            .then(function (data) {

                const contentRecord2 = document.createElement("div");
                contentRecord2.classList.add("content-record-2");

                const albumsOfArtist = document.createElement("ul");
                albumsOfArtist.innerHTML = data.albums;
                albumsOfArtist.classList.add("list-of-albums-of-artist");
                contentRecord2.append(albumsOfArtist);

            })


    },

    renderAlbums() {
        const textSpace = document.querySelector(".page-title");
        textSpace.innerHTML = "Here are some albums:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        fetch("http://localhost:8080/api/albums")
            .then(res => res.json())
            .then(function (data) {
                console.log(data);
                for (let index = 0; index < data.length; index++) {

                    const contentRecord = document.createElement("div");
                    contentRecord.classList.add("content-record");

                    const albumTitle = document.createElement("div");
                    albumTitle.innerHTML = data[index].title;
                    albumTitle.classList.add("content-record-item");
                    albumTitle.classList.add("content-record-item-name");
                    contentRecord.append(albumTitle);

                    const albumArtist = document.createElement("div");
                    albumArtist.innerHTML = data[index].artist;
                    albumArtist.classList.add("content-record-item");
                    contentRecord.append(albumArtist);

                    const albumId = document.createElement("div");
                    albumId.innerHTML = data[index].id;
                    albumId.classList.add("content-record-item");
                    contentRecord.append(albumId);

                    contentContainer.append(contentRecord);
                }

            })
    },

    renderSongs() {
        const textSpace = document.querySelector(".page-title");
        textSpace.innerHTML = "Here are some songs:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        fetch("http://localhost:8080/api/songs")
            .then(res => res.json())
            .then(function (data) {

                for (let index = 0; index < data.length; index++) {

                    const contentRecord = document.createElement("div");
                    contentRecord.classList.add("content-record");

                    const songName = document.createElement("div");
                    songName.classList.add("content-record-item");
                    songName.classList.add("content-record-item-name");

                    const songNameLink = document.createElement("a");
                    songNameLink.href = "#";
                    songNameLink.onclick = (event) => {
                        event.preventDefault();
                        fetch("http://localhost:8080/api/songs/" + data[index].id)
                            .then(res => res.json())
                            .then(function (songData) {
                                const dropdown = document.createElement("div");
                                dropdown.classList.add("dropdown__container");

                                const dataLabel = document.createElement("div");
                                dataLabel.classList.add("dropdown__data-label");
                                dataLabel.innerHTML = "Song Title: ";
                                dropdown.append(dataLabel);

                                const dataText = document.createElement("div");
                                dataText.classList.add("dropdown__data-text");
                                dataText.innerHTML = songData.title;
                                dropdown.append(dataText);
                                formContainer.append(dropdown);

                            })
                    }

                    songNameLink.innerHTML = data[index].title;

                    songName.append(songNameLink);
                    contentRecord.append(songName);

                    const albumName = document.createElement("div");
                    albumName.innerHTML = data[index].album;
                    albumName.classList.add("content-record-item");
                    contentRecord.append(albumName);

                    const songDuration = document.createElement("div");
                    songDuration.innerHTML = data[index].duration;
                    songDuration.classList.add("content-record-item");
                    contentRecord.append(songDuration);

                    contentContainer.append(contentRecord);
                }

            })
    },

    deleteEntity() {
        const contentContainer = document.querySelector(".content-record");
        contentContainer.remove();
    },

    addArtistForm() {
        const formContainer = document.querySelector(".form-container");
        const form = document.createElement("Form");
        form.classList.add("form-artist");

        const artistNameLabel = document.createElement("Label");
        artistNameLabel.classList.add("form-artist__label");
        artistNameLabel.textContent = "Artist Name: ";
        form.append(artistNameLabel);

        const artistNameInput = document.createElement("Input");
        artistNameInput.classList.add("form-artist__input");
        form.append(artistNameInput);

        const addArtistButton = document.createElement("button");
        addArtistButton.innerHTML = "Add Artist";
        addArtistButton.classList.add("nav-button");
        addArtistButton.classList.add("add-artist-button");
        form.append(addArtistButton);
        formContainer.append(form);

        addArtistButton.onclick = (event) => {
            event.preventDefault();
            const artistName = document.querySelector(".form-artist__input").value;
            console.log(artistName);
        }

    },

    displayIndividualSongData(event) {
        event.preventDefault();
        const dropdown = document.createElement("div");
        dropdown.classList.add("dropdown__container");

        const dataLabel = document.createElement("div");
        dataLabel.classList.add("dropdown__data-label");
        dataLabel.innerHTML = "Song Title: ";
        dropdown.append(dataLabel);

        const dataText = document.createElement("div");
        dataText.classList.add("dropdown__data-text");
        dataText.innerHTML = "Title Goes Here";
        dropdown.append(dataText);

    }




}