import ai, { findFirstPair, findKnownPairs } from './ai';

describe('findFirstPair', function() {
  describe('when it finds a match', function() {
    var testCards = [
      {
        id: 1,
        value: 7,
        userId: null,
      },
      {
        id: 2,
        value: 7,
        userId: null,
      },
      {
        id: 3,
        value: 9,
        userId: null,
      }
    ];

    it('returns the correct number of cards', function() {
      var firstPair = findFirstPair(testCards);
      expect(firstPair.length).toEqual(2);
    });

    it('returns the correct cards', function() {
      var firstPair = findFirstPair(testCards);

      expect(firstPair[0].value).toEqual(7);
      expect(firstPair[1].value).toEqual(7);
    });
  });

  describe('when it does not find a match', function() {
    var testCards = [
      {
        id: 1,
        value: 7,
        userId: null,
      },
      {
        id: 2,
        value: 8,
        userId: null,
      },
      {
        id: 3,
        value: 9,
        userId: null,
      }
    ];

    it('returns the correct number of cards', function() {
      var firstPair = findFirstPair(testCards);
      expect(firstPair.length).toEqual(0);
    });
  });
});


describe('findKnownPairs', function() {
  var testCards = [
    // Already Matched Cards
    {
      id: 1,
      userId: 1,
      value: 7
    },
    {
      id: 2,
      userId: 1,
      value: 7,
    },

    // Unmatched but kwnown cards
    {
      id: 3,
      userId: null,
      value: 9
    },
    {
      id: 4,
      userId: null,
      value: 9
    },

    // Random cards
    {
      id: 5,
      userId: null,
      value: 'K'
    },
    {
      id: 6,
      userId: null,
      value: 'Q'
    }
  ];

  it('does not return cards that are already matched', function() {
    var turns = [
      {
        cardOneId: 1,
        cardTwoId: 2,
        userId: 1,
        id: 1,
      },
      {
        cardOneId: 3,
        cardTwoId: 5,
        userId: 2,
        id: 2,
      }
    ];

    var firstPair = findKnownPairs(turns, testCards);
    expect(firstPair.length).toEqual(0);
  });

  it('returns cards that are pairs that have been displayed', function() {
    var turns = [
      {
        cardOneId: 1,
        cardTwoId: 2,
        userId: 1,
        id: 1,
      },
      {
        cardOneId: 3,
        cardTwoId: 5,
        userId: 2,
        id: 2,
      },
      {
        cardOneId: 4,
        cardTwoId: 6,
        userId: 1,
        id: 3,
      }
    ];

    var firstPair = findKnownPairs(turns, testCards);
    expect(firstPair.length).toEqual(2);
  });
});
