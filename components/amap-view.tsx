// AMapWebView.tsx
import { useRef } from "react";
import { WebView } from "react-native-webview";

export default function AMapWebView({
  coord,
  onCoordinateChange,
}: {
  coord?: { lng: number; lat: number };
  onCoordinateChange?: (coord: { lng: number; lat: number }) => void;
}) {
  const webViewRef = useRef<WebView>(null);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
        <script src="https://webapi.amap.com/maps?v=2.0&key=3e90ddbaaf65d923d7492b521ab35f1a"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const initialCoord = [${coord?.lng ?? 116.397428}, ${coord?.lat ?? 39.90923}];
          const map = new AMap.Map('map', {
            zoom: 14,
            center: initialCoord,
          });

          // 初始化时发送一次坐标
          window.ReactNativeWebView.postMessage(JSON.stringify({
            lng: initialCoord[0],
            lat: initialCoord[1]
          }));

          map.on('click', function(e) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              lng: e.lnglat.lng,
              lat: e.lnglat.lat
            }));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={["*"]}
      source={{ html }}
      style={{ flex: 1 }}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data);
        onCoordinateChange?.(data);
      }}
    />
  );
}
