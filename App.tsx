import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const addItem = () => {
    if (name && quantity && price) {
      const newItem: Item = {
        id: Math.random().toString(),
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price.replace(',', '.')),
      };
      setItems([...items, newItem]);
      setName('');
      setQuantity('');
      setPrice('');
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const focusNextField = (nextField: 'name' | 'quantity' | 'price') => {
    if (nextField === 'quantity') {
      quantityRef.current?.focus();
    } else if (nextField === 'price') {
      priceRef.current?.focus();
    } else if (nextField === 'add') {
      addItem();
    }
  };

  const quantityRef = React.useRef<TextInput>(null);
  const priceRef = React.useRef<TextInput>(null);

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.darkBackground : styles.lightBackground]}>
      <View style={styles.header}>
        <Text style={[styles.title, darkMode && styles.darkText]}>Lista de Compras</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>Modo Escuro</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Nome do Item"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={() => focusNextField('quantity')}
      />
      <TextInput
        ref={quantityRef}
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Quantidade"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
        returnKeyType="next"
        onSubmitEditing={() => focusNextField('price')}
      />
      <TextInput
        ref={priceRef}
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        returnKeyType="done"
        onSubmitEditing={() => focusNextField('add')}
      />
      <Button title="Adicionar Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, darkMode && styles.darkText]}>
              {item.name} - {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}
            </Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={[styles.totalText, darkMode && styles.darkText]}>Total: R$ {totalValue.replace('.', ',')}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  darkInput: {
    borderColor: '#666',
    backgroundColor: '#333',
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  darkText: {
    color: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
});

export default App;
