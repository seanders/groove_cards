## Groove Cards - Get your groove on.


### Frontend data model

```javascript
var state = {
  cards: {
    byID: {
      'abc123'; {
        value: 2,
        suit: 'heart',
        id: 'abc114r14'
      },

      'xyz5566'; {
        value: 2,
        suit: 'spade',
        id: 'abc114r14'
      }
    },
    allIds: ['abc123', 'xyz5566']
  },

  users: {
    'a12av': {
      name: 'Sean',
      type: 'human'
    },

    '1234ibm': {
      name: 'Hal',
      type: 'ai'
    }
  },

  // Scores can be calculated from the turns.
  // Turns can be calculated from the last turn.
  turns: {
    byID: {
      '1asdf1239': {
        cardOne: 'abc123',
        cardTwo: 'xyz5566',
        id: '1asdf1239',
        userID: 'a12av',
        result: 'match'
      },
      '12a90scvms': {
        cardOne: 'abc123',
        cardTwo: 'xyz5566',
        id: '1asdf1239',
        userID: 'a12av',
        result: 'no-match'
      }
    },
    allIds: ['1asdf1239', '12a90scvms']
  }
}
```
