import { useRoute } from '@react-navigation/native';
import { useState } from 'react'

import { 
    Container, 
    Form, 
    HeaderList, 
    NumberOfPlayers 
} from "./styles";
import Input from "@components/input";
import Filter from "@components/filter";
import { FlatList } from 'react-native';
import Button from '@components/button';
import { Header } from "@components/header";
import ListEmpty from '@components/listEmpty';
import PlayerCard from '@components/playerCard';
import ButtonIcon from "@components/buttonIcon";
import { Highlight } from "@components/highlight";

type RouteParams = {
    group: string
}


export default function Players() {

    const [team, setTeam] = useState('Time a')
    const [players, setPlayers] = useState([])
    const route = useRoute()
    const { group } = route.params as RouteParams

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
                />

                <ButtonIcon 
                    icon={'add'}
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
            
            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => {}}
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

            <Button 
                title='Remover Turma'
                type='SECONDARY'
            />

        </Container>
    )
}