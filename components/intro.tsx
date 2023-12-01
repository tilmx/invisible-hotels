import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Color } from './tokens/colors';
import { Text, TextSize } from './text';
import { AccentStyle, AccentedText } from './accented-text';

const StyledText = styled(Text)`
	max-width: 840px;
	width: 95%;
`;

const StyledHeadline = styled(Text)`
	display: inline;
	font-size: .85em;
`;

export const Intro: FunctionComponent = () => {
	return (
		<StyledText size={TextSize.ExtraLarge} serif><StyledHeadline bold size={TextSize.ExtraLarge}>Invisible Hotels</StyledHeadline> are all the <AccentedText italic color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText italic color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText>, and <AccentedText italic color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</StyledText>
	)
}
