module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.svg',
          '.png',
          '.jpg',
          '.tsx',
          '.ts',
        ],
        alias: {
          components: './app/components/',
          features: './app/features',
          hooks: './app/hooks/',
          models: './app/models/',
          services: './app/services/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
