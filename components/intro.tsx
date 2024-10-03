import { FunctionComponent } from 'react';
import { Color } from './tokens/colors';
import { Text, TextSize } from './text';
import { AccentStyle, AccentedText } from './accented-text';
import styles from './intro.module.scss';

export const Intro: FunctionComponent = () => {
	return (
		<Text className={styles.intro} size={TextSize.ExtraLarge} serif><Text className={styles.headline} bold size={TextSize.Unset}>Invisible Hotels</Text> are all the <AccentedText italic color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText italic color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText>, and <AccentedText italic color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
	)
}
