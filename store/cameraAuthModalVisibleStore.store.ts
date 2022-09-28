import {makeObservable, observable, action} from 'mobx';
class cameraAuthModalVisibleStore {
  visible = false;
  constructor() {
    makeObservable(this, {
      visible: observable,
      makeVisible: action.bound,
      makeInvisible: action.bound,
    });
  }
  makeVisible() {
    this.visible = true;
  }
  makeInvisible() {
    this.visible = false;
  }
}

export default cameraAuthModalVisibleStore;
