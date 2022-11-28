/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black':'#000000',
      'primary1':"#6c63ff",
      'primary2':'#cbf3f0',
      'secondary1':'#ff9f1c',
      'secondary2':'#ffbf69',
      'red'       :'#ef2d2d',
      'devider':'#F1F2EC',
      'smallText':'#B5985A',
      'green':'#37eb34',
      'selectGrey':'#f1f2ec'
  

    },
    screens:{
      'xs':'440px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
};
