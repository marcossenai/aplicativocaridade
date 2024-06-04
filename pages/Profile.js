import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, Image, Text, TouchableOpacity, ActivityIndicator, TextInput, Modal, Pressable, Linking, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import atualizado

export function Profile () {
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [name, setName] = useState('');
  const [doacoesFeitas, setDoacoesFeitas] = useState(678);
  const [categoriaFavorita, setCategoriaFavorita] = useState('Alimentos');
  const [ongsDoadas, setOngsDoadas] = useState(['Justo Doações', 'Justo Doações', 'Justo Doações']);
  const [editDoacoes, setEditDoacoes] = useState(false);
  const [editCategoria, setEditCategoria] = useState(false);
  const [editOngs, setEditOngs] = useState(null);
  const [tempOng, setTempOng] = useState('');

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../assets/Poppins/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Semi': require('../assets/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../assets/Poppins/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('image');
      const savedBackgroundImage = await AsyncStorage.getItem('backgroundImage');
      const savedName = await AsyncStorage.getItem('name');
      const savedDoacoesFeitas = await AsyncStorage.getItem('doacoesFeitas');
      const savedCategoriaFavorita = await AsyncStorage.getItem('categoriaFavorita');
      const savedOngsDoadas = await AsyncStorage.getItem('ongsDoadas');

      if (savedImage) setImage(savedImage);
      if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage);
      if (savedName) setName(savedName);
      if (savedDoacoesFeitas) setDoacoesFeitas(Number(savedDoacoesFeitas));
      if (savedCategoriaFavorita) setCategoriaFavorita(savedCategoriaFavorita);
      if (savedOngsDoadas) setOngsDoadas(JSON.parse(savedOngsDoadas));
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  const saveData = async () => {
    try {
      if (image !== null && image !== undefined) {
        await AsyncStorage.setItem('image', image);
      } else {
        await AsyncStorage.removeItem('image');
      }
      if (backgroundImage !== null && backgroundImage !== undefined) {
        await AsyncStorage.setItem('backgroundImage', backgroundImage);
      } else {
        await AsyncStorage.removeItem('backgroundImage');
      }
      if (name !== null && name !== undefined) {
        await AsyncStorage.setItem('name', name);
      }
      if (doacoesFeitas !== null && doacoesFeitas !== undefined) {
        await AsyncStorage.setItem('doacoesFeitas', String(doacoesFeitas));
      }
      if (categoriaFavorita !== null && categoriaFavorita !== undefined) {
        await AsyncStorage.setItem('categoriaFavorita', categoriaFavorita);
      }
      if (ongsDoadas !== null && ongsDoadas !== undefined) {
        await AsyncStorage.setItem('ongsDoadas', JSON.stringify(ongsDoadas));
      }
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };


  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('image');
      await AsyncStorage.removeItem('backgroundImage');
      setImage(null);
      setBackgroundImage(null);
    } catch (error) {
      console.error('Failed to remove data', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      saveData(); // Salvar após selecionar nova imagem
    }
  };
  
  const pickBackgroundImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setBackgroundImage(result.assets[0].uri);
      saveData(); // Salvar após selecionar nova imagem de fundo
    }
  };

  const handleEditPress = () => {
    setShowOverlay(true);
  };

  const handleButton1Press = () => {
    Linking.openURL('https://www.eventbrite.com.br/b/brazil/charity-and-causes/');
  };

  const handleButton2Press = () => {
    Linking.openURL('https://www.atados.com.br/');
  };

  const handleDoacoesFeitasPress = () => {
    setEditDoacoes(true);
  };

  const handleCategoriaFavoritaPress = () => {
    setEditCategoria(true);
  };

  const handleOngsDoadasPress = (index) => {
    setEditOngs(index);
    setTempOng(ongsDoadas[index]);
  };

  const closeModals = () => {
    setEditDoacoes(false);
    setEditCategoria(false);
    setEditOngs(null);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={backgroundImage ? { uri: backgroundImage } : require('../assets/billie.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image source={require('../assets/billie2.png')} style={styles.overlayImage} />
            )}
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <Image
                source={require('../assets/editar.png')}
                style={styles.editButtonImage}
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins-Semi' }]}
              placeholder="Insira seu nome"
              placeholderTextColor="rgba(150, 150, 150, 0.5)"
              onChangeText={(text) => {
                setName(text);
                saveData(); // Salvar imediatamente ao digitar
              }}
              value={name}
              textAlign="left"
              maxLength={20}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button]} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Eventos caridosos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button]} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>Plataforma Atados</Text>
              </TouchableOpacity>
            </View>

            {/* New Categories Section */}
            <View style={styles.categoriesContainer}>
              <View style={styles.leftContainer}>
                <TouchableOpacity onPress={handleDoacoesFeitasPress} style={styles.category}>
                  <Text style={styles.categoryTitle}>Doações feitas</Text>
                  <Text style={styles.categoryValue}>{doacoesFeitas}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCategoriaFavoritaPress} style={styles.category}>
                  <Text style={styles.categoryTitle}>Categoria favorita</Text>
                  <Text style={styles.categoryValue}>{categoriaFavorita}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightContainer}>
                <View style={styles.category}>
                  <Text style={styles.categoryTitle}>Ongs doadas</Text>
                  {ongsDoadas.map((ong, index) => (
                    <TouchableOpacity key={index} onPress={() => handleOngsDoadasPress(index)} style={styles.ongItem}>
                      <Image
                        source={require('../assets/arrow.png')}
                        style={styles.arrowIcon}
                      />
                      <Text style={styles.categoryValue}>{ong}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Overlay */}
        <Modal
          visible={showOverlay}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowOverlay(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowOverlay(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                <Text style={styles.modalButtonText}>Alterar imagem de perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={pickBackgroundImage}>
                <Text style={styles.modalButtonText}>Alterar imagem de fundo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={removeData}>
                <Text style={styles.modalButtonText}>Restaurar imagens originais</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Modals de edição */}
        <Modal visible={editDoacoes} transparent={true} animationType="slide">
          <Pressable style={styles.modalOverlay} onPress={closeModals}>
            <View style={styles.editModalContent}>
              <TextInput
                style={styles.editInput}
                value={String(doacoesFeitas)}
                onChangeText={(text) => setDoacoesFeitas(Number(text))}
                keyboardType="numeric"
                onBlur={saveData}
              />
              <TouchableOpacity onPress={closeModals}>
                <Text style={styles.editModalCloseButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <Modal visible={editCategoria} transparent={true} animationType="slide">
          <Pressable style={styles.modalOverlay} onPress={closeModals}>
            <View style={styles.editModalContent}>
              <View style={styles.editInput}>
                <TouchableOpacity onPress={() => setCategoriaFavorita('Alimentos')} style={styles.categoryOption}>
                  <Text style={styles.categoryOptionText}>Alimentos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCategoriaFavorita('Roupas')} style={styles.categoryOption}>
                  <Text style={styles.categoryOptionText}>Roupas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCategoriaFavorita('Dinheiro')} style={styles.categoryOption}>
                  <Text style={styles.categoryOptionText}>Dinheiro</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity onPress={closeModals}>
                <Text style={styles.editModalCloseButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <Modal visible={editOngs !== null} transparent={true} animationType="slide">
          <Pressable style={styles.modalOverlay} onPress={closeModals}>
            <View style={styles.editModalContent}>
              <Text style={styles.modalTitle}>Editar Ongs Doadas</Text>
              <TextInput
                style={styles.editInput}
                value={tempOng}
                onChangeText={(text) => setTempOng(text)}
                onBlur={() => {
                  const updatedOngs = [...ongsDoadas];
                  updatedOngs[editOngs] = tempOng;
                  setOngsDoadas(updatedOngs);
                  saveData();
                  closeModals();
                }}
              />
              <TouchableOpacity onPress={closeModals}>
                <Text style={styles.editModalCloseButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 300,
    marginHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 60,
    left: -90,
    top: -55,
  },
  overlayImage: {
    width: 130,
    height: 130,
    borderRadius: 60,
    left: -90,
    top: -55,
  },
  editButton: {
    position: 'absolute',
    top: 30,
    left: 300,
  },
  editButtonText: {
    color: 'blue',
    fontFamily: 'Poppins-Regular',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    width: 300,
    height: 40,
    marginTop: -30,
    fontFamily: 'Poppins-Semi',
    fontSize: 23,
    marginLeft: 29,
  },
  editButtonImage: {
    width: 25,
    height: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  buttonPressed: {
    backgroundColor: 'lightgrey',
    elevation: 0,
  },
  buttonTextPressed: {
    color: 'black',
  },
  categoriesContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  leftContainer: {
    flex: 1,
    marginRight: 10, // Espaço entre os containers esquerdo e direito
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  category: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  categoryValue: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    textAlign: 'center',
  },
  ongItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  modalButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  editModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    width: '100%',
    marginBottom: 10,
  },
  editModalCloseButton: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  }, categoryOption: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 10,
  },
  categoryOptionText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  }

});



