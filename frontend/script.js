function uploadAudio() {

    let fileInput =
        document.getElementById("audioFile");

    let file = fileInput.files[0];

    let resultBox =
        document.getElementById("resultBox");

    let audioPlayer =
        document.getElementById("audioPlayer");

    if (!file) {

        alert("Please upload audio file");

        return;
    }

    // Show audio preview

    let audioURL =
        URL.createObjectURL(file);

    audioPlayer.src = audioURL;

    // Prepare data

    let formData = new FormData();

    formData.append("audio", file);

    resultBox.innerHTML =
        "Detecting voice...";

    fetch("http://localhost:5000/predict", {

        method: "POST",

        body: formData

    })

    .then(response => response.json())

    .then(data => {

        resultBox.innerHTML =
            " Prediction: " +
            data.prediction;

    })

    .catch(error => {

        resultBox.innerHTML =
            " Error connecting to server";

        console.error(error);
    });
}