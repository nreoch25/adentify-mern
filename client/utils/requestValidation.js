class requestValidation {
  static init(gptObject) {
    console.log("GPT OBJECT VALIDATION", gptObject)
    this.validationErrors = [];
    // Test when error is returned
    if(gptObject.networkID !== "5876") {
      this.validationErrors.push("Incorrect NetworkID used");
    }
    return this.validationErrors;
  }
}

export default requestValidation;
