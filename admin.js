const admin = require("firebase-admin");
const serviceAccount = require("./data/motionsserien-serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://motionsserien-3a987.firebaseio.com"
});

const db = admin.database();
const divisions = db.ref("divisions");

divisions.once("value", function(snapshot) {
    let updatedDivisions = addMatchId(snapshot.val())
    divisions.set(updatedDivisions, function(error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            console.log("Data saved successfully.");
        }
        process.exit();
    });
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