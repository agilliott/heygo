# Heygo Front end test

## Production site

You can view the live site [https://graceful-cuchufli-684282.netlify.app/](https://graceful-cuchufli-684282.netlify.app/)

This is hosted by [Netlify](netlify.com) and has CD on merge to main.

## Local set up

To run this locally you need to set up a .env file that holds the following variables:

```
REACT_APP_RAPID_API_GEODB_URL=https://wft-geo-db.p.rapidapi.com/v1/geo/cities
REACT_APP_RAPID_API_GEODB_KEY=SIGN-UP-FOR-KEY
REACT_APP_RAPID_API_GEODB_HOST=wft-geo-db.p.rapidapi.com
```

For the key, you will need to sign up for free to get a key at [Rapidapi](https://rapidapi.com/wirefreethought/api/geodb-cities/), or contact me to provide you with a temporary one. 

Local dev and cypress testing will not work without this key.

## Libraries

[Material UI](https://mui.com/material-ui/getting-started/overview/) - this component library was chosen because it allows me to move quickly as I am familiar with it and many component library interfaces are similar. It uses emotion for styling which is very diverse and has a good range of components and icons build with a11y in mind.

[Axios](https://axios-http.com/docs/intro) - for a nicer interface for requests than vanilla and we can use `axios-mock-adapter` for easy mocking in unit tests.

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - amazing library for writing tests from the perspective of your users not a machine. This means you are always testing for a11y as you go and allows you to directly map requirements and user stories to tests.]

[React router](https://reactrouter.com/docs/en/v6/getting-started/overview) - again a quick and easy to use library for routing in react.

[Cypress](https://docs.cypress.io/) - familiar e2e test runner and RTL has a cypress wrapper so you can use the same syntax for both unit, integration and e2e tests!

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and typescript.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress`

Launches the cypress test runner for e2e tests. For these tests to work, the site must be running in the development mode first using `npm start` in a separate terminal. Once loaded, select E2E testing and choose a browser to run the tests in, then in specs, run spec.cy.ts.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
