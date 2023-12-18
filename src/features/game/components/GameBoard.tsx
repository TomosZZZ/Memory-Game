import { useState } from 'react'
import type { Board, CellObj } from '../types/types'

import { images } from '../assets/images'
import image0 from '../assets/images/image-0.jpg'
const GameBoard = () => {
	const [board, setBoard] = useState<Board>([
		[1, 4, 0],
		[5, 2, 0],
		[1, 5, 3],
		[3, 2, 4],
	])

	const [reavealedBoard, setIsReavealedBoard] = useState<boolean[][]>(
		board.map(row => row.map(() => false))
	)
	const [revealedPairs, setRevealedPairs] = useState<boolean[][]>(
		board.map(row => row.map(() => false))
	)
	const [selectedCell, setSelectedCell] = useState<CellObj | undefined>()

	const handleSelectCell = (rowIndex: number, cellIndex: number) => {
		const newBoard = [...reavealedBoard]
		newBoard[rowIndex][cellIndex] = true
		setIsReavealedBoard(newBoard)

		if (!selectedCell) {
			setSelectedCell({ row: rowIndex, col: cellIndex })
			return
		}
		if (selectedCell.row === rowIndex && selectedCell.col === cellIndex) {
			return
		}
		const currentCell = board[rowIndex][cellIndex]

		if (currentCell !== board[selectedCell.row][selectedCell.col]) {
			setTimeout(() => {
				const newBoard = [...reavealedBoard]
				newBoard[rowIndex][cellIndex] = false
				newBoard[selectedCell.row][selectedCell.col] = false
				setIsReavealedBoard(newBoard)
			}, 1000)
		} else {
			setTimeout(() => {
				const newReavealedPairs = [...revealedPairs]
				revealedPairs[rowIndex][cellIndex] = true
				revealedPairs[selectedCell.row][selectedCell.col] = true
				setRevealedPairs(newReavealedPairs)
			}, 1000)
			const hasWon = reavealedBoard.flat().every(cell => cell)
			setTimeout(() => {
				if (hasWon) {
					alert('You have won')
				}
			}, 1000)
		}
		setSelectedCell(undefined)
	}
	return (
		<div className='flex flex-col gap-5 items-center justify-center'>
			{board.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className='flex gap-5'>
						{row.map((cell, cellIndex) => (
							<div
								className={`${
									revealedPairs[rowIndex][cellIndex] && 'opacity-0'
								}  w-[100px] h-[100px] bg-white text-center cursor-pointer flex items-center justify-center text-black`}
								key={cellIndex}
								onClick={() => {
									handleSelectCell(rowIndex, cellIndex)
								}}>
								{cell !== null && (
									<img
										className={`${
											reavealedBoard[rowIndex][cellIndex] ? 'visible' : 'hidden'
										} cursor-pointer`}
										src={images[('image' + cell) as keyof typeof images]}
									/>
								)}
							</div>
						))}
					</div>
				)
			})}
		</div>
	)
}
export default GameBoard
