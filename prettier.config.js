module.exports = {
    parser: "typescript",
    trailingComma: "none",
    tabWidth: 4,
    arrowParens: "always",
    proseWrap: "always",
    singleQuote: true,
    overrides: [
        {
            files: "tsconfig.*.json",
            options: { parser: "typescript" },
        },
        {
            files: "*.ts",
            options: { parser: "typescript" },
        },
        {
            files: "*.tsx",
            options: { parser: "typescript" },
        },
        {
            files: "*.json",
            options: { parser: "json" },
        },
        {
            files: "*.md",
            options: { parser: "markdown" },
        },
        {
            files: "*.css",
            options: { parser: "css" },
        },
        {
            files: "*.scss",
            options: { parser: "scss" },
        },
    ],
};