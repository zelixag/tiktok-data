module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        targets: {
          ie: 11
        }
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ];
  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
        loose: true
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['import', { libraryName: 'tezign-ui', libraryDirectory: 'lib', style: true }, 'tezign-ui'],
    [
      'import',
      {
        libraryName: 'tezign-intelligence-common',
        libraryDirectory: 'lib/components',
        style: true
      },
      'tezign-intelligence-common'
    ]
  ];
  return {
    presets,
    plugins,
    ignore: []
  };
};
