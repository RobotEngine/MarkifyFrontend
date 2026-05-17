import { userID, copyObject, objectUpdate, sendRequest } from "@/crucial";

export class Preferences {
  state = {};
  lastSavedState = {};

  async process() {
    let tempRevert = copyObject(this.lastSavedState);
    let changes = objectUpdate(this.state, this.lastSavedState);
    this.lastSavedState = copyObject(this.state);
    if (Object.keys(changes).length > 0) {
      let [code] = await sendRequest("POST", "lessons/save/preferences", { save: changes });
      if (code != 200) {
        this.lastSavedState = tempRevert;
      }
    }
  }

  create(preferences) {
    this.state = copyObject(preferences);
    this.lastSavedState = copyObject(preferences);
  }
  update(preferences) {
    objectUpdate(preferences, this.state);
    objectUpdate(preferences, this.lastSavedState);
  }

  save(skip) {
    if (userID == null) {
      return; // Can't save if not a user!
    }
    clearTimeout(this.savePreferenceTimeout);
    if (skip == true) {
      return this.process();
    }
    this.savePreferenceTimeout = setTimeout(() => {
      this.process();
    }, 1000); // Save after 1 second of no changes
  }
}