class Constant {
  constructor(type) {
    this.type = type;
  }

  get success() {
    return `SUCCESS_${this.type}`;
  }
  get failed() {
    return `FAILED_${this.type}`;
  }
  get pending() {
    return `PENDNG_${this.type}`;
  }
}


export default Constant