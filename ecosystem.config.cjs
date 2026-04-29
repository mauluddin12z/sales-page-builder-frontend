module.exports = {
    apps: [
        {
            name: "api-sales-page-builder-frontend",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3007
            }
        }
    ]
}