/* eslint-env node */
const assert = require('assert');

module.exports = () => {
  const rootDir = load('ROOT_DIR', '.');
  const env = load('NODE_ENV', 'development');
  if (!(env === 'development' || env === 'production')) {
    throw new Error(`Invalid NODE_ENV loaded: ${env}.`);
  }
  const prefix = load('ROUTE_PREFIX', '');
  assert(!prefix.endsWith('/'), 'ROUTE_PREFIX must not end with /');
  const baseAssetPath = load('FRAMEWORK_STATIC_ASSET_PATH', `/_static`);
  assert(
    !baseAssetPath.endsWith('/'),
    'FRAMEWORK_STATIC_ASSET_PATH must not end with /'
  );
  const cdnUrl = load('CDN_URL', '');
  assert(!cdnUrl.endsWith('/'), 'CDN_URL must not end with /');

  const assetPath = `${prefix}${baseAssetPath}`;
  return {
    rootDir,
    env,
    prefix,
    assetPath,
    baseAssetPath,
    cdnUrl,
  };
};

function load(key, value) {
  return process.env[key] || value;
}
