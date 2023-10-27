import styled from "@emotion/styled";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";

export enum AccentStyle {
	Circled,
	Scribbled,
	Underlined
}

const StyledSpan = styled.span<{ color: string; italic?: boolean; }>`
	color: ${props => props.color};
	${props => props.italic && 'font-style: italic;'}
	position: relative;
	display: inline-block;
	transition: color .1s;

	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: .3;
		pointer-events: none;
		overflow: visible;
	}
`;

export const AccentedText: FunctionComponent<{ accentStyle?: AccentStyle; italic?: boolean; color: string; children?: ReactNode; onMouseEnter?: MouseEventHandler; onMouseOut?: MouseEventHandler }> = props => {
	return (
		<StyledSpan italic={props.italic} color={props.color} onMouseEnter={props.onMouseEnter} onMouseOut={props.onMouseOut} >
			{props.children}
			{props.accentStyle === AccentStyle.Circled &&
				<svg width="435" height="96" viewBox="0 0 435 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M195.314 18.2016C130.524 18.0539 0.756665 26.2648 0.00366236 60.2895C-0.937591 102.82 179.783 107.25 276.261 97.9468C372.74 88.6432 467.806 52.3147 424.038 27.505C389.024 7.6573 228.414 5.05819 152.487 6.2396" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
				</svg>
			}
			{props.accentStyle === AccentStyle.Scribbled &&
				<svg width="191" height="96" viewBox="0 0 191 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M-11 99.9215C-0.758113 92.1192 21.0425 77.072 26.3097 79.3013C32.8938 82.0878 7.65487 98.2493 19.177 99.9215C30.6991 101.594 51 75.9571 59.7788 79.3013C68.5575 82.6454 51.5487 99.9215 59.7788 99.9215C68.0088 99.9215 78.9823 79.3013 93.2478 79.3013C107.513 79.3013 85.5664 95.4633 98.1858 95.4633C110.805 95.4633 126.168 83.2026 135.496 83.2026C144.823 83.2026 128.912 93.2341 141.531 95.4633C154.15 97.6925 166.221 79.3013 175 79.3013" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
				</svg>
			}
			{props.accentStyle === AccentStyle.Underlined &&
				<svg width="202" height="96" viewBox="0 0 202 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 91.5054C27.9364 88.8217 193 81.6758 193 94.0053C193 99.6053 94.3333 102.339 45 103.005" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
				</svg>
			}
		</StyledSpan>
	)
}
