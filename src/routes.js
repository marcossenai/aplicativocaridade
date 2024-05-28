import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from './pages/Index';
import Profile from './pages/Profile';

import { Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                // tabBarActiveTintColor: '#',
                // tabBarInactiveTintColor: '#'
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#171626',
                    borderTopWidth: 0, 

                    bottom: 14,
                    left: 14,
                    right: 14,
                    elevation: 0,
                    borderRadius: 14,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Início"
                component={Index}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                            return <Ionicons name='home' size={size} color={color}/>
                        }

                        return <Ionicons name='home-outline' size={size} color={color}/>
                    }
                }}
            />
            <Tab.Screen 
                name="Perfil"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                            return <Ionicons name='person' size={size} color={color}/>
                        }

                        return <Ionicons name='person-outline' size={size} color={color}/>
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default Routes;

// import React, { useState } from 'react';
// import { Button, Image, View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const { width } = Dimensions.get('window');

// export default function ImagePickerExample() {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [showOverlay, setShowOverlay] = useState(false);

//   const pickImage = async (setImage) => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.assets[0].uri);
//       setShowOverlay(false); // Fecha o overlay após a seleção da imagem
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         {image1 ? (
//           <Image source={{ uri: image1 }} style={styles.image} />
//         ) : (
//           <View style={styles.placeholder} />
//         )}
//       </View>
//       <View style={styles.imageContainerRound}>
//         {image2 ? (
//           <Image source={{ uri: image2 }} style={styles.imageRound} />
//         ) : (
//           <View style={styles.placeholderRound} />
//         )}
//         <TouchableOpacity style={styles.editButton} onPress={() => setShowOverlay(true)}>
//           <Text style={styles.editButtonText}>Editar</Text>
//         </TouchableOpacity>
//       </View>
//       {showOverlay && (
//         <View style={styles.overlay}>
//           <TouchableOpacity style={styles.overlayButton} onPress={() => pickImage(setImage1)}>
//             <Text style={styles.overlayButtonText}>Alterar foto de fundo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.overlayButton} onPress={() => pickImage(setImage2)}>
//             <Text style={styles.overlayButtonText}>Alterar foto de perfil</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.overlayButton} onPress={() => setShowOverlay(false)}>
//             <Text style={styles.overlayButtonText}>Cancelar</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     backgroundColor: '#f0f0f0',
//   },
//   imageContainer: {
//     width: '100%',
//     alignItems: 'center',
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: width * 0.5, // altura fixa de 75% da largura da tela
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     resizeMode: 'cover',
//   },
//   placeholder: {
//     width: '100%',
//     height: width * 0.75, // altura fixa de 75% da largura da tela
//     backgroundColor: '#ccc',
//   },
//   imageContainerRound: {
//     width: '100%',
//     alignItems: 'center',
//     overflow: 'hidden',
//     marginBottom: 20,
//     position: 'absolute',
//     top: width * 0.25 - 50, // A metade da altura da foto de perfil menos metade da altura da foto de perfil
//   },
//   imageRound: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     borderRadius: 50,
//   },
//   placeholderRound: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#ccc',
//     borderRadius: 50,
//   },
//   editButton: {
//     marginTop: 10,
//   },
//   editButtonText: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   overlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   overlayButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   overlayButtonText: {
//     fontSize: 16,
//     color: 'black',
//   },
// });
