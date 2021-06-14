/** @jsx jsx */

import { jsx } from '@emotion/core';
import { genericFlex } from '../style/flex';
import { colors } from '../helpers/util';
import CardUI from './Card';

const Card = ({
  cardName,
  index,
  state,
  handleReplaceWord,
  handleAttemptGuess,
  isUserGivingClue
}) => {
  let cardType = '';
  let guessedByUser = false;
  let guessedByOtherTeam = false;

  // edit this for edit words capability
  if (
    state.correctBlueGuesses.includes(index) ||
    state.blueGuesses.includes(index) ||
    state.incorrectGuesses.includes(index)
  ) {
    if (state.userTeam === 'blue') {
      guessedByUser = true;
    } else {
      guessedByOtherTeam = true;
    }
  }

  if (
    state.correctRedGuesses.includes(index) ||
    state.redGuesses.includes(index) ||
    state.incorrectGuesses.includes(index)
  ) {
    if (state.userTeam === 'red') {
      guessedByUser = true;
    } else {
      guessedByOtherTeam = true;
    }
  }
  if (state.showCheatsheet) {
    if (state.userTeam === 'red') {
      if (state.redKey[index] === 1) {
        cardType = 'correct';
      } else if (state.redKey[index] === 2) {
        cardType = 'assassin';
      } else if (state.redKey[index] === 0) {
        cardType = 'neutral';
      }
    } else if (state.userTeam === 'blue') {
      if (state.blueKey[index] === 1) {
        cardType = 'correct';
      } else if (state.blueKey[index] === 2) {
        cardType = 'assassin';
      } else if (state.blueKey[index] === 0) {
        cardType = 'neutral';
      }
    }
  } else if (
    state.correctBlueGuesses.includes(index) ||
    state.correctRedGuesses.includes(index)
  ) {
    cardType = 'correct';
  } else if (state.incorrectGuesses.includes(index)) {
    cardType = 'assassin';
  } else if (
    state.redGuesses.includes(index) ||
    state.blueGuesses.includes(index)
  ) {
    cardType = 'neutral';
  }

  // states:
  // correct guess this turn - green background, little text, checkmark + name
  // correct guess last turn - white bg, little text, checkmark + name
  // incorrect guess - gray background, little text, x + name
  // not guessed
  // end game card

  return (
    <CardUI
      cheatsheetMode={state.showCheatsheet}
      key={index}
      name={cardName}
      index={index}
      refreshCard={state.refreshCard}
      guessing={state.guessingState}
      isUserGivingClue={isUserGivingClue}
      guessedByUser={guessedByUser}
      guessedByOtherTeam={guessedByOtherTeam}
      cardType={cardType}
      attemptGuess={() => {
        handleAttemptGuess(index);
      }}
      replaceWord={() => handleReplaceWord(index)}
    />
  );
};

const Cards = props => {
  const {
    state,
    handleAttemptGuess,
    handleReplaceWord,
    isUserGivingClue
  } = props;
  return (
    <div css={genericFlex}>
      {state.words.map((word, index) => (
        <Card
          cardName={word}
          index={index}
          state={state}
          handleReplaceWord={handleReplaceWord}
          handleAttemptGuess={handleAttemptGuess}
          isUserGivingClue={isUserGivingClue}
        />
      ))}
    </div>
  );
};

export default Cards;
