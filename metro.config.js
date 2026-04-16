const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// 扩展默认配置，不要覆盖
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];
config.resolver.assetExts = [...config.resolver.assetExts];

// 处理 expo-notifications 的依赖问题
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: './app/global.css' });
