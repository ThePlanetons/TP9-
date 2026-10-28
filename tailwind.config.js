// export default {
//   content: ['./index.html', './src/**/*.{ts,tsx}'],
//   theme: {
//     extend: {
//       fontFamily: { display: ['Rubik', 'Inter', 'sans-serif'], sans: ['"Space Grotesk"', 'Inter', 'sans-serif'] },
//       colors: {
//         // Bright brand orange: big display type, graphics, backgrounds that carry black text.
//         brand: '#F64618',
//         // Slightly deeper orange for SMALL text and white-on-orange buttons: 5.1:1 on white (brand orange is only 3.6:1).
//         'brand-deep': '#CC360D',
//       },
//     },
//   },
// }
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Rubik', 'Inter', 'sans-serif'], sans: ['"Space Grotesk"', 'Inter', 'sans-serif'] },
      colors: {
        // THE one brand orange. Use it everywhere (backgrounds, buttons, accents, text).
        brand: '#F64618',
      },
    },
  },
}
