# Power Bank App

智能充电宝管理 App，基于 React Native + Expo 构建，支持 BLE 蓝牙连接、WiFi 配网、实时设备监控、固件 OTA 升级等功能，适配 Android 与 iOS 双平台，支持中英文国际化与深色/浅色主题。

## 功能特性

- **BLE 设备管理** — 扫描、连接周边充电宝设备，支持 WiFi 配网（SSID/密码下发），后台保活连接
- **实时状态监控** — 展示电池电量、电压、温度、容量、健康度、使用时长，支持卡片拖拽自定义排序
- **OTA 固件升级** — 通过蓝牙对设备推送固件更新
- **地图定位** — 在 Google Maps 上查看设备位置及路径
- **账户体系** — 手机验证码 / 密码双模式登录，注册、个人信息、安全设置（密码、支付密码、登录设备管理）
- **通知管理** — 多渠道通知配置（推送、短信、邮件、声音）
- **国际化** — 中文 / 英文双语，深色 / 浅色主题自适应

## 技术栈

| 类别        | 技术                                                   |
| ----------- | ------------------------------------------------------ |
| 框架        | React Native 0.81 + Expo 54 + Expo Router（文件路由）  |
| 样式        | NativeWind 4（Tailwind CSS for RN）                    |
| BLE         | react-native-ble-plx                                   |
| 地图        | react-native-maps（Google Maps）                       |
| WiFi 配网   | react-native-wifi-reborn                               |
| 动画 / 手势 | react-native-reanimated + react-native-gesture-handler |
| 国际化      | i18next + react-i18next                                |
| 推送通知    | expo-notifications                                     |
| 日志        | react-native-file-logger                               |

## 目录结构

```
app/
  (welcome)/      引导页（首次启动 onboarding 流程）
  (auth)/         认证（登录、密码登录、注册）
  (tabs)/         主 Tab（首页设备列表、我的）
  (device)/       设备管理（添加、详情、地图、OTA 升级）
  (settings)/     设置（应用设置、通知、个人信息、安全）
  notifications   通知中心
components/       通用 UI 组件
lib/              BLE 服务单例（ble-service.ts）
i18n/             国际化资源（zh.json / en.json）
utils/            工具函数
```

## 权限说明

**Android**：蓝牙（`BLUETOOTH_SCAN`、`BLUETOOTH_CONNECT`）、定位（`ACCESS_FINE_LOCATION`）、前台服务（`FOREGROUND_SERVICE_CONNECTED_DEVICE`）

**iOS**：蓝牙后台模式（`bluetooth-central`）、定位（使用时 / 始终）、WiFi 信息访问

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
# 或分平台运行
npm run android
npm run ios
```

### 代码检查与格式化

```bash
npm run lint
npm run format
```

### 第三方库补丁（patches/）

项目使用 [patch-package](https://github.com/ds300/patch-package) 对 `react-native-ble-plx@3.5.0` 进行了补丁修复，补丁文件位于 `patches/react-native-ble-plx+3.5.0.patch`。

**补丁原因：**

`react-native-ble-plx` 库在 Android 端的 `BlePlxModule.java` 中，所有 Promise 的错误回调都使用 `reject(null, errorConverter.toJs(...))`，这会导致 JavaScript 端无法正确识别错误类型（`null` 作为错误码）。补丁将所有 `reject(null, ...)` 改为 `reject("ERROR", ...)` 或更具体的错误码（如 `"BLE_MANAGER_DESTROYED"`），以便 JS 端能正确处理 BLE 错误。

**具体改动：**

- **源代码修改**：在 `BlePlxModule.java` 中，将约 50+ 处的 Promise reject 调用从 `reject(null, ...)` 改为 `reject("ERROR", ...)` 或特定错误码。
- **Android 配置**：补丁还包含了 Android IDE 项目文件（`.classpath`、`.project`）、构建配置（`bin/build.gradle`、`gradle.properties`）和权限声明（`AndroidManifest.xml`），以确保库能在 Android Studio 中正确识别和构建。
- **构建产物**：包含大量编译中间文件（`.class`、`.dex`、build intermediates），这些是补丁应用后的产物。

**应用补丁：**

执行 `npm install` 后，通过以下命令手动应用补丁：

```bash
npx patch-package
```

## 构建发布

如果需要使用 EAS Build 进行构建，需要安装 EAS CLI（`>= 5.0.0`）。

```bash
npm install -g eas-cli
eas login
```

| 构建配置         | 产物               | 用途             |
| ---------------- | ------------------ | ---------------- |
| `production-aab` | Android App Bundle | 上传 Google Play |
| `production-apk` | APK                | 直接分发安装     |
| `preview`        | APK                | 内部测试         |

```bash
# 构建 APK（直接分发）
eas build --profile production-apk --platform android

# 构建 AAB（上传商店）
eas build --profile production-aab --platform android
```

也可以使用本地 Gradle 构建：

```bash
# 本地 Release APK
npm run release:android:apk

# 本地 Release AAB
npm run release:android:aab
```

### 版本管理

```bash
# 生成许可证信息 + 版本号递增
npm run pre-release
```
