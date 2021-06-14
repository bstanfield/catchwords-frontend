/** @jsx jsx */

import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { capitalizeFirst, colors } from '../helpers/util';

const cardContainer = (colorToDisplay, opacity) =>
  scale({
    width: '185px',
    height: '85px',
    border: '1px solid #BABABA',
    borderRadius: '4px',
    backgroundColor: colorToDisplay || 'white',
    margin: '5px 5px',
    boxShadow: '0 1px 6px 0 #ddd',
    color: `rgba(0,0,0,${opacity})`
  });

const cardText = (size, cheatsheetMode) =>
  scale({
    textAlign: 'center',
    fontSize: size || 22,
    lineHeight: '30px',
    color: '#333333',
    opacity: cheatsheetMode ? 0.5 : 1
  });

const buttonStyle = selected =>
  scale({
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    transition: '300ms opacity',
    backgroundColor: selected && colors.neutralCard,
    border: selected && '1px solid green',
    '&:hover': {
      opacity: 0.8
    }
  });

const Card = props => {
  const {
    name,
    index,
    replaceWord,
    attemptGuess,
    selected,
    opacity,
    guessedByUser,
    guessedByOtherTeam,
    guessing,
    isUserGivingClue,
    cardType,
    cheatsheetMode
  } = props;

  const backgroundColor =
    cardType === 'neutral' && !guessedByOtherTeam
      ? colors.neutralCard
      : cardType === 'correct' && !guessedByUser && !guessedByOtherTeam
      ? colors.correctCard
      : cardType === 'assassin'
      ? colors.assassinCard
      : 'white';

  let size = 26;
  if (name) {
    if (name.length > 0 && name.length <= 8) {
      size = 32;
    } else if (name.length > 8 && name.length <= 12) {
      size = 26;
    } else if (name.length > 12) {
      size = 20;
    }
  }

  return (
    <button
      css={[
        cardContainer(backgroundColor, opacity),
        buttonStyle(selected),
        isUserGivingClue && { cursor: 'not-allowed' }
      ]}
      key={index}
      onClick={() =>
        !isUserGivingClue && guessing
          ? attemptGuess()
          : !guessing
          ? replaceWord()
          : null
      }
    >
      {guessedByOtherTeam && cardType === 'neutral' && (
        <strong>
          <p css={{ position: 'absolute', top: 4, left: 8, opacity: 0.6 }}>✗</p>
        </strong>
      )}
      {guessedByUser || (guessedByOtherTeam && cardType === 'correct') ? (
        <strong>
          <p css={{ position: 'absolute', top: 4, left: 8, opacity: 0.6 }}>
            {cardType === 'correct' ? '✓' : '✗'} {capitalizeFirst(name)}
          </p>
        </strong>
      ) : (
        <Fragment>
          <h4 css={[cardText(size, cardType === 'neutral' && cheatsheetMode)]}>
            {capitalizeFirst(name)}
          </h4>
          {!guessing && (
            <p style={{ position: 'absolute', bottom: 5, opacity: 0.5 }}>
              Swap
            </p>
          )}
        </Fragment>
      )}
      {/* {correctGuessesByBlueTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}><span>🔷</span></p>}
      {correctGuessesByRedTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}><span>🔴</span></p>} */}
    </button>
  );
};

export default Card;
