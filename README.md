# US Civic test simple quiz.

It offers you one of the 128 example questions, but unable to check the answer - this is on your own. Mark the answers you feel you answered wrong with "wrong" button to get to them later.

This is purely hello world, do not expect anything from it. 


--------


# New react project: 
```shell
$ npm create vite@latest quiz-app -- --template react

$ cd quiz-app

$ npm install

$ npm run dev
```
----
## Simple regex to parse the quiz pdf into a map

Apply them one by one, fix new lines if needed
```
#headers
^(\d)+\.\s+(.+)$

{\n\tid: $1,\n\tquestion: '$2',\n\tanswers: [

#questions
# 128-q test
•\s+(.+)$ 
# 100-q test
^\s+▪\s+(.+)$

\t\t'$1',

# closing
,\n{
\n\t]\n},\n{
```


----

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
