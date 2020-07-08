import { action, computed, observable } from 'mobx';
import { Choices, wsUrl } from '../../env';

export class CurrentUserStore {
  @observable userChoice: string;
  @observable name: string;
  @observable opponentName: string;
  @observable opponentChoice: string;
  @observable showResult: boolean;
  @observable wsStatus: string;
  @observable isYourChoiceSent: boolean;
  private ws: WebSocket;

  constructor(activeId = '') {
    this.userChoice = activeId;
    this.name = '';
    this.showResult = false;
    this.isYourChoiceSent = false;
    this.opponentChoice = '';
    this.opponentName = '';

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => (this.wsStatus = 'ONLINE');
    this.ws.onclose = () => {
      if (this.ws) {
        return;
      }
      this.ws = new WebSocket(wsUrl);
    };
    this.ws.onerror = () => {
      this.ws = null;
      this.wsStatus = 'DISCONNECT';
    };
    this.ws.onmessage = (res) => {
      const { name, choice, onceAgain } = JSON.parse(res.data);

      if (onceAgain) {
        this.resetData();
        return;
      }

      if (name === this.name) {
        return;
      }
      this.opponentChoice = choice;
      this.opponentName = name;

      if (this.userChoice) {
        this.changeShowResult(true);
      }
    };
  }

  @action
  changeUserChoice(id: string) {
    this.userChoice = id;
  }

  @action
  changeShowResult(isShowResult: boolean) {
    if (!this.isYourChoiceSent) {
      return;
    }
    this.showResult = isShowResult;
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  @action
  sendUserChoice(choice: string) {
    this.ws.send(JSON.stringify({ name: this.name, choice }));
    this.isYourChoiceSent = true;
    if (this.opponentChoice) {
      this.changeShowResult(true);
    }
  }

  @computed
  get winnerName() {
    if (
      (this.userChoice === Choices.handPaperO && this.opponentChoice === Choices.handPaperO) ||
      (this.userChoice === Choices.handRockO && this.opponentChoice === Choices.handRockO) ||
      (this.userChoice === Choices.handScissorsO && this.opponentChoice === Choices.handScissorsO)
    ) {
      return 'nobody';
    }
    if (
      (this.userChoice === Choices.handPaperO && this.opponentChoice === Choices.handRockO) ||
      (this.userChoice === Choices.handRockO && this.opponentChoice === Choices.handScissorsO) ||
      (this.userChoice === Choices.handScissorsO && this.opponentChoice === Choices.handPaperO)
    ) {
      return this.name;
    }

    return this.opponentName;
  }

  @computed
  get showOpponentAnswer() {
    return this.opponentChoice && this.userChoice && this.isYourChoiceSent;
  }

  @action
  onceAgain() {
    this.resetData();
    this.ws.send(JSON.stringify({ onceAgain: true }));
  }

  @action
  resetData() {
    this.userChoice = '';
    this.showResult = false;
    this.isYourChoiceSent = false;
    this.opponentChoice = '';
    this.opponentName = '';
  }
}
