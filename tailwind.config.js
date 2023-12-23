import tailwindcss3d from 'tailwindcss-3d'
import plugin from 'tailwindcss/plugin'
import tailwindcssAnimate from 'tailwindcss-animate'

const backfaceVisibility = plugin(function ({ addUtilities }) {
	addUtilities({
		'.backface-visible': {
			'backface-visibility': 'visible',
		},
		'.backface-hidden': {
			'backface-visibility': 'hidden',
		},
	})
})

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./index.html',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		tailwindcss3d({ legacy: true }),
		backfaceVisibility,
		tailwindcssAnimate,
	],
}
