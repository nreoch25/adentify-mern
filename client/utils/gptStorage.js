class gptStorage {
  static setItem(key, value) {
    // get items from localStorage
    let items = this.getItem(key);
    // if items null set items in localStorage
    if(items === null) {
      this.requestsArray.push(value);
      this.storage.setItem(key, JSON.stringify(this.requestsArray));
    } else {
      // items already exist need to push new array
      this.requestsArray = JSON.parse(items);
      this.requestsArray.push(value);
      this.storage.setItem(key, JSON.stringify(this.requestsArray));
    }
  }
  static overwriteItem(key, value) {
    console.log("OVERWRITE", value);
    this.storage.setItem(key, JSON.stringify(value))
  }
  static getItem(key) {
    let items = this.storage.getItem(key);
    return items;
  }
  static init() {
    // avoid global lookups
    this.win = window;
    this.storage = false;
    this.requestsArray = [];
    // check if localStorage is available
    if(this.win["localStorage"]) {
      this.storage = this.win["localStorage"];
    }
  }
}

export default gptStorage;
