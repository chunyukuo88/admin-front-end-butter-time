module.exports = {

    renderSongs() {
        const textSpace = document.querySelector(".page-title");
        textSpace.innerHTML = "Here are some songs:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
        document.querySelector(".add-button").hidden = true;
        document.querySelector(".delete-button").hidden = true;
        fetch("http://localhost:8080/songs")
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
                        document.querySelector(".add-button").hidden = false;
                        document.querySelector(".delete-button").hidden = false;

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

                                const dropdownRecord0 = document.createElement("div");
                                dropdownRecord0.classList.add("content-record");

                                const dataLabelAlbum = document.createElement("div");
                                dataLabelAlbum.classList.add("dropdown__data-label");
                                dataLabelAlbum.innerHTML = "Album Title: ";
                                dropdownRecord0.append(dataLabelAlbum);

                                const dataTextAlbum = document.createElement("div");
                                dataTextAlbum.classList.add("dropdown__data-text");

                                fetch("http://localhost:8080/songs/" + songData.id + "/album")
                                    .then(res => res.json())
                                    .then(function (albumData) {
                                        dataTextAlbum.innerHTML = albumData.title;
                                    })

                                dropdownRecord0.append(dataTextAlbum);
                                dropdown.append(dropdownRecord0);
                                formContainer.append(dropdown);

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
                    contentContainer.append(contentRecord);
                }

            })
        this.addSongForm();
    },

    addSongForm() {
        const formContainer = document.querySelector(".form-container");
        const form = document.createElement("Form");
        form.classList.add("form-song");

        const formFieldset = document.createElement("div");
        formFieldset.classList.add(".form-fieldset");

        const formFieldRow = document.createElement("div");
        formFieldRow.classList.add(".form-field-row");

        const nameLabel = document.createElement("Label");
        nameLabel.classList.add("form-song__label");
        nameLabel.classList.add("form__label");
        nameLabel.textContent = "Song Title: ";
        formFieldRow.append(nameLabel);

        const titleInput = document.createElement("Input");
        titleInput.classList.add("form-song__input");
        titleInput.classList.add("form__data");
        formFieldRow.append(titleInput);

        formFieldset.append(formFieldRow);


        const formFieldRow1 = document.createElement("div");
        formFieldRow1.classList.add(".form-field-row");

        const durationLabel = document.createElement("Label");
        durationLabel.classList.add("form-song__label");
        durationLabel.classList.add("form__label");
        durationLabel.textContent = "Duration in Seconds: ";
        formFieldRow1.append(durationLabel);

        const durationInput = document.createElement("Input");
        durationInput.type = "number";
        durationInput.min = 0;
        durationInput.value = 180;
        durationInput.classList.add("form-song__input-duration");
        durationInput.classList.add("form__data");
        formFieldRow1.append(durationInput);

        formFieldset.append(formFieldRow1);


        const formFieldRow2 = document.createElement("div");
        formFieldRow2.classList.add(".form-field-row");
        const selectAlbumLabel = document.createElement("Label");
        selectAlbumLabel.classList.add("form-song__label");
        selectAlbumLabel.classList.add("form__label");
        selectAlbumLabel.textContent = "Album: ";
        formFieldRow2.append(selectAlbumLabel);

        const selectAlbum = document.createElement("select");
        selectAlbum.classList.add("form-song__select");
        selectAlbum.classList.add("form__data");

        fetch("http://localhost:8080/albums")
            .then(res => res.json())
            .then(function (data) {
                for (let index = 0; index < data.length; index++) {

                    const selectAlbumOption = document.createElement("option");
                    selectAlbumOption.classList.add("form-song__select-option");
                    selectAlbumOption.classList.add("form__data");
                    selectAlbumOption.value = data[index].id;
                    selectAlbumOption.textContent = data[index].title;
                    selectAlbum.append(selectAlbumOption);
                }
            });

        formFieldRow2.append(selectAlbum);
        formFieldset.append(formFieldRow2);

        const formFieldRow3 = document.createElement("div");
        formFieldRow3.classList.add(".form-field-row");

        const addSongButton = document.createElement("button");
        addSongButton.innerHTML = "Add Song";
        addSongButton.classList.add("nav-button");
        addSongButton.classList.add("add-song-button");
        formFieldRow3.append(addSongButton);
        formFieldset.append(formFieldRow3);

        form.append(formFieldset);
        formContainer.append(form);

        addSongButton.onclick = (event) => {
            event.preventDefault();
            const songTitle = document.querySelector(".form-song__input").value;
            const albumId = document.querySelector(".form-song__select").value;
            const durationSeconds = document.querySelector(".form-song__input-duration").value;

            console.log("Song Title: " + songTitle);
            console.log("Album Id: " + albumId);

            fetch('http://localhost:8080/songs/add-song/' + albumId + "/" + songTitle + "/" + durationSeconds, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    albumId: albumId,
                    songTitle: songTitle,
                    songDuration: durationSeconds
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .then(() => {
                    this.renderSongs();
                });



        }

    }
}