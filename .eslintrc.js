module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2020": true,
        "jest/globals": true,
    },
    "extends": [
       "eslint:recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "flowtype",
        "jest",
        "prettier"
    ],
    "rules": {
    }
};
