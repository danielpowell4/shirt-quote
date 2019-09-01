This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Shirt Quote (Builder)
#### Generatin' Quotes

- Perhaps a grid of items with pic, name, description
- Click to get quote

## Where do I find the inventory and price breaks?

In `src/lib.js` see garmets

## How does price calculator work?

See `src/lib.js` look for `calculateQuote`

Taking inputs from the form, it interpolates the price between the listed breaks atop the file.

It then returns:

```js
  baseColorPrice +                           // $15 +
  perGarmetPrice * numShirts +               // $5 * 15 shirts +
  perSideColorPrice * numSides * numShirts   // $1 * 2 locations * 15 shirts
```

### How does the form work?

See [Formik](https://jaredpalmer.com/formik/)

# Working with this repo

## Available Scripts

In the project directory, you can run:

### `npm start` / `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm deploy` / `yarn deploy`

Creates production build and deploys to gh-pages (assuming you have write permission to repo)
