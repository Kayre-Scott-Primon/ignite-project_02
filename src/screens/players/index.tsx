import { useState } from 'react'
import { Header } from "@components/header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "@components/highlight";
import { FlatList } from 'react-native'
import ButtonIcon from "@components/buttonIcon";
import Input from "@components/input";
import Filter from "@components/filter";
import PlayerCard from '@components/playerCard';
import ListEmpty from '@components/listEmpty';
import Button from '@components/button';


export default function Players() {

    const [team, setTeam] = useState('Time a')
    const [players, setPlayers] = useState([])

    return( 
        <Container>
            <Header showBackButton/>
            <Highlight
                title="Nome da turma"
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