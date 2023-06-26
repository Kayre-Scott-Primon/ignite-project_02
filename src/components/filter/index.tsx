import { 
    Container, 
    FilterStyleProps, 
    Title 
} from "./styles";
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & FilterStyleProps & {
    title: string
}

export default function Filter({ title, isActive = false, ...rest}: Props){

    return (
        <Container 
            isActive
            {...rest}
        >
            <Title>{title}</Title>
        </Container>
    )
}