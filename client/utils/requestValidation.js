class requestValidation {
  static checkNetworkID(networkID) {
    let pattern = /^\d{4,5}$/g;
    if(pattern.test(networkID) === false) {
      this.validationErrors.push("Invalid GPT Network ID");
    }
  }
  static init(gptObject) {
    console.log("GPT OBJECT VALIDATION", gptObject)
    this.validationErrors = [];
    // Test when error is returned
    this.checkNetworkID(gptObject.networkID);
    /*if(gptObject.networkID !== "5876") {
      this.validationErrors.push("Incorrect NetworkID used");
    }*/
    return this.validationErrors;
  }
}

export default requestValidation;
