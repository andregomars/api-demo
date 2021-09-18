/* eslint-disable no-process-env */
/**
 * Define your own custom global variables here
 * They can be hard-coded or taken from ENV variables
 * These variables will appear in a global 'Beyond' namespace
 */

export default {
  app_name: `api-demo`,
  spotify: {
    oauth_url: process.env.SPOTIFY_OAUTH_URL,
    client_id: process.env.SPOTIFY_OAUTH_CLIENT_ID,
    client_secret: process.env.SPOTIFY_OAUTH_CLIENT_SECRET,
    search_api_url: process.env.SPOTIFY_SEARCH_API_URL,
  }
};