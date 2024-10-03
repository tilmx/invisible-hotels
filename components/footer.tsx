import { FunctionComponent } from 'react';
import { Link } from './utils/link';
import { Text, TextSize } from './text';
import { Wrapper } from './wrapper';
import styles from './footer.module.scss';
import clsx from 'clsx';

export const Footer: FunctionComponent<{ reducedPadding?: boolean; }> = props => {
    return (
        <div className={clsx(styles.footer, props.reducedPadding && styles.reducedPadding)}>
            <Wrapper>
                <div className={styles.content}>
                    <div className={styles.links}>
                        <Link href='/legal/sites-notice'>
                            <Text size={TextSize.Regular}>Site’s notice</Text>
                        </Link>
                        <Link href='/legal/privacy-policy'>
                            <Text size={TextSize.Regular}>Privacy Policy</Text>
                        </Link>
                        <Link className={styles.github} href="https://github.com/tilmx/invisible-hotels" target="_blank">
                            <svg width="98" height="96" viewBox='0 0 98 96' xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
                            </svg>
                            <Text size={TextSize.Regular}>Open on Github</Text>
                        </Link>
                    </div>
                    <a className={styles.madeBy} href="https://tilman.io" target='_blank'>
                        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M64 116C92.7188 116 116 92.7188 116 64C116 35.2812 92.7188 12 64 12C35.2812 12 12 35.2812 12 64C12 92.7188 35.2812 116 64 116ZM64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z" fill="currentColor" />
                            <path d="M39 44C39 41.7909 40.7909 40 43 40H85C87.2091 40 89 41.7909 89 44V48C89 50.2091 87.2091 52 85 52H43C40.7909 52 39 50.2091 39 48V44Z" fill="currentColor" />
                            <path d="M58 44C58 41.7909 59.7909 40 62 40H66C68.2091 40 70 41.7909 70 44V86C70 88.2091 68.2091 90 66 90H62C59.7909 90 58 88.2091 58 86V44Z" fill="currentColor" />
                        </svg>
                        <div className={styles.label}>
                            <Text size={TextSize.Small} style={{ opacity: .5 }}>A project by</Text>
                            <Text>tilman.io</Text>
                        </div>
                    </a>
                </div>
            </Wrapper>
        </div>
    )
}
