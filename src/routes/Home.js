/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { colors } from '../helpers/util';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import Network from '../helpers/network';

const centeredContainer = scale({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  margin: 'auto',
  width: 600,
  maxWidth: '90%',
  height: 'fit-content'
});

const header = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  textAlign: 'center',
  fontSize: 60,
  fontWeight: 'bold'
});

const button = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  maxWidth: 200,
  backgroundColor: colors.greenButton,
  padding: 18,
  fontSize: 22,
  textAlign: 'center',
  color: 'white',
  textDecoration: 'none',
  borderRadius: 4,
  display: 'block',
  margin: 'auto',
  boxShadow: '0 4px 5px 0 #cacaca',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 8px 0 #bfbfbf'
  }
});

const activeGames = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  fontSize: 20
});

const boardsList = scale({
  padding: 20,
  p: {
    opacity: 0.3,
    margin: 0,
    paddingTop: 12,
    paddingLeft: 8
  },
  div: {
    marginBottom: 24
  }
});

function isEmpty(obj) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function timeSince(timeStamp) {
  const now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return `${parseInt(secondsPast)}s`;
  }
  if (secondsPast < 3600) {
    return `${parseInt(secondsPast / 60)}m`;
  }
  if (secondsPast <= 86400) {
    return `${parseInt(secondsPast / 3600)}h`;
  }
  if (secondsPast > 86400) {
    const day = timeStamp.getDate();
    const month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(' ', '');
    const year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ''
        : ` ${timeStamp.getFullYear()}`;
    return `${day} ${month}${year}`;
  }
}

const Home = () => {
  const [boards, setBoards] = useState({});

  const getBoards = async () => {
    const [response, responseBody] = await Network.get('get-boards');
    setBoards(responseBody);
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div css={centeredContainer}>
      <h1 css={header}>Catchwords</h1>
      <a css={button} href="/new">
        Start new game
      </a>
      <br />
      <br />
      <br />
      <div css={activeGames}>
        <p>Active games:</p>
        <hr />
        <div css={boardsList}>
          {!isEmpty(boards) ? (
            Object.keys(boards).map(id => (
              <div>
                <a href={`/board/${id}`}>{id}</a>
                <p>
                  created {timeSince(new Date(boards[id].timestamp))} ago •
                  turn: {boards[id].turnCount}
                </p>
              </div>
            ))
          ) : (
            <p style={{ opacity: 1 }}>🙈 No active games right now!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
