# fusion-env

A utility library for loading fusion environment variables. Designed for usage in `fusion-cli` and `fusion-core`

# Usage

```js
import getEnv from 'fusion-env';
const {
  rootDir, // process.env.ROOT_DIR || '.'
  env, // process.env.NODE_ENV || 'development'
  prefix, // process.env.ROUTE_PREFIX || ''
  baseAssetPath, // process.env.FRAMEWORK_STATIC_ASSET_PATH || '/_static'
  assetPath, // prefix + baseAssetPath
  cdnUrl, // process.env.CDN_URL || ''
} = getEnv();
```
