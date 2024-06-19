# OCR offer analyzer front-end

This repository contains the UI for the Offer analyzer service. The front-end is built with React using the vite template.

## Running the App

```bash
# Development mode (hot reloading)
$ npm run dev

# Preview mode
$ npm run preview
```

## Environment variables

```bash
VITE_API_URL="<Backend-url>"
```

## Building the App

You can build the app using:

```bash
$ npm run build
```

The resulting code will be stored in the `dist` folder

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
