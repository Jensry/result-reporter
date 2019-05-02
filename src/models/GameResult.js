import SetResult from "./SetResult";

export default class GameResult {
  constructor(
    set1 = new SetResult(),
    set2 = new SetResult(),
    set3 = new SetResult()
  ) {
    this.set1 = set1;
    this.set2 = set2;
    this.set3 = set3;
  }
}
