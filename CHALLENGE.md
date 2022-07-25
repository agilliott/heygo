# Virtualtrips Front end code challenge

This challenge has two parts:

1. Written answers to [Questions](./QUESTIONS.md)
2. Building a React.js app to search for and display locations

We're looking for elegant, clean solutions. Try to think of and handle possible edge cases.

This challenge is sent to experienced developers and newcomers alike. Developers who are familiar with the technologies can complete this within an hour, those who are less familiar will take longer. We suggest spending a maximum of 2 hours on this challenge, the objective is to demonstrate you think through a problem.

## Part 1: Questions

The goal here is to demonstrate your JavaScript knowledge and to write your answers as clearly as possible.

## Part 2: The React.js app to search for and display results

The objective is to provide a user interface to search for and display points of interest. You will not be required to code the backend - the docs for a pre-made backend are detailed below.

### Acceptance criteria

- Can type a query into a search box
- As you type, the relevant results are displayed dynamically below the input
- When you click on a result, we navigate to a new screen which shows the details of the location including a map view

### Backend documentation

---

Url: `https://heygo-code-challenge.herokuapp.com/`

---

Locations typeahead (quickly get a list of locations that match a query)

Path: `/locations`

Query parameters:

- `q` - filter results by name e.g. `/locations?q=lon` would filter locations starting with `lon`

Returns array of locations with `name` and `id`

---

Location details (get full location details with coords)

Path: `/locations/:id`

Params:

- `id` - the id of the location

Returns full location object

---

## Rules

All work should be committed into a fork of this repo or pushed to a publicly-accessible repo.

Please write each response for part 1 under the relevant question in the [Questions](./QUESTIONS.md) file.

Feel free to organize your code for part 2 into this directory however you like.

You'll get bonus points if you

- Provide good documentation
- Add tests your code
- Deploy your code to production for the Virtualtrips team to use.

Good luck!
