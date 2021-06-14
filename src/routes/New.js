/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import Network from '../helpers/network';

const header = scale({
  fontFamily: 'Work Sans, system-ui, sans-serif',
  textAlign: 'center',
  fontSize: 36
});

const NewBoard = () => {
  const [url, setUrl] = useState(false);

  const generateBoard = async () => {
    const [response, responseBody] = await Network.get('get-new-board');
    setUrl(responseBody.id);
  };

  useEffect(() => {
    generateBoard();
  }, []);

  return (
    <div>
      <h1 css={header}>Creating board...</h1>
      {url ? <Redirect to={`/board/${url}`} /> : null}
    </div>
  );
};

export default NewBoard;
