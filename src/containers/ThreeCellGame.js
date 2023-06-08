import React, { useEffect, useState } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import _, { uniq } from 'lodash'
import styled from '@emotion/styled'

const INITIAL_BOARD = () => {
  const ROW = 3
  const COL = 3
  return _.flatten(
    _.times(ROW, (row) =>
      _.times(COL, (col) => {
        const pos = [5, 110, 215]
        return {
          id: `${row}-${col}`,
          x: pos[row],
          y: pos[col],
          width: 100,
          height: 100,
          fill: 'white',
          shadowBlur: 10,
        }
      })
    )
  )
}

const createPassword = () => {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';

  var passBase  = alphabet + alphabetUpper + numbers;

  var len = 8; // 8桁
  var password='';

  for (var i = 0; i < len; i++) {
      password += passBase.charAt(Math.floor(Math.random() * passBase.length));
  }

  return password;
}

console.log(createPassword());

const ThreeCellGame = () => {
  const [stars, setStars] = React.useState(INITIAL_BOARD())
  const [board, setBorad] = React.useState(INITIAL_BOARD())
  const [gameStatus, setGameStatus] = useState({
    turn: null,
    board: {},
    result: null,
  })
  const [clientId, setClientId] = useState(createPassword())

  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:3000/websocket/test?clientId=${clientId}`
    )
    console.log(websocket)

    setGameStatus({
      turn: 1,
      board: {
        '0-0': 1,
        '0-1': 2,
        '0-2': 1,
        '1-0': 2,
        '1-1': 1,
        '1-2': 2,
        '2-0': 1,
        '2-1': 2,
        '2-2': 1,
      },
      result: null,
    })
  }, [])

  const handleOnClick = (id) => {}

  return (
    <Stage width={320} height={320}>
      <Layer>
        {_.isNil(gameStatus.turn) ? (
          <Text text="Please wait a moment before starting the game ... " />
        ) : (
          _.map(board, (cell, idx) => {
            const { id, x, y, width, height, fill } = cell
            const val = gameStatus.board[id] ?? 0
            const disp = (() => {
              if (val === 1) return 'X'
              if (val === 2) return 'O'
              return ''
            })()
            return (
              <>
                <Rect
                  key={id}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  shadowBlur={5}
                  onClick={() => handleOnClick(id)}
                />
                <Text
                  key={`value-${id}`}
                  x={x + 30}
                  y={y + 30}
                  text={disp}
                  fontSize={50}
                />
              </>
            )
          })
        )}
      </Layer>
    </Stage>
  )
}
export default ThreeCellGame
