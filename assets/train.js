var config = {
    apiKey: "AIzaSyAvlIKxZDfrqHyy-KJHDD4yinzQQyf10uk",
    authDomain: "trainscheduler-bfba8.firebaseapp.com",
    databaseURL: "https://trainscheduler-bfba8.firebaseio.com",
    projectId: "trainscheduler-bfba8",
    storageBucket: "trainscheduler-bfba8.appspot.com",
    messagingSenderId: "351787101600"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#submitButton').on('click', function(event){
      event.preventDefault();

      var trainName = $('#trainName').val().trim();
      var destination = $('#destination').val().trim();
      var firstTrain = $('#trainStartTime').val().trim();
      var frequency = $('#frequency').val().trim();

      var addedTrain = {
          name: trainName,
          location: destination,
          first: firstTrain,
          frequency: frequency
      };

    database.ref().push(addedTrain);

    console.log(addedTrain.name);
    console.log(addedTrain.location);
    console.log(addedTrain.first);
    console.log(addedTrain.frequency);

    alert('New train added!');

    $('#trainName').val("");
    $('#destination').val("");
    $('#trainStartTime').val("");
    $('#frequency').val("");

  });

  database.ref().on('child_added', function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var currentTime = moment().format('HH:mm');

    var convertFirst = moment(firstTrain, 'HH:mm');

    var timeDiff = moment().diff(moment(convertFirst), 'minutes');

    var tRemaining = timeDiff % frequency;

    var minTilTrain = frequency - tRemaining;

    var nextTrain = moment().add(minTilTrain, 'minutes').format('HH:mm');

    $('#trainSchedule > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + nextTrain + '</td><td>' + minTilTrain + '</td></tr>');
  });

  