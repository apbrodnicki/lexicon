import { createTheme } from '@mui/material';
import CourierPrimeBold from '@react-app/assets/font/CourierPrime-Bold.ttf';
import CourierPrimeBoldItalic from '@react-app/assets/font/CourierPrime-BoldItalic.ttf';
import CourierPrimeItalic from '@react-app/assets/font/CourierPrime-Italic.ttf';
import CourierPrimeRegular from '@react-app/assets/font/CourierPrime-Regular.ttf';

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
                @font-face {
                    font-family: 'CourierPrime';
                    src: url('${CourierPrimeRegular}') format('truetype');
                    font-weight: 400;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'CourierPrime';
                    src: url('${CourierPrimeBold}') format('truetype');
                    font-weight: 700;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'CourierPrime';
                    src: url('${CourierPrimeItalic}') format('truetype');
                    font-weight: 400;
                    font-style: italic;
                }
                @font-face {
                    font-family: 'CourierPrime';
                    src: url('${CourierPrimeBoldItalic}') format('truetype');
                    font-weight: 700;
                    font-style: italic;
                }
			`
		}
	},
	typography: {
		fontFamily: 'CourierPrime'
	}
});
