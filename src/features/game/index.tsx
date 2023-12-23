import GameBoard from './components/GameBoard'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select'
import { useState } from 'react'

const Game = () => {
	const [boardSize, setBoardSize] = useState<number[]>([3, 4])
	const [score, setScore] = useState<number>(0)

	const difficultyHandler = (difficulty: string) => {
		switch (difficulty) {
			case 'easy':
				setBoardSize([2, 4])
				break
			case 'medium':
				setBoardSize([3, 4])
				break
			case 'hard':
				setBoardSize([4, 4])
				break
			default:
				setBoardSize([3, 4])
				break
		}
	}
	const countScoreHandler = () => {
		setScore(prev => {
			return prev + 1
		})
	}
	const resetScoreHandler = () => {
		setScore(0)
	}

	return (
		<div className='flex items-center justify-center flex-col h-[100vh]'>
			<h1 className='text-white text-4xl mb-20 font-bold'>{`Score: ${score}`}</h1>
			<div className='min-h-[30vh]  flex items-center flex-col justify-between'>
				<div className='relative mb-10'>
					<Select onValueChange={difficultyHandler}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Difficulty' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem
								onClick={() => {
									difficultyHandler('easy')
									console.log('es')
								}}
								value='easy'>
								Easy
							</SelectItem>
							<SelectItem
								onClick={() => {
									difficultyHandler('medium')
								}}
								value='medium'>
								Medium
							</SelectItem>
							<SelectItem
								onClick={() => {
									difficultyHandler('hard')
								}}
								value='hard'>
								Hard
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<GameBoard
						score={score}
						onResetScore={resetScoreHandler}
						onCountScore={countScoreHandler}
						boardSize={boardSize}
					/>
				</div>
			</div>
		</div>
	)
}
export default Game
