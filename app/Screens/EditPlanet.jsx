import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getPlanetById, updatePlanet } from '../Services/api';

const EditPlanet = ({route, navigation}) => {
    const {id} = route.params;
    const[planet, setPlanet] = useState(null);
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[moons, setMoons] = useState('');
    const[moonNames, setMoonNames] = useState('');
    const[image, setImage] = useState('');

    useEffect(() => {
        getPlanetById(id).then((singlePlanet) => setPlanet(singlePlanet));
    },[id])

    useEffect(() => {
    if (planet) {
        setName(planet.name || '');
        setDescription(planet.description || '');
        setMoons(planet.moons || 0);
        setMoonNames(planet.moon_names ? planet.moon_names.join(', ') : '');
        setImage(planet.image || '');
    }
}, [planet]);

    const handleSaveChanges = async () => {
        const updatedPlanet = {
            name,
            description,
            moons: parseInt(moons, 10) || 0,
            moon_names: moonNames.split(", ").map(moon => moon.trim()),
            image
        };

        updatePlanet(id, updatedPlanet);

        setName(updatedPlanet.name);
        setDescription(updatedPlanet.description);
        setMoons(String(updatedPlanet.moons));
        setMoonNames(updatedPlanet.moon_names ?  planet.moon_names.join(', ') : '');
        setImage(updatedPlanet.image);
        
        navigation.navigate('PlanetList');
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Planeta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
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
      <Button title="Actualizar Planeta" onPress={handleSaveChanges} />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default EditPlanet;
