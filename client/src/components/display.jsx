import React from 'react';

const allKeys = [
  'g', 'h', 'b', 'n', 't', 'y', '5', '6', 'f', 'j', 'v',
  // 'm', 'r', 'u', '4', '7', 'd', 'k', 'c', ',', 'e', 'i',
  // '3', '8', 's', 'l', 'x', '.', 'w', 'o', '2', '9', 'a',
  // ';', 'z', '/', 'q', 'p', '1', '0', '`', "'", '[', '-',
  // ']', '=', '\\', 'G', 'H', 'B', 'N', 'T', 'Y', '%', '^',
  // 'F', 'J', 'V', 'M', 'R', 'U', '$', '&', 'D', 'K', 'C',
  // '<', 'E', 'I', '#', '*', 'S', 'L', 'X', '>', 'W', 'O',
  // '@', '(', 'A', ':', 'Z', '?', 'Q', 'P', '!', ')', '~',
  // '"', '{', '_', '}', '+', '|',
];

const startDate = new Date();

const userData = allKeys.map((key, index) => (
  {
    key,
    time: index, // change to zero later
    lastAttempt: new Date(startDate.getDate() + index * 1000),
    history: [1],
  }
));


class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: '',
      textColor: 'black',
      // pressedKey: '',
    };

    this.currentList = [];

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
    const { currentKey } = this.state;
    const getAverage = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    const duplicate = (array, count) => {
      let result = [];
      for (let i = 0; i < count; i += 1) {
        result = result.concat(array);
      }
      return result;
    };

    duplicate( // get 10 of the wrong cards and duplicate them each 10 times
      userData
        .filter((key) => getAverage(key.history) < 1)
        .sort((a, b) => getAverage(a.history) - getAverage(b.history))
        .slice(0, 10),
      10,
    )
      .concat( // get the five oldest cards
        userData.sort((a, b) => a.lastAttempt - b.lastAttempt).slice(0, 5),
      );

    // get slow cards
    // self.to_test = self.c.fetchall()[:5]
    // self.to_test += self.to_test[:1] * 9
    // self.to_test += self.to_test[1:3] * 4
    // self.to_test += self.to_test[3:5] * 3
  }

  nextKey() {
    if (this.currentList.length === 0) {
      this.shuffleKeys();
      // this.currentList = allKeys.slice();
    }
    //  setCurrentList(currentList.slice(1));
    //  setCurrentKey(currentList[0]);
    this.setState({ currentKey: this.currentList.shift() });
    // if there's another card,
    //   reassign currnent card to next card in the deck
    //   set startTime to current time
    // else:
    //   gatherKeys
  }

  testKeypress(keypress) {
    const { currentKey } = this.state;
    // if keypress matches current key, set response time to current time - this.state.startTime
    if (keypress === currentKey) {
      console.log('CORRECT!');
      // setCurrentKey(allKeys.shift());
      this.nextKey();
    } else {
      // else show red for a bit
      this.setState({ textColor: 'red' });
      setTimeout(() => { this.setState({ textColor: 'black' }); }, 300);
    }
  }
  // const [pressedKey, setPressedKey] = useState();
  // const [currentKey, setCurrentKey] = useState();
  // const [textColor, setTextColor] = useState('black');
  // const [currentList, setCurrentList] = useState(allKeys.slice());

  // const nextChar = () => {
  // };

  // useEffect(() => { // merge this back into the on keypress thingy
  // }, [pressedKey]);


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
