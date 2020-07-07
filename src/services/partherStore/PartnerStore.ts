import { action, computed, observable } from 'mobx';
import { url } from '../../env';

export class PartnerStore {
  @observable private id: string;

  @action
  fetchData(name: string) {
    fetch(`${url}/api/choice?name=${name}`, {
      headers: {
        name,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.id = Object.values(data.data)[0] as string;
      });
  }

  @computed
  get getActiveId() {
    return this.id;
  }

  @action
  changeId(id: string) {
    this.id = id;
  }
}
