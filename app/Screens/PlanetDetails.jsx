import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getPlanetById } from '../Services/api';

const PlanetDetails = ({route}) => {
    const {id} = route.params;
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        getPlanetById(id).then((singlePlanet) => setPlanet(singlePlanet));
    }, [id])

    if(!planet) {
        return(
            <View style={styles.center}>
                <Text style={styles.text}>No se encontraron detalles para este planeta</Text>
            </View>
        )
    }
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{planet.name}</Text>
            <Image source={{uri: planet.image}} style={styles.planetImage}/>
            <Text style={styles.description}>{planet.description}</Text>
            <Text style={styles.moons}>Lunas: {planet.moons > 0 ? planet.moons : "No tiene lunas"}</Text>

            {planet.moons > 0 && (
                <View style={styles.moonTitle}>
                    {planet.moon_names.map((moon, index) => (
                        <Text key={index} style={styles.moonName}>{moon}</Text>
                    ))}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planetImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  moons: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moonNames: {
    marginTop: 10,
  },
  moonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moonName: {
    fontSize: 16,
    marginLeft: 10,
  },
});
export default PlanetDetails;