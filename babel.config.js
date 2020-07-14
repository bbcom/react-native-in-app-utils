function babelConfig(api) {
    api.cache(() => process.env.NODE_ENV === 'production');

    const envs = [process.env.NODE_ENV, process.env.BABEL_ENV];

    const presets = [
      'module:metro-react-native-babel-preset',
      '@babel/preset-flow',
    ];

    const plugins = [
      '@babel/plugin-transform-runtime',
    ];

    return { presets, plugins };
}

module.exports = babelConfig;
