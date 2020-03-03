import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: '',
      textColor: 'black',
    };

    this.userData = userData.slice(); // change to query later
    this.currentList = [];
    this.startTime = 0;
    this.firstTry = true;

    this.testKeypress = this.testKeypress.bind(this);
    this.nextKey = this.nextKey.bind(this);
    this.shuffleKeys = this.shuffleKeys.bind(this);

    document.onkeypress = (e) => {
      this.testKeypress(e.key);
    };
  }

  componentDidMount() {
    this.nextKey();
  }

  shuffleKeys() {
    const getAverage = (array) => array.reduce((a, b) => a + b, 0) / array.length;
    const duplicate = (array, count) => {
      let result = [];
      for (let i = 0; i < count; i += 1) {
        result = result.concat(array);
      }
      return result;
    };
    this.currentList = duplicate(
      this.userData
        .filter((key) => getAverage(key.history) < 1)
        .sort((a, b) => getAverage(a.history) - getAverage(b.history))
        .slice(0, 10),
      10,
    )
      .concat(this.userData.sort((a, b) => a.lastAttempt - b.lastAttempt).slice(0, 5))
      .concat(duplicate(this.userData.sort((a, b) => b.time - a.time).slice(0, 1), 9))
      .concat(duplicate(this.userData.sort((a, b) => b.time - a.time).slice(1, 3), 4))
      .concat(duplicate(this.userData.sort((a, b) => b.time - a.time).slice(3, 5), 3))
      .map((key) => key.key)
      .sort(() => 0.5 - Math.random());
  }

  nextKey() {
    if (this.currentList.length === 0) {
      this.shuffleKeys();
    }
    this.setState({ currentKey: this.currentList.shift() });
    this.startTime = performance.now();
    this.firstTry = true;
  }

  testKeypress(keypress) {
    const { currentKey } = this.state;
    const keyIndex = this.userData.findIndex((element) => element.key === currentKey);
    if (keypress === currentKey) {
      this.userData[keyIndex].time = performance.now() - this.startTime;
      this.userData[keyIndex].lastAttempt = new Date();
      this.userData[keyIndex].history = [
        this.firstTry ? 1 : 0,
        ...this.userData[keyIndex].history.slice(0, 7),
      ];
      this.nextKey();
    } else {
      this.firstTry = false;
      this.setState({ textColor: 'red' });
      setTimeout(() => { this.setState({ textColor: 'black' }); }, 300);
    }
  }

  render() {
    const { textColor, currentKey } = this.state;
    return (
      <div style={{ color: textColor }}>
        { currentKey }
      </div>
    );
  }
}

export default Display;
