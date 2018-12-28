const admin = require("firebase-admin");
const serviceAccount = require("./data/bkc-motionsserien-serviceAccountKey.json");
const matchesDiv1File = require("./data/bkc-motionsserien-div1-matches-raw.json");
const teamsDiv1File = require("./data/bkc-motionsserien-div1-teams-raw.json");
const matchesDiv2File = require("./data/bkc-motionsserien-div2-matches-raw.json");
const teamsDiv2File = require("./data/bkc-motionsserien-div2-teams-raw.json");
const matchesDiv3File = require("./data/bkc-motionsserien-div3-matches-raw.json");
const teamsDiv3File = require("./data/bkc-motionsserien-div3-teams-raw.json");
const matchesDiv4File = require("./data/bkc-motionsserien-div4-matches-raw.json");
const teamsDiv4File = require("./data/bkc-motionsserien-div4-teams-raw.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bkc-motionsserien.firebaseio.com"
});

const db = admin.database();
const divisionsRef = db.ref("divisions");

//Setup divisions to store here:
addDivision("div1", "Div 1", matchesDiv1File, teamsDiv1File);
addDivision("div2", "Div 2", matchesDiv2File, teamsDiv2File);
addDivision("div3", "Div 3", matchesDiv3File, teamsDiv3File);
addDivision("div4", "Div 4", matchesDiv4File, teamsDiv4File);

function addDivision(divId, divName, matchesFile, teamsFile) {
  let division = {
    divid: divId,
    divname: divName,
    matches: getMatches(matchesFile),
    teams: getTeams(teamsFile)
  };
  divisionsRef.child(divId).set(division, catchAnswer);
}

function getMatches(matchesFile) {
  let matches = {};
  for (let matchKey in matchesFile) {
    const match = matchesFile[matchKey];
    const matchId = "match" + pad(match["Matchnummer"]);
    matches[matchId] = {
      hometeam: toValidKey(match["Hemmalag"]),
      awayteam: toValidKey(match["Bortalag"]),
      court: match["Bana"],
      date: match["Datum"],
      matchid: matchId,
      matchnumber: match["Matchnummer"],
      result: match["Resultat"],
      round: match["Spelomgång"],
    }
  }
  return matches;
}

function getTeams(teamsFile) {
  let teams = {};
  for (let teamKey in teamsFile) {
    const team = teamsFile[teamKey]
    teams[toValidKey(teamKey)] = {
      name: team["Team"],
      members: [team["Member1"], team["Member2"], team["Member3"], team["Member4"], team["Member5"]].filter(name => name), 
    }
  }
  return teams;
}

function catchAnswer(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  }
  process.exit();
}

function toValidKey(keyString) {
  return keyString.replace(new RegExp("[.#$/\\]\\[]", "g"), "");
}

function pad(n, width = 2, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
