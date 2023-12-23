import Game from './features/game'
import { Toaster } from '../components/ui/toaster'
function App() {
	return (
		<div className='w-full'>
			<Game />
			<Toaster />
		</div>
	)
}

export default App
