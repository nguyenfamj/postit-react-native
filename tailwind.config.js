module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans_normal: ['Nunito_400Regular'],
        sans_medium: ['Nunito_500Medium'],
        sans_semibold: ['Nunito_600SemiBold'],
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
