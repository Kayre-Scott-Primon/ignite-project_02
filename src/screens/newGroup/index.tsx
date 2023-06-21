import { Header } from "@components/header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/highlight";
import Button from "@components/button";
import Input from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export default function NewGroup(){

    const navigation = useNavigation()
    const [group, setGroup] = useState('')

    function handleNew(){
        navigation.navigate('players', {group})
    }
    
    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon/>
                <Highlight
                    title='Nova turma'
                    subtitle="Cire a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}