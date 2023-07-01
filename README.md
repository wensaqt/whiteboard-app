# About this project

This project's "raison d'être" is just to train myself to manipulate Vue.js. It's certainly not professional, and the code will probably have to be reworked afterwards.

Update 01/07/23: the project is coming to an end, the week is over. I had set out to build a small back office to store users and, by extension, boards, but I came up against the monster that is MongoDB. If anyone passes by, I'd be happy to have someone explain to me why my /register route isn't working (see server.js and Register.vue), because right now, it's black magic for me. I tested it with Postman, it works; but axios keeps returning a 404 error and I don't know why.

## Todo-list (to resume later, when I have more time on my hands)

- Fix the app's use on Chrome, which has many display bugs for some reason
- Ensure that resizing a note does not overflow the board
- Add image placeholders
- Make the app fully responsive
- Add data to users' collection to save boards & there components 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
