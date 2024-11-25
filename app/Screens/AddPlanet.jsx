import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Dropdown from "./Dropdown";
import { addPlanet } from "../Services/api";

const AddPlanet = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');

  // Datos preexistentes para el Dropdown
  const planets = [
    {
      id: '5',
      name: "Jupiter",
      description: 'El planeta más grande del sistema solar, un gigante gaseoso.',
      moons: 95,
      moon_names: ['Io', 'Europa', 'Ganimedes', 'Calisto'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
    },
    {
      id: '8',
      name: 'Neptuno',
      description: 'El planeta más alejado del sistema solar, un gigante helado.',
      moons: 14,
      moon_names: ['Tritón', 'Nereida', 'Náyade'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
    },
    {
      id: '01c2',
      name: "Hola",
      description: 'Planeta de ejemplo',
      moons: 12,
      moon_names: ['Luna1', 'Luna2'],
      image: 'https://via.placeholder.com/150',
    },
  ];

  const handleAddPlanet = async () => {
    if (!name.trim() || !description.trim() || !moons.trim() || !moonNames.trim() || !image.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const newPlanet = {
      name,
      description,
      moons: parseInt(moons) || 0,
      moon_names: moonNames.split(',').map(moon => moon.trim()),
      image,
    };

    try {
      await addPlanet(newPlanet);
      Alert.alert('Éxito', 'El planeta fue agregado correctamente');
      navigation.navigate('PlanetList');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al agregar el planeta');
    }
  };

  const handleSelectPlanet = (planet) => {
    // Completa los campos del formulario con los datos del planeta seleccionado
    setName(planet.name);
    setDescription(planet.description);
    setMoons(planet.moons.toString());
    setMoonNames(planet.moon_names.join(', '));
    setImage(planet.image);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar nuevo planeta</Text>

      {/* Dropdown para seleccionar planetas */}
      <Dropdown data={planets} onSelect={handleSelectPlanet} />

      {/* Campos del formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del planeta"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de lunas"
        value={moons}
        onChangeText={setMoons}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de lunas (separados por coma)"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />

      <Button title="Agregar planeta" onPress={handleAddPlanet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default AddPlanet;
