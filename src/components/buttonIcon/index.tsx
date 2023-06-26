import { 
    ButtonIconTypeProps, 
    Container, 
    Icon 
} from "./styles";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
    type?: ButtonIconTypeProps
}

export default function ButtonIcon({icon, type = 'PRIMARY', ...rest}: Props) {
    return (
        <Container>
            <Icon
                icon={icon}
                type={type}
            />
        </Container>
    )
}