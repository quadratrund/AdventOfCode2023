const { readFileSync } = require('fs');

const buffer = readFileSync('input-day7.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const HandTypes = {
  FiveOfAKind: 0,
  FourOfAKind: 1,
  FullHouse: 2,
  ThreeOfAKind: 3,
  TwoPair: 4,
  OnePair: 5,
  HighCard: 6
}

const valueOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

function getCardRanks(cards) {
  return cards.split('').map(value => valueOrder.indexOf(value));
}

function getHandType(cards) {
  cards = cards.split('');
  const cardValues = Array.from(new Set(cards));
  if (cardValues.length === 1) {
    return HandTypes.FiveOfAKind;
  } else if (cardValues.length === 5) {
    return HandTypes.HighCard;
  }
  const valueCounts = cardValues.map(value => cards.filter(x => x === value).length);
  if (valueCounts.includes(4)) {
    return HandTypes.FourOfAKind;
  } else if (valueCounts.includes(3)) {
    if (valueCounts.includes(2)) {
      return HandTypes.FullHouse;
    } else {
      return HandTypes.ThreeOfAKind;
    }
  } else if (valueCounts.filter(x => x == 2).length === 2) {
    return HandTypes.TwoPair;
  } else {
    return HandTypes.OnePair;
  }
}

function compareHands(a, b) {
  return a.type - b.type || (a.cardRanks.map((x, i) => x - b.cardRanks[i]).find(x => x !== 0) ?? 0);
}

const hands = text.map(line => {
  const [ cards, bid ] = line.split(' ');
  return { cards, bid: Number(bid), type: getHandType(cards), cardRanks: getCardRanks(cards) };
});
//console.log(hands);
hands.sort(compareHands);
console.log(hands);
const winnings = hands.map((x, i) => x.bid * (hands.length - i));
console.log(winnings);
const total = winnings.reduce((a, b) => a + b);
console.log(total);