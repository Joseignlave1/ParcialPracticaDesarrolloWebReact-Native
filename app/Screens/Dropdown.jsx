import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

const Dropdown = ({ data, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>
          {selectedItem ? selectedItem.name : 'Seleccione un planeta'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 200, // Limitar la altura
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Dropdown;
