
$(document).ready(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCql1PEBYaSxEkIxRlOQII4BuWh75LWmOs",
        authDomain: "train-schedule-e5dc1.firebaseapp.com",
        databaseURL: "https://train-schedule-e5dc1.firebaseio.com",
        projectId: "train-schedule-e5dc1",
        storageBucket: "",
        messagingSenderId: "97225052122",
        appId: "1:97225052122:web:581aa5a0691f779191bae3"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    var database = firebase.database();


    // //global variables
    // var train = "";
    // var destination = "";
    // var firstTrain = "";
    // var frequency = "";

    $("#submit").on("click", function (event) {
        event.preventDefault();

        // Variables
        var train = $("#train").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-train").val().trim();
        var frequency = parseInt($("#frequency").val().trim());

        // console.log(train);
        // console.log(destination);
        // console.log(firstTrain);
        // console.log(frequency);

        database.ref().push({

            train: train,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref().on("child_added", function (snapshot) {

        var sv = snapshot.val();

        var frequency = sv.frequency;
        var firstTrain = sv.firstTrain;
   
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("hh:mm"));
        var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        var remainder = timeDiff % frequency;

        var minutesAway = frequency - remainder;
        var nextArrival = moment().add(minutesAway, "minutes");



        // Log everything that's coming out of snapshot
        console.log("train: " + sv.train);
        console.log("destination: " + sv.destination);
        console.log("first train: " + firstTrain);
        console.log("frequency: " + frequency);
        console.log("next arrival: " + nextArrival.format("hh:mm a"));
        console.log("minutes away: " + minutesAway);

        $("#train-schedule").append("<tr>" 
        + "<td>" + sv.train + "</td>"
        + "<td>" + sv.destination + "</td>"
        + "<td>" + frequency + "</td>"
        + "<td>" + nextArrival.format("HH:mm a") + "</td>"
        + "<td>" + minutesAway + "</td>"
        + "</tr>");


    });

});