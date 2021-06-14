/** @jsx jsx */

import * as R from 'ramda';

export const capitalizeFirst = x => R.concat(R.toUpper(R.head(x)), R.tail(x));

export const colors = {
  primaryText: '#4A4A4A',
  lightGrayText: 'rgba(200, 200, 200, 0.9)',
  backgroundWhite: '#FcFcFc',
  backgroundShadow: '#EEECE5',
  primaryRed: '#ff4622',
  primaryGreen: '#1A3C34',
  greenButton: '#4dc156',
  progressBar: '#ffd506',
  errorRed: '#e93710',
  lightBorder: '#BCBCBC',
  veryLightGray: 'rgba(0,0,0,0.1)',
  neutralCard: 'transparent',
  correctCard: '#B7F4A9',
  assassinCard: '#FF9F9F'
};

export const findCorrectGuesses = (teamBoard, teamGuesses) => {
  return teamGuesses.filter(guess => teamBoard[guess] === 1);
};

export const findIncorrectGuesses = (teamBoard, teamGuesses) => {
  const incorrect = teamGuesses.filter(guess => teamBoard[guess] === 2);
  return incorrect;
};
