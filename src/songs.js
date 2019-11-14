module.exports = {

    renderSongs() {
        const textSpace = document.querySelector(".page-title");
        textSpace.innerHTML = "Here are some songs:";
        const contentContainer = document.querySelector(".content-container");
        contentContainer.innerHTML = "";
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = "";
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
    }
}