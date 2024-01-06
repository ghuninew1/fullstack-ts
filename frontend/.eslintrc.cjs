module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:tailwindcss/recommended",
        "plugin:prettier/recommended"
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: '@typescript-eslint/parser',
    parserOptions: { 
        ecmaVersion: 'latest', 
        sourceType: 'module',
        "ecmaFeatures": {
            "jsx": true
        } 
    },
    plugins: ["react-refresh", "react", "react-hooks", "tailwindcss"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 2,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-set-state": 1,
        "react/no-unused-prop-types": 1,
        "react/no-unused-state": 1,
        "react/no-danger": 1,
        "react-hooks/exhaustive-deps": 1,
        "react-hooks/rules-of-hooks": 2,
        "tailwindcss/classnames-order": 1,
        "tailwindcss/enforces-negative-arbitrary-values": 1,
        "tailwindcss/enforces-shorthand": 1,
        "tailwindcss/migration-from-tailwind-2": 1,
        "tailwindcss/no-arbitrary-value": 1,
        "tailwindcss/no-custom-classname": 0,
        "tailwindcss/no-contradicting-classname": 2,
    },
};