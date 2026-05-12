export default {
  apps: [
    {
      name: "sales-page-builder-frontend",
      script: "npm",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3007
      }
    }
  ]
};
