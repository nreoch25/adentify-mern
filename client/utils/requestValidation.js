class requestValidation {
  static checkNetworkID(networkID) {
    let pattern = /^\d{4,5}$/g;
    if (pattern.test(networkID) === false) {
      this.validationErrors.push("Invalid GPT Network ID");
    }
  }
  static checkAdSizes(adSize) {
    let pattern = /^\d+x\d+/g;
    if (pattern.test(adSize) === false) {
      this.validationErrors.push(`Invalid Ad Size - ${adSize}`);
    }
  }
  static init(gptObject) {
    console.log("GPT OBJECT VALIDATION", gptObject);
    this.validationErrors = [];
    // Check for valid networkID
    this.checkNetworkID(gptObject.networkID);
    // Check for valid ad sizes
    gptObject.adSizes.forEach(size => {
      this.checkAdSizes(size);
    });
    return this.validationErrors;
  }
}

export default requestValidation;
