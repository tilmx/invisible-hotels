import { Text } from './text';
import { FunctionComponent, ReactNode } from 'react';
import { MapPinIcon } from 'lucide-react';
import { Link } from './utils/link';
import styles from './box.module.scss';

export const Box: FunctionComponent<{ title: string; description: string; children?: ReactNode; }> = props => {
    return (
        <div className={styles.box}>
            <MapPinIcon />
            <Text center size="large" bold>{props.title}</Text>
            <Text center size="regular">{props.description}</Text>
            <Text center size="small">Find out more in our <Link href="legal/privacy-policy">privacy policy</Link>.</Text>
            {props.children}
        </div>
    )
}
