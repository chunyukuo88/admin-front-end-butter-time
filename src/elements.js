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


    // REFERENCE
    // contentRecord.classList.add("content-record");

    // const albumTitle = document.createElement("div");
    // albumTitle.innerHTML = data[index].title;
    // albumTitle.classList.add("content-record-item");
    // albumTitle.classList.add("content-record-item-name");
    // contentRecord.append(albumTitle);
    // REFERENCE

    renderArtists() {
        const textSpace = document.querySelector(".page-title");
        textSpace.textContent = "Here are some artists:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        fetch("http://localhost:8080/artists")
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

                    const albumsOfArtist = document.createElement("div");


                    fetch("http://localhost:8080/artists/" + data[index].id + "/albums")
                        .then(res => res.json())
                        .then(albums => {
                            console.log(albums);
                            albums.forEach( album => {
                                albumOfArtist = document.createElement("div");
                                albumOfArtist.classList.add("list-of-albums-of-artist");
                                albumOfArtist.innerText = album.title;
                                contentRecord.append(albumOfArtist);
                            })
                        }
                        )

                }
            }
            )

        this.addArtistForm();

    },

    renderAlbumsOfArtistsById() {
        fetch("http://localhost:8080/artists/{id}/albums")
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
        fetch("http://localhost:8080/albums")
            .then(res => res.json())
            .then(function (data) {
                console.log(data);
                for (let index = 0; index < data.length; index++) {

                    const contentRecord = document.createElement("div");
                    // This is the container for the entire album:
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

    

                    songNameLink.href = "#";
                    songNameLink.onclick = (event) => {
                        event.preventDefault();
                        fetch("http://localhost:8080/songs/" + data[index].id)
                            .then(res => res.json())
                            .then(function (songData) {
                                formContainer.innerHTML = "";

                                const dropdown = document.createElement("div");
                                dropdown.classList.add("dropdown__container");

                                const dropdownRecord = document.createElement("div");
                                dropdownRecord.classList.add("content-record");

                                const dataLabel = document.createElement("div");
                                dataLabel.classList.add("dropdown__data-label");
                                dataLabel.innerHTML = "Song Title: ";
                                dropdownRecord.append(dataLabel);

                                const dataText = document.createElement("div");
                                dataText.classList.add("dropdown__data-text");
                                dataText.innerHTML = songData.title;
                                dropdownRecord.append(dataText);
                                dropdown.append(dropdownRecord);

                                // Ablum object is saved in H2 but not returning from endpoint.
                                // const dataLabelAlbum = document.createElement("div");
                                // dataLabelAlbum.classList.add("dropdown__data-label");
                                // dataLabelAlbum.innerHTML = "Album Title: ";
                                // dropdown.append(dataLabelAlbum);

                                // const dataTextAlbum = document.createElement("div");
                                // dataTextAlbum.classList.add("dropdown__data-text");
                                // console.log(songData);
                                // // dataTextAlbum.innerHTML = songData.album.title;
                                // dropdown.append(dataTextAlbum);
                                // formContainer.append(dropdown);

                                const dropdownRecordDuration = document.createElement("div");
                                dropdownRecordDuration.classList.add("content-record");

                                const dataLabelDuration = document.createElement("div");
                                dataLabelDuration.classList.add("dropdown__data-label");
                                dataLabelDuration.innerHTML = "Song Duration: ";
                                dropdownRecordDuration.append(dataLabelDuration);

                                const dataTextDuration = document.createElement("div");
                                dataTextDuration.classList.add("dropdown__data-text");
                                dataTextDuration.innerHTML = songData.duration + " seconds";
                                dropdownRecordDuration.append(dataTextDuration);
                                dropdown.append(dropdownRecordDuration);

                                formContainer.append(dropdown);

                            })
                    }


                    songNameLink.href = "http://localhost:8080/songs/" + data[index].id;
                    songNameLink.innerHTML = data[index].title;

                    songName.append(songNameLink);
                    contentRecord.append(songName);

                    // const albumName = document.createElement("div");
                    // albumName.innerHTML = data[index].album;
                    // albumName.classList.add("content-record-item");
                    // contentRecord.append(albumName);

                    // const songDuration = document.createElement("div");
                    // songDuration.innerHTML = data[index].duration;
                    // songDuration.classList.add("content-record-item");
                    // contentRecord.append(songDuration);

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





            fetch('http://localhost:8080/artists/' + artistName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });

            this.renderArtists();

        }
    }
}
