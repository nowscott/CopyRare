if (process.env.NODE_ENV === "development") {

  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev")
  
  setupDevPlatform()
  
  }
  
  const nextConfig = {}
  
  module.exports = nextConfig