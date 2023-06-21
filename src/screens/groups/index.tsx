
import * as S from './styles';
import { useState } from 'react';
import { FlatList } from 'react-native';
import Button from '@components/button';
import { Header } from '@components/header';
import GroupCard from '@components/groupCard';
import ListEmpty from '@components/listEmpty';
import { Highlight } from '@components/highlight';
import { useNavigation } from '@react-navigation/native'

export default function Groups() {

  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos']);

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new');
  }

  return (
    <S.Container>
      <Header/>
      <Highlight title="Turmas" subtitle="Jogue com a sua turma"/>
      
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
            onPress={() => {}}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?"/>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
      
     </S.Container>
  );
}

