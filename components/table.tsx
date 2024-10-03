import { FunctionComponent, ReactNode } from 'react';
import { Text } from './text';
import { Check, HelpCircle, X } from 'lucide-react';
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
                    <div className={styles.rowInner}>
                        <Text size="superlarge" serif>{row.label}</Text>
                        {typeof row.value === 'string' || typeof row.value === 'number' &&
                            <Text size="large">{row.value}</Text>
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
                    </div>
                    {row.content}
                </div>
            )}
        </div>
    )
}
