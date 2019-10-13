module.exports = {
  TimelineMax: class {
    constructor () {
      this.TweenLite = {
        to: jest.fn().mockReturnThis()
      }
    }
  }
}
