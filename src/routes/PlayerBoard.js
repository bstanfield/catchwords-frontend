/** @jsx jsx */

import { useEffect, useReducer } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import {
  findCorrectGuesses,
  findIncorrectGuesses,
  colors
} from '../helpers/util';

import Cards from '../components/Cards';
import Network from '../helpers/network';
import { array } from 'prop-types';

const primaryContainer = scale({
  maxWidth: '1000px',
  color: '#333333',
  margin: 'auto',
  'h1, h2, h3, h4, p, a': {
    fontFamily: 'Fira Sans, system-ui !important',
    margin: 0
  },
  h4: {
    fontWeight: 600
  }
});

const topContainer = scale({
  position: 'relative',
  paddingTop: '12px',
  paddingBottom: '12px',
  marginBottom: '16px',
  borderBottom: '2px solid #e0e0e0',
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const pageFade = scale({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  width: '100vw',
  height: '100%',
  zIndex: 9999
});

const modal = scale({
  borderRadius: '6px',
  backgroundColor: 'white',
  padding: '20px 40px'
});

const absolutePassTurn = guesses =>
  scale({
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '3px',
    marginLeft: '16px',
    fontSize: '22px',
    opacity: guesses > 0 ? 1 : 0.5,
    '&:hover': {
      opacity: 1
    }
  });

const buttonStyle = isSelected =>
  scale({
    padding: '8px 18px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    margin: '20px 20px 20px 0',
    fontSize: '20px',
    backgroundColor: isSelected ? '#2ef72e' : '#eeeeee',
    '&:hover': {
      backgroundColor: isSelected ? '#2ef72e' : '#d0d0d0',
      opacity: isSelected ? 0.7 : 1
    }
  });

const initialState = {
  words: [],
  id: '',
  localTurnCount: 1,
  showModal: false,
  currentTurnGuesses: 0,
  editWordsMode: false,
  refreshCard: 0,
  incorrectGuesses: [],
  guessingState: true, // false = word swap mode
  userTeam: null,
  redKey: [],
  blueKey: [],
  redGuesses: [],
  blueGuesses: [],
  correctRedGuesses: [],
  correctBlueGuesses: [],
  showCheatsheet: false
};

function boardReducer(state, action) {
  const swapWords = (state, action) => {
    state.words.splice(action.index, 1, action.word);
    return {
      ...state,
      words: state.words
    };
  };

  switch (action.type) {
    case 'update':
      return { ...state, ...action.state };
    case 'reset_turn_guesses':
      return { ...state, currentTurnGuesses: 0 };
    case 'increment_guesses':
      return { ...state, currentTurnGuesses: state.currentTurnGuesses + 1 };
    case 'increment_turn':
      return { ...state, localTurnCount: state.localTurnCount + 1 };
    case 'toggle_modal':
      return { ...state, showModal: !state.showModal };
    case 'toggle_swap_mode':
      return {
        ...state,
        editWordsMode: !state.editWordsMode,
        guessingState: !state.guessingState
      };
    case 'swap_word':
      return swapWords(state, action);
    case 'toggle_cheatsheet':
      return { ...state, showCheatsheet: !state.showCheatsheet };
    case 'set_team':
      return { ...state, userTeam: action.team };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

const dot = isSelected => ({
  margin: 3,
  backgroundColor: isSelected ? 'green' : '#ccc',
  width: 10,
  height: 10,
  borderRadius: 5
});

const loadBoard = async (boardId, dispatch) => {
  const [response, responseBody] = await Network.get(
    `get-existing-board/${boardId}`
  );
  const {
    words,
    red,
    blue,
    redGuesses,
    blueGuesses,
    turnCount,
    id
  } = responseBody;
  const allIncorrectGuesses = findIncorrectGuesses(
    red,
    blueGuesses || []
  ).concat(findIncorrectGuesses(blue, redGuesses || []));
  dispatch({
    type: 'update',
    state: {
      words,
      id,
      localTurnCount: turnCount,
      incorrectGuesses: allIncorrectGuesses,
      redKey: red,
      blueKey: blue,
      redGuesses: redGuesses || [],
      blueGuesses: blueGuesses || [],
      correctRedGuesses: findCorrectGuesses(blue, redGuesses || []),
      correctBlueGuesses: findCorrectGuesses(red, blueGuesses || [])
    }
  });
};

const updateBoard = async (boardId, dispatch) => {
  const [response, responseBody] = await Network.get(
    `get-existing-board/${boardId}`
  );
  const { red, blue, redGuesses, blueGuesses, turnCount } = responseBody;
  const allIncorrectGuesses = findIncorrectGuesses(
    red,
    blueGuesses || []
  ).concat(findIncorrectGuesses(blue, redGuesses || []));
  dispatch({
    type: 'update',
    state: {
      localTurnCount: turnCount,
      incorrectGuesses: allIncorrectGuesses,
      redGuesses: redGuesses || [],
      blueGuesses: blueGuesses || [],
      correctRedGuesses: findCorrectGuesses(blue, redGuesses || []),
      correctBlueGuesses: findCorrectGuesses(red, blueGuesses || [])
    }
  });
};

const PlayerBoard = ({ match }) => {
  // STATE -----
  // Board state
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // END STATE -----

  const {
    localTurnCount,
    showModal,
    currentTurnGuesses,
    id,
    editWordsMode,
    refreshCard,
    userTeam,
    redKey,
    blueKey,
    redGuesses,
    blueGuesses,
    showCheatsheet
  } = state;

  // Loads board
  useEffect(() => {
    loadBoard(match.params.id, dispatch);
  }, [match.params.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateBoard(match.params.id, dispatch);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (localTurnCount === 1) return;
    dispatch({ type: 'toggle_modal' });
  }, [localTurnCount, userTeam]);

  useEffect(() => {
    dispatch({
      type: 'update',
      state: {
        correctBlueGuesses: findCorrectGuesses(redKey, blueGuesses || []),
        correctRedGuesses: findCorrectGuesses(blueKey, redGuesses || [])
      }
    });
  }, [blueKey, redKey, redGuesses, blueGuesses]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        dispatch({ type: 'toggle_modal' });
      }, 1500);
    }
  }, [showModal]);

  const turnText = (() => {
    // blue gives clue
    let text = '';

    if (!userTeam) {
      return 'Choose your team...';
    }

    if (localTurnCount % 2 === 0) {
      if (userTeam === 'blue') {
        text = '🔷 Give a clue!';
      } else {
        text = "🔴 It's your turn to guess!";
      }
    }
    // red gives clue
    else if (userTeam === 'red') {
      text = '🔴 Give a clue!';
    } else {
      text = "🔷 It's your turn to guess!";
    }
    return text;
  })();

  // handle edit words
  const handleEditWords = () => {
    dispatch({ type: 'toggle_swap_mode' });
  };

  // handle reset board
  const handleResetAnswers = () => {
    dispatch({ type: 'reset_turn_guesses' });

    // sets turn count to 1 and current turn guesses to none
    Network.post('update-turn', {
      id,
      turnCount: 1
    });

    // resets player guesses
    Network.post('update-guesses', {
      id,
      team: 'red',
      guesses: []
    });
    Network.post('update-guesses', {
      id,
      team: 'blue',
      guesses: []
    });
  };

  const handleAttemptGuess = index => {
    if (state.localTurnCount % 2 === 0) {
      // RED TEAM
      const newArr = state.redGuesses.concat([index]);
      dispatch({ type: 'update', state: { redGuesses: newArr } });
      Network.post('update-guesses', {
        id: state.id,
        team: 'red',
        guesses: newArr
      });
    } else {
      // BLUE TEAM
      const newArr = state.blueGuesses.concat([index]);
      dispatch({ type: 'update', state: { blueGuesses: newArr } });
      Network.post('update-guesses', {
        id: state.id,
        team: 'blue',
        guesses: newArr
      });
    }

    dispatch({ type: 'increment_guesses' });
  };

  const handleReplaceWord = async index => {
    const [response, responseBody] = await Network.get(
      `swap-word/${match.params.id}/${index}`
    );
    dispatch({
      type: 'swap_word',
      word: responseBody.word,
      index
    });
  };

  const Dots = ({ total, turnCount, className }) => {
    const totalDots = new Array(total).fill(false);
    const allDots = totalDots.map((dot, index) => index < turnCount);
    return (
      <div css={{ display: 'flex', flexWrap: 'nowrap' }} className={className}>
        {allDots.map(isSelected => (
          <div css={dot(isSelected)} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {!userTeam && (
        <div css={pageFade}>
          <div css={modal}>
            <h1 style={{ textAlign: 'center' }}>Join a team</h1>
            <button
              css={buttonStyle()}
              onClick={() => {
                // sets turn count to 1 and current turn guesses to none
                dispatch({ type: 'set_team', team: 'red' });
              }}
            >
              🔴 Red team
            </button>
            <button
              css={buttonStyle()}
              onClick={() => {
                // sets turn count to 1 and current turn guesses to none
                dispatch({ type: 'set_team', team: 'blue' });
              }}
            >
              🔷 Blue team
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div css={pageFade}>
          <div css={modal}>
            <p>Turn {localTurnCount}/7</p>
            <h1>{turnText}</h1>
          </div>
        </div>
      )}

      <div css={primaryContainer}>
        <div css={topContainer}>
          <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>
            {turnText}
          </h2>
          <div
            css={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Dots
              turnCount={localTurnCount}
              total={7}
              css={{ marginRight: 8 }}
            />
            <strong>
              <p>{localTurnCount}/7</p>
            </strong>
            <button
              css={absolutePassTurn(currentTurnGuesses)}
              onClick={() => {
                Network.post(`update-turn`, {
                  id,
                  turnCount: localTurnCount + 1
                });
                dispatch({ type: 'increment_turn' });
                dispatch({ type: 'reset_turn_guesses' });
              }}
            >
              End turn
            </button>
          </div>
        </div>

        <Cards
          refreshCard={refreshCard}
          state={state}
          dispatch={dispatch}
          handleAttemptGuess={handleAttemptGuess}
          handleReplaceWord={handleReplaceWord}
        />

        {/* BOTTOM ACTIONS */}
        {userTeam === 'red' ? (
          <button
            css={buttonStyle(userTeam === 'red' && showCheatsheet)}
            onClick={() => dispatch({ type: 'toggle_cheatsheet' })}
          >
            <span role="img" aria-label="Red circle">
              🔴
            </span>{' '}
            Red cheatsheet
          </button>
        ) : (
          <button
            css={buttonStyle(userTeam === 'blue' && showCheatsheet)}
            onClick={() => dispatch({ type: 'toggle_cheatsheet' })}
          >
            <span role="img" aria-label="Blue diamond">
              🔷
            </span>{' '}
            Blue cheatsheet
          </button>
        )}

        <button
          css={buttonStyle(editWordsMode)}
          onClick={() => handleEditWords()}
        >
          Edit words
        </button>

        <button css={buttonStyle()} onClick={() => handleResetAnswers()}>
          Reset answers
        </button>

        <Link to="/new">
          <button css={buttonStyle()}>New board</button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
