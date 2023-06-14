import { Header } from "@components/header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/highlight";
import Button from "@components/button";
import Input from "@components/input";


export default function NewGroup(){

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
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                />
            </Content>
        </Container>
    )
}