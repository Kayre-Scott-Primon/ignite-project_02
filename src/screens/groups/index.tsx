
import * as S from './styles';

import { 
  useCallback, 
  useState 
} from 'react';
import { 
  Alert, 
  FlatList 
} from 'react-native';

import { 
  useFocusEffect, 
  useNavigation 
} from '@react-navigation/native'

import Button from '@components/button';
import { Header } from '@components/header';
import { Loading } from '@components/loading';
import GroupCard from '@components/groupCard';
import ListEmpty from '@components/listEmpty';
import { Highlight } from '@components/highlight';

import { groupGetAll } from '@storage/group/groupGetAll';

export default function Groups() {

  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos']);

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try{ 
      setIsLoading(true)

      const data = await groupGetAll()
      setGroups(data)

    }catch( error ){ 
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]))

  return (
    <S.Container>
      <Header/>
      <Highlight title="Turmas" subtitle="Jogue com a sua turma"/>
      
      {
        isLoading
        ? <Loading/>
        : <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <GroupCard 
                title={item} 
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && {flex: 1}}
            ListEmptyComponent={() => (
              <ListEmpty message="Que tal cadastrar a primeira turma?"/>
            )}
            showsVerticalScrollIndicator={false}
          />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
      
     </S.Container>
  );
}

