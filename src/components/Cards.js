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
  handleAttemptGuess
}) => {
  let color = 'white';
  let opacity = 1;
  let addX = false;
  // edit this for edit words capability
  if (state.showCheatsheet) {
    if (state.userTeam === 'red') {
      if (state.redKey[index] === 1) {
        if (
          state.correctBlueGuesses.includes(index) ||
          state.correctRedGuesses.includes(index)
        ) {
          opacity = 0.1;
        }
        color = colors.correctCard;
      } else if (state.redKey[index] === 2) {
        color = colors.assassinCard;
      } else if (state.redKey[index] === 0) {
        color = colors.neutralCard;
      }
    } else if (state.userTeam === 'blue') {
      if (state.blueKey[index] === 1) {
        color = colors.correctCard;
        if (
          state.correctBlueGuesses.includes(index) ||
          state.correctRedGuesses.includes(index)
        ) {
          opacity = 0.1;
        }
      } else if (state.blueKey[index] === 2) {
        color = colors.assassinCard;
      } else if (state.blueKey[index] === 0) {
        color = colors.neutralCard;
      }
    }
  } else if (
    state.correctBlueGuesses.includes(index) ||
    state.correctRedGuesses.includes(index)
  ) {
    color = colors.correctCard;
    opacity = 0.1;
  } else if (state.incorrectGuesses.includes(index)) {
    color = colors.assassinCard;
    opacity = 0.1;
  } else if (
    (state.redGuesses.includes(index) && state.userTeam === 'red') ||
    (state.blueGuesses.includes(index) && state.userTeam === 'blue')
  ) {
    color = colors.neutralCard;
    opacity = 0.1;
  } else if (
    (state.redGuesses.includes(index) && state.userTeam === 'blue') ||
    (state.blueGuesses.includes(index) && state.userTeam === 'red')
  ) {
    addX = true;
  }

  return (
    <CardUI
      key={index}
      name={cardName}
      color={color}
      opacity={opacity}
      index={index}
      refreshCard={state.refreshCard}
      guessing={state.guessingState}
      addX={addX}
      attemptGuess={() => {
        handleAttemptGuess(index);
      }}
      replaceWord={() => handleReplaceWord(index)}
    />
  );
};

const Cards = props => {
  const { state, handleAttemptGuess, handleReplaceWord } = props;
  return (
    <div css={genericFlex}>
      {state.words.map((word, index) => (
        <Card
          cardName={word}
          index={index}
          state={state}
          handleReplaceWord={handleReplaceWord}
          handleAttemptGuess={handleAttemptGuess}
        />
      ))}
    </div>
  );
};

export default Cards;
