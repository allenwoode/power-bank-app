#!/bin/bash

# 获取版本号从 build.gradle
VERSION=$(grep 'versionName' android/app/build.gradle | sed 's/.*versionName "\([^"]*\)".*/\1/')

# ABI 列表
ABIS=("armeabi-v7a" "arm64-v8a" "x86" "x86_64")

# 构建 release APK
echo "Building release APKs..."
cd android
./gradlew assembleRelease
cd ..

# 移动和重命名 release APK
for ABI in "${ABIS[@]}"; do
    SRC="android/app/build/outputs/apk/release/app-${ABI}-release.apk"
    DEST_DIR="output/release/${VERSION}"
    DEST="${DEST_DIR}/app-release-${VERSION}-${ABI}.apk"
    mkdir -p "$DEST_DIR"
    if [ -f "$SRC" ]; then
        mv "$SRC" "$DEST"
        echo "Moved $SRC to $DEST"
    else
        echo "Warning: $SRC not found"
    fi
done

# 询问是否构建 debug APK
if [ -z "$CI" ]; then
    echo "Do you want to build debug APKs? (y/n)"
    read -r answer
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        BUILD_DEBUG=true
    else
        BUILD_DEBUG=false
    fi
else
    BUILD_DEBUG=false
fi

if [ "$BUILD_DEBUG" = true ]; then
    echo "Building debug APKs..."
    cd android
    ./gradlew assembleDebug
    cd ..

    # 移动和重命名 debug APK
    for ABI in "${ABIS[@]}"; do
        SRC="android/app/build/outputs/apk/debug/app-${ABI}-debug.apk"
        DEST_DIR="output/debug/${VERSION}"
        DEST="${DEST_DIR}/app-debug-${VERSION}-${ABI}.apk"
        mkdir -p "$DEST_DIR"
        if [ -f "$SRC" ]; then
            mv "$SRC" "$DEST"
            echo "Moved $SRC to $DEST"
        else
            echo "Warning: $SRC not found"
        fi
    done
else
    echo "Skipping debug APKs."
fi

echo "APK build and move completed."