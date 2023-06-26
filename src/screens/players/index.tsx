import { 
    useNavigation, 
    useRoute 
} from '@react-navigation/native';
import { 
    useEffect, 
    useRef, 
    useState 
} from 'react'

import { 
    Container, 
    Form, 
    HeaderList, 
    NumberOfPlayers 
} from "./styles";
import { 
    Alert, 
    FlatList, 
    TextInput 
} from 'react-native';
import Input from "@components/input";
import Filter from "@components/filter";
import Button from '@components/button';
import { AppError } from '@utils/AppError';
import { Header } from "@components/header";
import { Loading } from '@components/loading';
import ListEmpty from '@components/listEmpty';
import PlayerCard from '@components/playerCard';
import ButtonIcon from "@components/buttonIcon";
import { Highlight } from "@components/highlight";

import { PLayerAddByGroup } from '@storage/players/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playerGetByGroupAndTeam';


type RouteParams = {
    group: string
}

export default function Players() {

    const [team, setTeam] = useState('Time a')
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const newPlayerNameInputRef = useRef<TextInput>(null)
    const { group } = route.params as RouteParams
    const navigation = useNavigation()

    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try{
            await PLayerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
                        
            fetchPlayersByTeam()

        }catch(error) {
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayersByTeam(){
        try{
            
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)

        }catch (error){
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível pegar as pessoas do time selecionado')
        } finally {
            setIsLoading(false)
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try{
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch(error) {
            Alert.alert('Remover pessoa','Não foi possível remover essa pessoa.')
        }
    }

    async function groupRemove() {
        try{
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch(error){
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remocer a turma?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove()}
            ]    
        )
    }

    useEffect(() => {
        fetchPlayersByTeam()
    },[team])

    return( 
        <Container>
            <Header showBackButton/>
            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
                />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    inputRef={newPlayerNameInputRef}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />

                <ButtonIcon 
                    icon={'add'}
                    onPress={handleAddPlayer}
                />
            </Form>


            <HeaderList>
                <FlatList
                    data={['Time a', 'Time b']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter 
                        title={item} 
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                /> 
                <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeaderList>
            
            {
                isLoading 
                ? <Loading/>
                :  <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty message="Não há pessoas nesse time."/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        {paddingBottom: 100},
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }


            <Button 
                title='Remover turma'
                type='SECONDARY'
                onPress={handleGroupRemove}
            />

        </Container>
    )
}