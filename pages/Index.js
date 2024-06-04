import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';

export function Index () {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      (async () => {
        try {
          const { coords } = location;
          const { latitude, longitude } = coords;
          const response = await Location.reverseGeocodeAsync({ latitude, longitude });
          const city = response[0].city;
          setCity(city);
        } catch (error) {
          console.error('Erro ao obter a cidade:', error);
        }
      })();
    }
  }, [location]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {errorMsg && <Text>{errorMsg}</Text>}
      {city && (
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>Sua cidade: {city}</Text>
        </View>
      )}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          <Text style={styles.boasText}>Boas </Text>
          <Text style={styles.vindasText}>vindas</Text>
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Permitir localização?</Text>
        <Text style={styles.locationSubText}>(nenhuma instituição próxima)</Text>
      </View>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Explorar organizações parceiras</Text>
      </TouchableOpacity>
      <Image source={require('../assets/maosDadas.png')} style={styles.mainImage} />
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Alimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Dinheiro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Roupas</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Organizações mais doadas</Text>
      <View style={styles.organizationsContainer}>
        {['Revlon', 'Lakmé', 'Garnier', 'Maybelline', 'Clinique', 'Sugar'].map((brand, index) => (
          <View key={index} style={styles.organizationCard}>
            <Text style={styles.organizationText}>{brand}</Text>
            <Text style={styles.discountText}>Desc. 10% OFF</Text>
          </View>
        ))}
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Quem somos nós?</Text>
        <Text style={styles.aboutText}>Te ajudamos a fazer o bem</Text>
        <Text style={styles.aboutDescription}>Lorem ipsum dolor sit amet consectetur. Proin non sapien non lacus viverra nisi quisque sodales.</Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Doar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  boasText: {
    color: '#FDAA5D',
  },
  vindasText: {
    color: '#4AB7B6',
  },
  locationContainer: {
    marginTop: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#000000',
  },
  locationSubText: {
    fontSize: 14,
    color: '#999999',
  },
  searchButton: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryButton: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  organizationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  organizationCard: {
    width: '48%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    alignItems: 'center',
  },
  organizationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 14,
    color: '#FF6600',
  },
  aboutContainer: {
    marginTop: 20,
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 16,
    color: '#000000',
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 10,
  },
  donateButton: {
    backgroundColor: '#00C853',
    padding: 10,
    borderRadius: 5,
  },
  donateButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  cityContainer: {
    marginVertical: 10,
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});


