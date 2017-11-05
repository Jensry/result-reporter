const admin = require("firebase-admin");
const serviceAccount = require("./data/motionsserien-serviceAccountKey.json");
const teamsFile = require("./data/motionsserien-teams.json");
const matchesFile = require("./data/motionsserien-matches.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://motionsserien-3a987.firebaseio.com"
});

const db = admin.database();
const divisionsRef = db.ref("divisions");
const teamsRef = db.ref("teams");
const matchesRef = db.ref("matches");

//RUN HERE
setMatches();
setTeams();


function addMatchIdToEachMatch() {
    divisionsRef.once("value", function(snapshot) {
        let updatedDivisions = addMatchId(snapshot.val())
        divisionsRef.set(updatedDivisions, catchAnswer);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        process.exit(1);
    });

    function addMatchId(divisions) {
        for (let matchid in divisions.div3.matches) {
            divisions.div3.matches[matchid]['matchid'] = matchid;
        }
        //console.log(JSON.stringify(divisions, null, 2));
        return divisions;
    }
}

function setTeams() {
    teamsRef.set(teamsFile.teams, catchAnswer);
}

function setMatches() {
    matchesRef.set(matchesFile.matches, catchAnswer);
}

function catchAnswer(error) {
    if (error) {
        console.log("Data could not be saved." + error);
    } else {
        console.log("Data saved successfully.");
    }
    process.exit();
}
