import { useCallback, useEffect, useState } from 'react'
import type { Board, CellObj } from '../types/types'
import { Button } from '../../../../components/ui/button'
import { images } from '../assets/images'
import { useToast } from '../../../../components/ui/use-toast'
type GameBoardProps = {
	boardSize: number[]
	onCountScore: () => void
	onResetScore: () => void
	score: number
}

const GameBoard = (props: GameBoardProps) => {
	const { boardSize, onCountScore, onResetScore } = props
	const { toast } = useToast()
	const [loading, setLoading] = useState(true)
	//Board which contains pairs ids
	const [board, setBoard] = useState<Board>([
		[1, 2, 3, 4],
		[1, 2, 3, 4],
		[0, 0, 5, 5],
	])

	//Board which contains boolean values to know if a cell is revealed or not
	const [reavealedBoard, setIsReavealedBoard] = useState<boolean[][]>(
		board.map(row => row.map(() => false))
	)

	//Board which contains boolean values to know if a pair is revealed or not
	const [revealedPairs, setRevealedPairs] = useState<boolean[][]>(
		board.map(row => row.map(() => false))
	)

	const [selectedCell, setSelectedCell] = useState<CellObj | undefined>()

	const shuffleArray = (array: number[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
		return array
	}
	const resetGame = () => {
		setLoading(true)
		setSelectedCell(undefined)
		generateBoard(boardSize[0], boardSize[1])
		onResetScore()
		setLoading(false)
	}
	const generateBoard = useCallback((rows: number, cols: number) => {
		const generatedBoard: Board = []
		for (let i = 0; i < rows; i++) {
			generatedBoard.push([])
			for (let j = 0; j < cols; j++) {
				generatedBoard[i].push(null)
			}
		}
		const pairsNumber = (rows * cols) / 2
		const pairs = []
		for (let i = 0; i < pairsNumber; i++) {
			pairs.push(i)
			pairs.push(i)
		}

		const shuffledPairs = shuffleArray(pairs)

		let index = 0
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				generatedBoard[i][j] = shuffledPairs[index]
				index++
			}
		}
		setBoard(generatedBoard)
		const newRevealedBoard = generatedBoard.map(row => row.map(() => false))
		setIsReavealedBoard(newRevealedBoard)
		const newRevealedPairs = generatedBoard.map(row => row.map(() => false))
		setRevealedPairs(newRevealedPairs)
	}, [])

	useEffect(() => {
		setLoading(true)
		generateBoard(boardSize[0], boardSize[1])
		setLoading(false)
	}, [boardSize, generateBoard])

	const handleSelectCell = (rowIndex: number, cellIndex: number) => {
		const newBoard = [...reavealedBoard]
		//Reaveal card
		newBoard[rowIndex][cellIndex] = true
		setIsReavealedBoard(newBoard)

		//if it first click set selected cell to it
		if (!selectedCell) {
			setSelectedCell({ row: rowIndex, col: cellIndex })
			return
		}
		//if u click same card second time return
		if (selectedCell.row === rowIndex && selectedCell.col === cellIndex) {
			return
		}

		//second click
		const currentCell = board[rowIndex][cellIndex]
		//if u click on not matching card hide after 1s
		if (currentCell !== board[selectedCell.row][selectedCell.col]) {
			console.log('Inne')
			setTimeout(() => {
				const newBoard = [...reavealedBoard]
				newBoard[rowIndex][cellIndex] = false
				newBoard[selectedCell.row][selectedCell.col] = false
				setIsReavealedBoard(newBoard)
			}, 1000)
		} else {
			//if u click on matching card reveal pair and hide them after 1s

			setTimeout(() => {
				const newReavealedPairs = [...revealedPairs]

				newReavealedPairs[rowIndex][cellIndex] = true
				newReavealedPairs[selectedCell.row][selectedCell.col] = true
				console.log('same')
				setRevealedPairs(newReavealedPairs)
			}, 1000)
			const hasWon = reavealedBoard.flat().every(cell => cell)
			setTimeout(() => {
				if (hasWon) {
					toast({
						title: 'Victory!',
						description: `You have won in ${props.score + 1} moves`,
					})
					setRevealedPairs(prev => prev.map(row => row.map(() => false)))
				}
			}, 1000)
		}
		onCountScore()
		setSelectedCell(undefined)
	}

	return (
		<>
			{!loading && (
				<div className='flex flex-col gap-5 items-center justify-center'>
					{board.map((row, rowIndex) => {
						return (
							<div key={rowIndex} className='flex gap-5'>
								{row.map((cell, cellIndex) => {
									return (
										<div
											className={`${
												revealedPairs[rowIndex][cellIndex] &&
												'opacity-0 cursor-auto'
											}  w-[100px] h-[100px]  text-center cursor-pointer flex items-center justify-center text-black relative transition-all duration-300 ease-linear`}
											key={cellIndex}
											onClick={() => {
												handleSelectCell(rowIndex, cellIndex)
											}}>
											<div
												className={`w-full h-full absolute transform-style-3d transition-all duration-500 ease-linear  ${
													reavealedBoard[rowIndex][cellIndex]
														? 'rotate-y-180'
														: ''
												}`}>
												<div className='absolute w-full h-full backface-hidden bg-white'></div>
												<div className='absolute w-full h-full backface-hidden rotate-y-180'>
													{cell !== null && (
														<img
															src={
																images[('image' + cell) as keyof typeof images]
															}
														/>
													)}
												</div>
											</div>
										</div>
									)
								})}
							</div>
						)
					})}
					<div className='mt-10'>
						<Button
							className='text-xl p-6 border-2 border-yellow-400 bg-transparent text-yellow-400 hover:bg-black hover:text-white transition-all duration-100 ease-linear'
							onClick={resetGame}>
							Reset
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
export default GameBoard
