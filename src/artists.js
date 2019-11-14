module.exports = {

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
                            albums.forEach(album => {
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

    addArtistForm() {
        const formContainer = document.querySelector(".form-container");
        const form = document.createElement("Form");
        form.classList.add("form-artist");

        const artistNameLabel = document.createElement("Label");
        artistNameLabel.classList.add("form-artist__label");
        artistNameLabel.classList.add("form__label");
        artistNameLabel.textContent = "Artist Name: ";
        form.append(artistNameLabel);

        const artistNameInput = document.createElement("Input");
        artistNameInput.classList.add("form-artist__input");
        artistNameInput.classList.add("form__data");
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