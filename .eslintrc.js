module.exports = {
    "extends": [
      "airbnb",
      "plugin:react/recommended",
      "prettier",
      "prettier/react"
  ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "prettier"
    ],
    "env": {
        "browser": true
    },
    "rules": {
        "no-confusing-arrow": "off",
        "react/jsx-filename-extension": "off",
        "react/no-unused-prop-types": "off",
        "no-bitwise": "off",
        "react/forbid-prop-types": "off",
        "quotes": ["error", "single"],
        "semi": ["error", "never"]
    }
};
