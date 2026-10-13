import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface Lembrete {
  id: string;
  titulo: string;
  descricao: string;
  recorrencia: 'Única' | 'Diária';
  horario: string;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [recorrencia, setRecorrencia] = useState<'Única' | 'Diária'>('Única');
  const [horario, setHorario] = useState('10:00');

  const handleCadastrarLembrete = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, informe o título do lembrete.');
      return;
    }

    const novoLembrete: Lembrete = {
      id: Date.now().toString(),
      titulo,
      descricao,
      recorrencia,
      horario,
    };

    setLembretes([...lembretes, novoLembrete]);
    setTitulo('');
    setDescricao('');
    Alert.alert('Sucesso!', 'Lembrete cadastrado com sucesso!');
  };

  const cancelarTodosLembretes = () => {
    setLembretes([]);
    Alert.alert('Cancelados', 'Todos os lembretes foram removidos.');
  };

  // Tela 1: Cadastro de Lembrete
  function CadastroScreen() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.headerTitle}>Novo lembrete</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Beber água"
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Um copo de 300 ml"
          placeholderTextColor="#999"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>Repetição</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.optionButton, styles.marginRightButton, recorrencia === 'Única' && styles.optionSelected]}
            onPress={() => setRecorrencia('Única')}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, recorrencia === 'Única' && styles.textSelected]}>Única</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, recorrencia === 'Diária' && styles.optionSelected]}
            onPress={() => setRecorrencia('Diária')}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, recorrencia === 'Diária' && styles.textSelected]}>Diária</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Horário</Text>
        <TextInput
          style={styles.input}
          value={horario}
          onChangeText={setHorario}
          placeholder="08:00"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleCadastrarLembrete} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Salvar lembrete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Tela 2: Lembretes Agendados
  function AgendadosScreen() {
    return (
      <View style={styles.containerList}>
        <Text style={styles.headerTitle}>Agendados</Text>

        {lembretes.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum lembrete cadastrado ainda.</Text>
        ) : (
          <ScrollView style={{ width: '100%' }}>
            {lembretes.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardSubtitle}>
                    {item.recorrencia === 'Diária' ? 'Todo dia' : 'Única'}, {item.horario}
                  </Text>
                  {item.descricao ? <Text style={styles.cardDesc}>{item.descricao}</Text> : null}
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.cancelAllButton} onPress={cancelarTodosLembretes} activeOpacity={0.7}>
              <Text style={styles.cancelAllText}>Cancelar todos</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        }}
      >
        <Tab.Screen name="Cadastro" component={CadastroScreen} />
        <Tab.Screen name="Agendados" component={AgendadosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  containerList: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  marginRightButton: {
    marginRight: 10,
  },
  optionSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 15,
  },
  textSelected: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  cancelAllButton: {
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  cancelAllText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});