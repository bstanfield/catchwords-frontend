/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { capitalizeFirst, colors } from '../helpers/util';

const cardContainer = (colorToDisplay, opacity) =>
  scale({
    width: '185px',
    height: '85px',
    border: '1px solid #333333',
    borderRadius: '3px',
    backgroundColor: colorToDisplay || 'white',
    margin: '5px 5px',
    boxShadow: '0 2px 5px 0 #cacaca',
    color: `rgba(0,0,0,${opacity})`
  });

const setCardColor = condition => {
  switch (condition) {
    case 0:
      return colors.neutralCard;
    case 1:
      return colors.correctCard;
    case 2:
      return colors.assassinCard;
    default:
      return colors.neutralCard;
  }
};

const cardText = size =>
  scale({
    textAlign: 'center',
    fontSize: size || 22,
    lineHeight: '30px'
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
    color,
    opacity,
    addX,
    guessing
  } = props;

  let size = 28;
  if (name) {
    if (name.length > 0 && name.length <= 8) {
      size = 34;
    } else if (name.length > 8 && name.length <= 12) {
      size = 28;
    } else if (name.length > 12) {
      size = 22;
    }
  }

  return (
    <button
      css={[cardContainer(color, opacity), buttonStyle(selected)]}
      key={index}
      onClick={() => {
        guessing ? attemptGuess() : replaceWord();
      }}
    >
      <h4 css={[cardText(size)]}>{capitalizeFirst(name)}</h4>
      {!guessing && (
        <p style={{ position: 'absolute', bottom: 5, opacity: 0.5 }}>Swap</p>
      )}
      {addX && (
        <strong>
          <p css={{ position: 'absolute', top: 4, right: 8, opacity: 0.8 }}>
            X
          </p>
        </strong>
      )}
      {/* {correctGuessesByBlueTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}><span>🔷</span></p>}
      {correctGuessesByRedTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}><span>🔴</span></p>} */}
    </button>
  );
};

export default Card;
