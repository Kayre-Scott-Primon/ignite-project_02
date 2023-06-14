import { ButtonIconTypeProps, Container, Icon } from "./styles";
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

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