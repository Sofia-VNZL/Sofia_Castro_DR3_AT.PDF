import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import InternalHeader from '../components/InternalHeader';

const RESTAURANTS = [
  { id: 1, name: "Confeitaria Colombo", lat: -22.9052, lng: -43.1793, address: "R. Gonçalves Dias, 32" },
  { id: 2, name: "Cais do Oriente", lat: -22.9009, lng: -43.1768, address: "R. Visc. de Itaboraí, 8" },
  { id: 3, name: "Rio Minho", lat: -22.9022, lng: -43.1764, address: "R. do Ouvidor, 10" },
  { id: 4, name: "Angu do Gomes", lat: -22.8988, lng: -43.1834, address: "Largo de São Francisco da Prainha, 17" },
  { id: 5, name: "Mosteiro", lat: -22.9001, lng: -43.1789, address: "R. de São Bento, 13" },
  { id: 6, name: "Lulu Galeteria", lat: -22.9035, lng: -43.1820, address: "R. Arnaldo Quintela, 10" },
  { id: 7, name: "Bar Luiz", lat: -22.9048, lng: -43.1812, address: "R. da Carioca, 39" },
  { id: 8, name: "Nova Capela", lat: -22.9131, lng: -43.1821, address: "Av. Mem de Sá, 96" },
  { id: 9, name: "Adega Flor de Coimbra", lat: -22.9125, lng: -43.1815, address: "R. Teotônio Regadas, 34" },
  { id: 10, name: "Shirley", lat: -22.9015, lng: -43.1735, address: "R. Gustavo Sampaio, 610" }
];

export default function MapScreen({ navigation }) {
  const handleMessage = (event) => {
    const restaurantData = JSON.parse(event.nativeEvent.data);
    navigation.navigate('RestaurantDetail', { restaurant: restaurantData });
  };

  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          #map { height: 100vh; width: 100vw; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([-22.9035, -43.1780], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          
          const restaurants = ${JSON.stringify(RESTAURANTS)};
          
          restaurants.forEach(res => {
            var marker = L.marker([res.lat, res.lng]).addTo(map);
            
            // Quando clicar no marcador, envia os dados para o React Native
            marker.on('click', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify(res));
            });

            marker.bindPopup('<b>' + res.name + '</b><br>Toque para ver detalhes');
          });
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Restaurantes Próximos" navigation={navigation} />
      <View style={styles.mapContainer}>
        <WebView 
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          onMessage={handleMessage} 
          style={styles.map}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3' },
  mapContainer: { flex: 1, overflow: 'hidden' },
  map: { flex: 1 }
});