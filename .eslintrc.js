module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,  // Allows for the parsing of JSX
    },
  },
  rules:  {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-unused-vars": "off", // check this

    "dot-notation": "off",
    "linebreak-style": "off",
    "semi": "off",
    "no-use-before-define": "off",
    "import/no-extraneous-dependencies": "off", // solving redux dependency issue
    "import/prefer-default-export": "off",
    "arrow-parens": "off",
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "max-len": "off",
    "no-tabs": "off",
    "import/no-unresolved": "off",
    "no-param-reassign": "off", // check this
    "no-return-assign": "off",
    "class-methods-use-this": "off", // check this
    "array-callback-return": "off", // check this
    "no-loop-func": "off", // check this
    "no-self-assign": "off", // check this
    "consistent-return": "off", // check this
    "no-unused-expressions": "off", // check this
    "no-restricted-syntax": "off", // check this - disables for-in related error
    "global-require": "off", // check this
    "import/no-dynamic-require": "off",
    "func-names": "off", // check this, you shouldn't use unnamed functions
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
