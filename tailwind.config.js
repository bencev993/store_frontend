const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            bgprimary: 'var(--color-bgprimary)',
            bgsecondary: 'var(--color-bgsecondary)',
            bgneutral: 'var(--color-bgneutral)',
            bgaccent: 'var(--color-bgaccent)',
            textprimary: 'var(--color-textprimary)',
            textdefault: 'var(--color-textdefault)',
            textsecondary: 'var(--color-textsecondary)',
            textneutral: 'var(--color-textneutral)',
            linkcolor: 'var(--color-linkcolor)',
            teal: colors.teal,
            'orange': '#FF8B15',
        },
        letterSpacing: {
            widest: '.3em',
        },
        maxHeight: {
            '10': '10%',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            '90': '90%',
            'full': '100%',
        },
        minHeight: {
            '10': '10%',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            '90': '90%',
            'full': '100%',
        },
        // maxWidth: {
        //     '1/4': '25%',
        //     '1/2': '50%',
        //     '3/4': '75%',
        //     'full': '100%',
        // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
