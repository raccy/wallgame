import babel from "rollup-plugin-babel";

export default {
    input: "js/main.js",
    output: {
        file: "legacy.js",
        format: 'iife'
    },
    plugins: [
        babel()
    ]
};