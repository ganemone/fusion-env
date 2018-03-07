/* eslint-env node */
const tape = require('tape');
const getEnv = require('../index.js');

tape('getEnv defaults', t => {
  const env = getEnv();
  t.deepEqual(env, {
    rootDir: '.',
    env: 'development',
    prefix: '',
    assetPath: '/_static',
    baseAssetPath: '/_static',
    cdnUrl: '',
  });
  t.end();
});

tape('getEnv overrides', t => {
  process.env.ROOT_DIR = 'test_root_dir';
  process.env.NODE_ENV = 'production';
  process.env.ROUTE_PREFIX = 'test_route_prefix';
  process.env.FRAMEWORK_STATIC_ASSET_PATH = '/test_framework';
  process.env.CDN_URL = 'test_cdn_url';

  const env = getEnv();
  t.deepEqual(env, {
    rootDir: 'test_root_dir',
    env: 'production',
    prefix: 'test_route_prefix',
    assetPath: 'test_route_prefix/test_framework',
    baseAssetPath: '/test_framework',
    cdnUrl: 'test_cdn_url',
  });

  process.env.ROOT_DIR = '';
  process.env.NODE_ENV = '';
  process.env.ROUTE_PREFIX = '';
  process.env.FRAMEWORK_STATIC_ASSET_PATH = '';
  process.env.CDN_URL = '';
  t.end();
});

tape('getEnv validation', t => {
  process.env.NODE_ENV = 'LOL';
  t.throws(getEnv, /Invalid NODE_ENV loaded/);
  process.env.NODE_ENV = '';

  process.env.ROUTE_PREFIX = 'test/';
  t.throws(getEnv, /ROUTE_PREFIX must not end with /);
  process.env.ROUTE_PREFIX = '';

  process.env.FRAMEWORK_STATIC_ASSET_PATH = 'test/';
  t.throws(getEnv, /FRAMEWORK_STATIC_ASSET_PATH must not end with /);
  process.env.FRAMEWORK_STATIC_ASSET_PATH = '';

  process.env.CDN_URL = 'test/';
  t.throws(getEnv, /CDN_URL must not end with /);
  process.env.CDN_URL = '';
  t.end();
});
