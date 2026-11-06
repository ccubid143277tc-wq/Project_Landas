import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    ImageBackground,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, {
    type WebViewMessageEvent,
    type WebViewProps,
} from 'react-native-webview';
import { useTheme } from '../contexts/ThemeContext';

const SUMMIT = { latitude: 7.5885859, longitude: 125.5493518 } as const;
const openTerrainMapUrl = (
    latitude: number = SUMMIT.latitude,
    longitude: number = SUMMIT.longitude,
) =>
    `https://opentopomap.org/#map=14/${latitude}/${longitude}`;

const MAP_STYLES = ['satellite', 'topographic', 'street'] as const;
type MapStyle = (typeof MAP_STYLES)[number];

const MAP_STYLE_LABELS: Record<MapStyle, string> = {
    satellite: 'SAT',
    topographic: 'TOPO',
    street: 'STREET',
};

const mapHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.css" />
  <style>
    html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; background: #dce5d2; }
    .maplibregl-ctrl-logo { margin: 0 0 8px 8px !important; }
    .peak-marker { box-sizing: border-box; width: 22px; height: 22px; border: 3px solid #fff; border-radius: 50%; background: #19f000; box-shadow: 0 2px 12px rgba(0,0,0,.5); }
    .user-marker { box-sizing: border-box; width: 16px; height: 16px; border: 3px solid #fff; border-radius: 50%; background: #2786ff; box-shadow: 0 2px 10px rgba(0,0,0,.5); }
    .maplibregl-popup-content { padding: 10px 12px; border-radius: 10px; font: 600 12px -apple-system, BlinkMacSystemFont, sans-serif; }
    .maplibregl-popup-close-button { padding: 4px 7px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script type="module">
    import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs';
    const peak = [125.5493518, 7.5885859];
    let terrainEnabled = true;
    let mapStyle = 'satellite';
    let userMarker;
    const send = (message) => {
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(message));
    };
    const map = new maplibregl.Map({
      container: 'map',
      center: peak,
      zoom: 12,
      pitch: 62,
      bearing: 24,
      maxPitch: 80,
      minZoom: 4,
      maxZoom: 18,
      attributionControl: true,
      style: {
        version: 8,
        sources: {
          satellite: {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: 'Imagery © Esri, Vantor, Earthstar Geographics, and the GIS User Community'
          },
          topographic: {
            type: 'raster',
            tiles: ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 17,
            attribution: '© OpenStreetMap contributors · SRTM | © OpenTopoMap (CC-BY-SA)'
          },
          street: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 19,
            attribution: '© OpenStreetMap contributors'
          },
          terrain: {
            type: 'raster-dem',
            url: 'https://tiles.mapterhorn.com/tilejson.json',
            tileSize: 512,
            encoding: 'terrarium',
            attribution: '© Mapterhorn'
          }
        },
        layers: [
          { id: 'satellite-layer', type: 'raster', source: 'satellite' },
          { id: 'topographic-layer', type: 'raster', source: 'topographic', layout: { visibility: 'none' } },
          { id: 'street-layer', type: 'raster', source: 'street', layout: { visibility: 'none' } },
          {
            id: 'terrain-hillshade',
            type: 'hillshade',
            source: 'terrain',
            paint: { 'hillshade-exaggeration': 0.25 },
            layout: { visibility: 'visible' }
          }
        ]
      }
    });
    map.on('load', () => {
      map.setTerrain({ source: 'terrain', exaggeration: 1.15 });
      const markerElement = document.createElement('div');
      markerElement.className = 'peak-marker';
      new maplibregl.Marker({ element: markerElement, anchor: 'center' })
        .setLngLat(peak)
        .setPopup(new maplibregl.Popup({ offset: 16 }).setText('Mount Megatong · mapped peak'))
        .addTo(map);
      send({ type: 'ready' });
    });
    map.on('error', (event) => {
      if (event && event.error) send({ type: 'map-error', message: event.error.message });
    });
    window.setMapStyle = (style) => {
      mapStyle = style;
      ['satellite', 'topographic', 'street'].forEach((name) => {
        map.setLayoutProperty(name + '-layer', 'visibility', name === mapStyle ? 'visible' : 'none');
      });
    };
    window.setTerrainMode = (enabled) => {
      terrainEnabled = Boolean(enabled);
      map.setTerrain(terrainEnabled ? { source: 'terrain', exaggeration: 1.15 } : null);
      map.easeTo({ pitch: terrainEnabled ? 62 : 0, bearing: terrainEnabled ? 24 : 0, duration: 450 });
    };
    window.zoomMap = (delta) => map.zoomTo(map.getZoom() + delta, { duration: 250 });
    window.centerDestination = () => map.flyTo({ center: peak, zoom: 12, pitch: terrainEnabled ? 62 : 0 });
    window.showUserLocation = (latitude, longitude) => {
      const point = [longitude, latitude];
      if (userMarker) userMarker.remove();
      const element = document.createElement('div');
      element.className = 'user-marker';
      userMarker = new maplibregl.Marker({ element, anchor: 'center' }).setLngLat(point).addTo(map);
      map.flyTo({ center: point, zoom: 14, pitch: terrainEnabled ? 62 : 0 });
    };
  </script>
</body>
</html>`;

type MapMessage = {
    type: 'ready' | 'map-error';
};

const MapPage = () => {
    const { colors } = useTheme();
    const mapRef = useRef<WebView<WebViewProps>>(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapStyle, setMapStyle] = useState<MapStyle>('satellite');
    const [terrainEnabled, setTerrainEnabled] = useState(true);
    const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [mapStatus, setMapStatus] = useState(
        Platform.OS === 'web' ? 'Open the summit map in your browser' : 'Loading satellite terrain…',
    );

    useEffect(() => {
        if (Platform.OS !== 'web' && mapReady && userLocation) {
            mapRef.current?.injectJavaScript(
                `window.showUserLocation(${userLocation.latitude}, ${userLocation.longitude}); true;`,
            );
        }
    }, [mapReady, userLocation]);

    useEffect(() => {
        if (Platform.OS !== 'web' && mapReady) {
            mapRef.current?.injectJavaScript(`window.setTerrainMode(${terrainEnabled}); true;`);
        }
    }, [mapReady, terrainEnabled]);

    useEffect(() => {
        if (Platform.OS !== 'web' && mapReady) {
            mapRef.current?.injectJavaScript(`window.setMapStyle('${mapStyle}'); true;`);
        }
    }, [mapReady, mapStyle]);

    const handleMapMessage = (event: WebViewMessageEvent) => {
        let message: MapMessage;
        try {
            message = JSON.parse(event.nativeEvent.data) as MapMessage;
        } catch {
            setMapStatus('Map communication failed. Please reload the map.');
            return;
        }

        if (message.type === 'ready') {
            setMapReady(true);
            setMapStatus('Satellite map with 3D terrain ready');
        } else if (message.type === 'map-error') {
            setMapStatus('Some map tiles could not load. Check your connection.');
        }
    };

    const openMap = async (latitude?: number, longitude?: number) => {
        try {
            await Linking.openURL(openTerrainMapUrl(latitude, longitude));
        } catch (error) {
            const message = error instanceof Error ? error.message : 'The map link could not be opened.';
            Alert.alert('Unable to open map', message);
        }
    };

    const showMyLocation = async () => {
        setMapStatus('Finding your location…');
        try {
            const permission = await Location.requestForegroundPermissionsAsync();
            if (permission.status !== 'granted') {
                setMapStatus('Location permission was not granted');
                Alert.alert(
                    'Location permission needed',
                    'Allow location access to show your position on the map.',
                );
                return;
            }

            const currentPosition = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            setUserLocation(currentPosition.coords);

            if (Platform.OS === 'web') {
                setMapStatus('Opening your location in OpenStreetMap');
                await openMap(currentPosition.coords.latitude, currentPosition.coords.longitude);
            } else {
                setMapStatus('Your location is shown on the map');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Your current location is unavailable.';
            setMapStatus('Could not get your location');
            Alert.alert('Unable to get location', message);
        }
    };

    const handleZoom = (delta: number) => {
        mapRef.current?.injectJavaScript(`window.zoomMap(${delta}); true;`);
    };

    const handleCenter = () => {
        mapRef.current?.injectJavaScript('window.centerDestination(); true;');
        setUserLocation(null);
    };

    const cycleMapStyle = () => {
        const currentIndex = MAP_STYLES.indexOf(mapStyle);
        setMapStyle(MAP_STYLES[(currentIndex + 1) % MAP_STYLES.length]);
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.page, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { borderBottomColor: colors.border }]}>
                    <Pressable
                        accessibilityLabel="Back to home"
                        accessibilityRole="button"
                        onPress={() => router.replace('/homepage')}
                        style={[
                            styles.backButton,
                            { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                        ]}
                    >
                        <Text style={[styles.backArrow, { color: colors.foreground }]}>‹</Text>
                    </Pressable>
                    <View style={styles.headerCopy}>
                        <Text style={[styles.headerTitle, { color: colors.foreground }]}>TRAIL MAP</Text>
                        <Text style={[styles.headerSubtitle, { color: colors.muted }]}>MOUNT MEGATONG</Text>
                    </View>
                    <Pressable
                        accessibilityLabel="Center map on Mount Megatong"
                        accessibilityRole="button"
                        onPress={handleCenter}
                        style={[
                            styles.centerButton,
                            { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                        ]}
                    >
                        <Text style={[styles.centerButtonText, { color: colors.accent }]}>⌖</Text>
                    </Pressable>
                </View>

                <View style={styles.mapArea}>
                    {Platform.OS === 'web' ? (
                        <ImageBackground
                            accessibilityLabel="Mountain landscape"
                            imageStyle={styles.webMapImage}
                            resizeMode="cover"
                            source={require('../../assets/images/Starting_page2.jpg')}
                            style={styles.webMapFallback}
                        >
                            <View style={styles.webMapOverlay}>
                                <View style={styles.webPin}>
                                    <Text style={styles.webPinText}>⌖</Text>
                                </View>
                                <Text style={styles.webMapTitle}>Mount Megatong</Text>
                                <Text style={styles.webMapText}>
                                    Open the summit on a topographic map. Satellite and 3D are available in the mobile app.
                                </Text>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => openMap()}
                                    style={styles.webMapButton}
                                >
                                    <Text style={styles.webMapButtonText}>OPEN TOPOGRAPHIC MAP ↗</Text>
                                </Pressable>
                            </View>
                        </ImageBackground>
                    ) : (
                        <WebView<WebViewProps>
                            ref={mapRef}
                            accessibilityLabel="Interactive 3D satellite map of Mount Megatong"
                            allowFileAccess={false}
                            domStorageEnabled
                            javaScriptEnabled
                            onError={() => setMapStatus('Map failed to load. Check your connection.')}
                            onMessage={handleMapMessage}
                            originWhitelist={['*']}
                            source={{ html: mapHtml, baseUrl: 'https://landas.app' }}
                            style={styles.map}
                        />
                    )}

                    {Platform.OS !== 'web' && (
                        <>
                            <View style={styles.mapLocationLabel}>
                                <View style={styles.labelDot} />
                                <Text style={styles.mapLocationText}>TALAINGOD · DAVAO DEL NORTE</Text>
                            </View>
                            <View style={styles.mapControls}>
                                <Pressable
                                    accessibilityLabel={`Change map layer. Current layer: ${mapStyle}`}
                                    accessibilityRole="button"
                                    accessibilityHint="Cycles between satellite, topographic, and street map layers"
                                    onPress={cycleMapStyle}
                                    style={[styles.modeButton, styles.layerButton, styles.activeModeButton]}
                                >
                                    <Text style={[styles.modeButtonText, styles.activeModeText]}>
                                        {MAP_STYLE_LABELS[mapStyle]}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    accessibilityLabel={terrainEnabled ? 'Switch to flat 2D map' : 'Switch to 3D terrain'}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: terrainEnabled }}
                                    onPress={() => setTerrainEnabled((enabled) => !enabled)}
                                    style={[styles.modeButton, terrainEnabled && styles.activeModeButton]}
                                >
                                    <Text style={[styles.modeButtonText, terrainEnabled && styles.activeModeText]}>
                                        {terrainEnabled ? '3D' : '2D'}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    accessibilityLabel="Zoom in"
                                    accessibilityRole="button"
                                    onPress={() => handleZoom(1)}
                                    style={styles.zoomButton}
                                >
                                    <Text style={styles.zoomButtonText}>+</Text>
                                </Pressable>
                                <Pressable
                                    accessibilityLabel="Zoom out"
                                    accessibilityRole="button"
                                    onPress={() => handleZoom(-1)}
                                    style={[styles.zoomButton, styles.lastZoomButton]}
                                >
                                    <Text style={styles.zoomButtonText}>−</Text>
                                </Pressable>
                            </View>
                            <Pressable
                                accessibilityLabel="Show my current location"
                                accessibilityRole="button"
                                onPress={showMyLocation}
                                style={styles.locateButton}
                            >
                                <Text style={styles.locateIcon}>◎</Text>
                                <Text style={styles.locateText}>MY LOCATION</Text>
                            </Pressable>
                        </>
                    )}

                </View>

                <View style={[styles.destinationCard, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                    <View style={styles.cardHeading}>
                        <View style={[styles.peakIcon, { backgroundColor: colors.accentSoft }]}>
                            <Text style={[styles.peakIconText, { color: colors.accent }]}>⌃</Text>
                        </View>
                        <View style={styles.cardTitleWrap}>
                            <Text style={[styles.cardEyebrow, { color: colors.subtle }]}>MAPPED SUMMIT</Text>
                            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Mount Megatong</Text>
                        </View>
                        <View style={[styles.mapReadyBadge, { backgroundColor: colors.elevatedSurface, borderColor: colors.border }]}>
                            <View style={[styles.readyDot, { backgroundColor: colors.accent }]} />
                            <Text style={[styles.mapReadyText, { color: colors.secondary }]}>
                                {Platform.OS === 'web' ? 'WEB' : mapReady ? 'LIVE' : 'MAP'}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.cardDescription, { color: colors.secondary }]}>{mapStatus}</Text>
                    <Text style={[styles.routeNotice, { color: colors.muted }]}>
                        Summit pin from OpenStreetMap · Verified hiking route not available
                    </Text>
                    <Text style={[styles.mapAttribution, { color: colors.muted }]}>
                        Satellite © Esri · Topo © OpenStreetMap/SRTM/OpenTopoMap · Elevation © Mapterhorn
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => openMap()}
                        style={[styles.openMapButton, { backgroundColor: colors.accent }]}
                    >
                        <Text style={[styles.openMapButtonText, { color: colors.accentText }]}>OPEN SUMMIT IN OPENTOPOMAP</Text>
                        <Text style={[styles.openMapArrow, { color: colors.accentText }]}>↗</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MapPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    page: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    header: {
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 17,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#252B25',
    },
    backButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#293229',
        borderRadius: 18,
        backgroundColor: '#131713',
    },
    backArrow: {
        marginTop: -4,
        color: '#FFFFFF',
        fontSize: 29,
        lineHeight: 34,
    },
    headerCopy: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        color: '#F3F4F2',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    headerSubtitle: {
        marginTop: 2,
        color: '#8D948B',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 1,
    },
    centerButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#354333',
        borderRadius: 18,
        backgroundColor: '#141B13',
    },
    centerButtonText: {
        color: '#19F000',
        fontSize: 21,
    },
    mapArea: {
        flex: 1,
        minHeight: 330,
        overflow: 'hidden',
        backgroundColor: '#DCE5D2',
    },
    map: {
        flex: 1,
        backgroundColor: '#DCE5D2',
    },
    mapLocationLabel: {
        position: 'absolute',
        top: 13,
        left: 13,
        height: 31,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        backgroundColor: 'rgba(9,12,9,0.78)',
    },
    labelDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#19F000',
    },
    mapLocationText: {
        color: '#F2F4F1',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 0.7,
    },
    mapControls: {
        position: 'absolute',
        top: 13,
        right: 13,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D5D9D2',
        borderRadius: 11,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    modeButton: {
        width: 68,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DADFDA',
        backgroundColor: '#FFFFFF',
    },
    layerButton: {
        width: 76,
    },
    activeModeButton: {
        backgroundColor: '#152015',
    },
    modeButtonText: {
        color: '#273027',
        fontSize: 11,
        fontWeight: '900',
    },
    activeModeText: {
        color: '#19F000',
    },
    zoomButton: {
        width: 42,
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E1E4E0',
    },
    lastZoomButton: {
        borderBottomWidth: 0,
    },
    zoomButtonText: {
        color: '#182018',
        fontSize: 22,
        fontWeight: '500',
    },
    locateButton: {
        position: 'absolute',
        bottom: 15,
        left: 13,
        height: 39,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#D5D9D2',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    locateIcon: {
        color: '#198A0C',
        fontSize: 18,
    },
    locateText: {
        color: '#202820',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 0.6,
    },
    mapAttribution: {
        marginTop: 6,
        color: '#A0A79E',
        fontSize: 8,
    },
    destinationCard: {
        paddingHorizontal: 16,
        paddingTop: 13,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#293029',
        backgroundColor: '#0D100D',
    },
    cardHeading: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    peakIcon: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: '#1A2618',
    },
    peakIconText: {
        color: '#19F000',
        fontSize: 22,
        fontWeight: '800',
    },
    cardTitleWrap: {
        flex: 1,
    },
    cardEyebrow: {
        color: '#7D847C',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.3,
    },
    cardTitle: {
        marginTop: 3,
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },
    mapReadyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#2E3A2C',
        borderRadius: 11,
        backgroundColor: '#141A13',
    },
    readyDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#19F000',
    },
    mapReadyText: {
        color: '#C8D1C4',
        fontSize: 7,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    cardDescription: {
        marginTop: 9,
        color: '#B3BAB1',
        fontSize: 10,
    },
    routeNotice: {
        marginTop: 5,
        color: '#777F76',
        fontSize: 8,
        lineHeight: 12,
    },
    openMapButton: {
        height: 39,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        marginTop: 11,
        borderRadius: 11,
        backgroundColor: '#19F000',
    },
    openMapButtonText: {
        color: '#071006',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.6,
    },
    openMapArrow: {
        color: '#071006',
        fontSize: 16,
        fontWeight: '800',
    },
    webMapFallback: {
        flex: 1,
        justifyContent: 'center',
        padding: 18,
    },
    webMapImage: {
        opacity: 0.72,
    },
    webMapOverlay: {
        alignItems: 'center',
        padding: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
        borderRadius: 18,
        backgroundColor: 'rgba(8,10,8,0.78)',
    },
    webPin: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        backgroundColor: '#19F000',
    },
    webPinText: {
        color: '#071006',
        fontSize: 24,
    },
    webMapTitle: {
        marginTop: 12,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
    },
    webMapText: {
        marginTop: 6,
        color: '#D4D9D2',
        fontSize: 11,
        textAlign: 'center',
    },
    webMapButton: {
        marginTop: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#19F000',
    },
    webMapButtonText: {
        color: '#071006',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.7,
    },
});