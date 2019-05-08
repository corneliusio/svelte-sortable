module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': global.inProduction
            ? { flexbox: 'no-2009', grid: 'no-autoplace' }
            : false,
        'postcss-nesting': {},
        'postcss-color-function': {}
    }
};
