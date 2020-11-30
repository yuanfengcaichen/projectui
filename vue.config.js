module.exports = {
  "configureWebpack": {
    "resolve": {
      "alias": {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "views":"@/views",
        "network": "@/network",
        "router": "@/router",
        "store": "@/store"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}