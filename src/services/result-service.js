import GameResult from "../models/GameResult";
import SetResult from "../models/SetResult";

function calculateGame(game) {
  return (
    calculateSet(game.set1) + calculateSet(game.set2) + calculateSet(game.set3)
  );
}

function calculateSet(set) {
  if (Number(set.homeScore) > Number(set.awayScore)) {
    return 1;
  } else if (Number(set.homeScore) < Number(set.awayScore)) {
    return -1;
  } else {
    return 0;
  }
}

export default {
  homeScore(doublesResult, singlesOneResult, singlesTwoResult) {
    let homeScore = 0;
    if (calculateGame(doublesResult) > 0) {
      homeScore++;
    }
    if (calculateGame(singlesOneResult) > 0) {
      homeScore++;
    }
    if (calculateGame(singlesTwoResult) > 0) {
      homeScore++;
    }
    return homeScore;
  },
  awayScore(doublesResult, singlesOneResult, singlesTwoResult) {
    let awayScore = 0;
    if (calculateGame(doublesResult) < 0) {
      awayScore++;
    }
    if (calculateGame(singlesOneResult) < 0) {
      awayScore++;
    }
    if (calculateGame(singlesTwoResult) < 0) {
      awayScore++;
    }
    return awayScore;
  },
  matchScore(matchResult) {
    const doublesResult = new GameResult(
      new SetResult(matchResult.doublesSet1Home, matchResult.doublesSet1Away),
      new SetResult(matchResult.doublesSet2Home, matchResult.doublesSet2Away),
      new SetResult(matchResult.doublesSet3Home, matchResult.doublesSet3Away)
    );
    const singles1Result = new GameResult(
      new SetResult(matchResult.singles1Set1Home, matchResult.singles1Set1Away),
      new SetResult(matchResult.singles1Set2Home, matchResult.singles1Set2Away),
      new SetResult(matchResult.singles1Set3Home, matchResult.singles1Set3Away)
    );
    const singles2Result = new GameResult(
      new SetResult(matchResult.singles2Set1Home, matchResult.singles2Set1Away),
      new SetResult(matchResult.singles2Set2Home, matchResult.singles2Set2Away),
      new SetResult(matchResult.singles2Set3Home, matchResult.singles2Set3Away)
    );
    return this.homeScore(doublesResult, singles1Result, singles2Result) + '-' + this.awayScore(doublesResult, singles1Result, singles2Result); 
  }
};
