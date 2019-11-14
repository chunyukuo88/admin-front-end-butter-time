module.exports = {

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
                    // albumArtist.innerHTML = data[index].artist;
                    albumArtist.classList.add("content-record-item");
                    contentRecord.append(albumArtist);

                    const albumId = document.createElement("div");
                    albumId.innerHTML = data[index].id;
                    albumId.classList.add("content-record-item");
                    contentRecord.append(albumId);

                    contentContainer.append(contentRecord);
                
                    fetch("http://localhost:8080/albums/" + data[index].id + "/get-artist")
                    .then(res => res.json())
                    .then(artist => {
                        console.log(artist);
                        albumArtist.innerHTML = artist.name;
                    }
                    )
                
                } //<-----The end of the for loop of the outer fetch() request

            })

        this.addAlbumForm();
    },

    addAlbumForm() {
        const formContainer = document.querySelector(".form-container");
        const form = document.createElement("Form");
        form.classList.add("form-album");

        const formFieldset = document.createElement("div");
        formFieldset.classList.add(".form-fieldset");

        const formFieldRow = document.createElement("div");
        formFieldRow.classList.add(".form-field-row");

        const albumTitleLabel = document.createElement("Label");
        albumTitleLabel.classList.add("form-album__label");
        albumTitleLabel.classList.add("form__label");
        albumTitleLabel.textContent = "Album Title: ";
        formFieldRow.append(albumTitleLabel);

        const albumTitleInput = document.createElement("Input");
        albumTitleInput.classList.add("form-album__input");
        albumTitleInput.classList.add("form__data");
        formFieldRow.append(albumTitleInput);

        formFieldset.append(formFieldRow);

        const formFieldRow2 = document.createElement("div");
        formFieldRow2.classList.add(".form-field-row");
        const selectArtistLabel = document.createElement("Label");
        selectArtistLabel.classList.add("form-album__label");
        selectArtistLabel.classList.add("form__label");
        selectArtistLabel.textContent = "Artist: ";
        formFieldRow2.append(selectArtistLabel);

        const selectArtist = document.createElement("select");
        selectArtist.classList.add("form-album__select");
        selectArtist.classList.add("form__data");

        fetch("http://localhost:8080/artists")
            .then(res => res.json())
            .then(function (data) {
                for (let index = 0; index < data.length; index++) {

                    const selectArtistOption = document.createElement("option");
                    selectArtistOption.classList.add("form-album__select-option");
                    selectArtistOption.classList.add("form__data");
                    selectArtistOption.value = data[index].id;
                    selectArtistOption.textContent = data[index].name;
                    selectArtist.append(selectArtistOption);
                }
            });

        formFieldRow2.append(selectArtist);
        formFieldset.append(formFieldRow2);

        const formFieldRow3 = document.createElement("div");
        formFieldRow3.classList.add(".form-field-row");

        const addAlbumButton = document.createElement("button");
        addAlbumButton.innerHTML = "Add Album";
        addAlbumButton.classList.add("nav-button");
        addAlbumButton.classList.add("add-album-button");
        formFieldRow3.append(addAlbumButton);
        formFieldset.append(formFieldRow3);

        form.append(formFieldset);
        formContainer.append(form);

        addAlbumButton.onclick = (event) => {
            event.preventDefault();
            const albumTitle = document.querySelector(".form-album__input").value;
            const artistId = document.querySelector(".form-album__select").value;
            console.log("Album Title: " + albumTitle);
            console.log("Artist Id: " + artistId);

            fetch('http://localhost:8080/albums/add-album/' + artistId + "/" + albumTitle, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    artistId: artistId,
                    title: albumTitle
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });

            this.renderAlbums();

        }
    }



}