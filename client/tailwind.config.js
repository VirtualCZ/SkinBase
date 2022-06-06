const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    borderRadius: {
      'cool' : '10px',
      'cool-sm' : '5px',
      ...defaultTheme.borderRadius,
    },
    extend: {
      colors: {
        
        'background': '#272B30',
        'card': '#1C1E22',
        'Mil-Spec': '#4B69FF',
        'Restricted': '#8847FF',
        'Classified': '#D32EE6',
        'Covert': '#EB4B4B',
        'Special': '#FFD700',
        'cardWear': '#3E4348',
        'buy': '#62C462',
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
}