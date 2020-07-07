import { action, computed, observable } from 'mobx';
import { url } from '../../env';

export class CurrentUserStore {
  @observable id: string;
  @observable name: string;

  constructor(activeId = '') {
    this.id = activeId;
    this.name = '';
  }

  @action
  changeId(id: string) {
    this.id = id;
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  @computed
  get getActiveId() {
    return this.id;
  }

  sendUserName(choice: string) {
    fetch(`${url}/api/choice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': 'origin',
      },
      body: JSON.stringify({ name: this.name, choice }),
    });
  }
}
