import React from 'react'
import { Stage, Layer, Star, Text, Rect } from 'react-konva'
import _ from 'lodash'
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

const ThreeCellGame = () => {
  const [stars, setStars] = React.useState(INITIAL_BOARD())
  const [board, setBorad] = React.useState(INITIAL_BOARD())

  const handleDragStart = (e) => {
    const id = e.target.id()
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        }
      })
    )
  }
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        }
      })
    )
  }

  return (
    <Stage width={320} height={320}>
      <Layer>
        {_.map(board, (cell, idx) => {
          const { id, x, y, width, height, fill } = cell
          return (
            <Rect
              id={id}
              x={x}
              y={y}
              width={width}
              height={height}
              fill={fill}
              shadowBlur={5}
            />
          )
        })}
      </Layer>
    </Stage>
  )
}
export default ThreeCellGame
