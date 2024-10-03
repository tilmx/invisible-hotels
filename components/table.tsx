import { FunctionComponent, ReactNode } from 'react';
import { Text, TextSize } from './text';
import { Check, HelpCircle, X } from 'lucide-react';
import { AlignItems, Flex, JustifyContent } from './utils/flex';
import styles from './table.module.scss';
import clsx from 'clsx';

interface TableProps {
    backgroundColor?: string;
    data: {
        label: string;
        value?: string | number | boolean;
        content?: ReactNode;
    }[]
}

export const Table: FunctionComponent<TableProps> = props => {
    return (
        <div className={styles.table}>
            {props.data.map((row, i) =>
                <div className={styles.row} key={i}>
                    <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.Center}>
                        <Text size={TextSize.SuperLarge} serif>{row.label}</Text>
                        {typeof row.value === 'string' || typeof row.value === 'number' &&
                            <Text size={TextSize.Large}>{row.value}</Text>
                        }
                        {typeof row.value === 'boolean' &&
                            <div className={clsx(styles.iconWrapper, !row.value && styles.greyedOut)}>
                                {row.value ? <Check color={props.backgroundColor} /> : <X />}
                            </div>
                        }
                        {typeof row.value === 'undefined' &&
                            <div className={clsx(styles.iconWrapper, styles.greyedOut)}>
                                <HelpCircle />
                            </div>
                        }
                    </Flex>
                    {row.content}
                </div>
            )}
        </div>
    )
}
