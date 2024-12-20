import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const MyPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '#0055A120',
			100: '#0055A130',
			200: '#0055A140',
			300: '#0055A150',
			400: '#0055A170',
			500: '#0055A1',
			600: '#0055A1',
			700: '#0055A1',
			800: '#0055A1',
			900: '#0055A1',
			950: '#0055A1'
		},
		content: {
			background: 'red'
		},
	},
	navigation: {
		item: {
			background: 'red' // Use your custom CSS variable
		}
	},
	colorScheme: {
		light: {
			formField: {
				hoverBorderColor: '{primary.color}'
			}
		},
		dark: {
			formField: {
				hoverBorderColor: '{primary.color}'
			}
		}
	}
});


export const config = {
	theme: {
		preset: MyPreset,
		options: {
			darkModeSelector: '.my-app-dark',
		}
	}
}
