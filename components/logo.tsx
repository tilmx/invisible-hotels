import * as React from 'react';
import styled from '@emotion/styled'
import { Breakpoint, Color, Size } from './tokens';

const StyledLogoWrapper = styled.div`
	margin-top: ${Size.XXXXL};
	margin-bottom: ${Size.XL};

	${Breakpoint.Mobile} {
		margin-top: ${Size.XXXL};
	}

	svg {
		overflow: visible;
		max-width: 100%;
		height: auto;
		color: ${Color.Text};
	}
	path {
		transform: rotate(-8deg);
		transform-box: fill-box;
		animation: logoRotate 8s infinite;
	}
	#i1 {
		animation: logoBlink 20s infinite;
		transform-origin: bottom;
		fill: ${Color.Blue};
	}
	#i2 {
		display: none;
	}
	@keyframes logoRotate {
		0%, 100% {
			transform: rotate(3deg);
		}
		90% {
			transform: rotate(-8deg);
		}
	}
	@keyframes logoBlink {
		0%, 2%, 40%, 42%, 70%, 72% {
			transform: scale(1, 1);
			opacity: 1;
		}
		72%, 100% {
			fill: ${Color.Yellow};
		}
		2%, 40% {
			fill: ${Color.Blue};
		}
		42%, 70% {
			fill: ${Color.Green};
		}
		.5%, 40.5%, 70.5% {
			transform: scale(1, 0);
			opacity: .2;
		}
	}
`;

export const Logo: React.FunctionComponent = () => {
	return (
		<StyledLogoWrapper>
			<svg width="728" height="322" viewBox="0 0 728 322" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M522.523 321.4C513.723 321.4 505.99 320 499.323 317.2C492.656 314.267 487.323 310.267 483.323 305.2C479.323 300.133 476.923 294.267 476.123 287.6H501.923C502.723 291.467 504.856 294.8 508.323 297.6C511.923 300.267 516.523 301.6 522.123 301.6C527.723 301.6 531.79 300.467 534.323 298.2C536.99 295.933 538.323 293.333 538.323 290.4C538.323 286.133 536.456 283.267 532.723 281.8C528.99 280.2 523.79 278.667 517.123 277.2C512.856 276.267 508.523 275.133 504.123 273.8C499.723 272.467 495.656 270.8 491.923 268.8C488.323 266.667 485.39 264 483.123 260.8C480.856 257.467 479.723 253.4 479.723 248.6C479.723 239.8 483.19 232.4 490.123 226.4C497.19 220.4 507.056 217.4 519.723 217.4C531.456 217.4 540.79 220.133 547.723 225.6C554.79 231.067 558.99 238.6 560.323 248.2H536.123C534.656 240.867 529.123 237.2 519.523 237.2C514.723 237.2 510.99 238.133 508.323 240C505.79 241.867 504.523 244.2 504.523 247C504.523 249.933 506.456 252.267 510.323 254C514.19 255.733 519.323 257.333 525.723 258.8C532.656 260.4 538.99 262.2 544.723 264.2C550.59 266.067 555.256 268.933 558.723 272.8C562.19 276.533 563.923 281.933 563.923 289C564.056 295.133 562.456 300.667 559.123 305.6C555.79 310.533 550.99 314.4 544.723 317.2C538.456 320 531.056 321.4 522.523 321.4Z" fill="currentColor" />
				<path d="M435.766 319V175H461.366V319H435.766Z" fill="currentColor" />
				<path d="M370.433 321.4C360.433 321.4 351.567 319.267 343.833 315C336.1 310.733 330.033 304.733 325.633 297C321.233 289.267 319.033 280.333 319.033 270.2C319.033 259.933 321.167 250.8 325.433 242.8C329.833 234.8 335.833 228.6 343.433 224.2C351.167 219.667 360.233 217.4 370.633 217.4C380.367 217.4 388.967 219.533 396.433 223.8C403.9 228.067 409.7 233.933 413.833 241.4C418.1 248.733 420.233 256.933 420.233 266C420.233 267.467 420.167 269 420.033 270.6C420.033 272.2 419.967 273.867 419.833 275.6H344.433C344.967 283.333 347.633 289.4 352.433 293.8C357.367 298.2 363.3 300.4 370.233 300.4C375.433 300.4 379.767 299.267 383.233 297C386.833 294.6 389.5 291.533 391.233 287.8H417.233C415.367 294.067 412.233 299.8 407.833 305C403.567 310.067 398.233 314.067 391.833 317C385.567 319.933 378.433 321.4 370.433 321.4ZM370.633 238.2C364.367 238.2 358.833 240 354.033 243.6C349.233 247.067 346.167 252.4 344.833 259.6H394.233C393.833 253.067 391.433 247.867 387.033 244C382.633 240.133 377.167 238.2 370.633 238.2Z" fill="currentColor" />
				<path d="M290.793 319C280.393 319 272.059 316.467 265.793 311.4C259.526 306.333 256.393 297.333 256.393 284.4V241.2H239.393V219.8H256.393L259.393 193.2H281.993V219.8H308.793V241.2H281.993V284.6C281.993 289.4 282.993 292.733 284.993 294.6C287.126 296.333 290.726 297.2 295.793 297.2H308.193V319H290.793Z" fill="currentColor" />
				<path d="M182.811 321.4C173.211 321.4 164.544 319.2 156.811 314.8C149.211 310.4 143.144 304.333 138.611 296.6C134.211 288.733 132.011 279.667 132.011 269.4C132.011 259.133 134.277 250.133 138.811 242.4C143.344 234.533 149.411 228.4 157.011 224C164.744 219.6 173.411 217.4 183.011 217.4C192.477 217.4 201.011 219.6 208.611 224C216.344 228.4 222.411 234.533 226.811 242.4C231.344 250.133 233.611 259.133 233.611 269.4C233.611 279.667 231.344 288.733 226.811 296.6C222.411 304.333 216.344 310.4 208.611 314.8C200.877 319.2 192.277 321.4 182.811 321.4ZM182.811 299.2C189.477 299.2 195.277 296.733 200.211 291.8C205.144 286.733 207.611 279.267 207.611 269.4C207.611 259.533 205.144 252.133 200.211 247.2C195.277 242.133 189.544 239.6 183.011 239.6C176.211 239.6 170.344 242.133 165.411 247.2C160.611 252.133 158.211 259.533 158.211 269.4C158.211 279.267 160.611 286.733 165.411 291.8C170.344 296.733 176.144 299.2 182.811 299.2Z" fill="currentColor" />
				<path d="M0.599609 319V179H26.1996V237.2H88.9996V179H114.6V319H88.9996V258H26.1996V319H0.599609Z" fill="currentColor" />
				<path d="M678.129 146.4C668.129 146.4 659.262 144.267 651.529 140C643.795 135.733 637.729 129.733 633.329 122C628.929 114.267 626.729 105.333 626.729 95.2C626.729 84.9334 628.862 75.8 633.129 67.8C637.529 59.8 643.529 53.6 651.129 49.2C658.862 44.6667 667.929 42.4 678.329 42.4C688.062 42.4 696.662 44.5334 704.129 48.8C711.595 53.0667 717.395 58.9334 721.529 66.4C725.795 73.7334 727.929 81.9334 727.929 91C727.929 92.4667 727.862 94 727.729 95.6C727.729 97.2 727.662 98.8667 727.529 100.6H652.129C652.662 108.333 655.329 114.4 660.129 118.8C665.062 123.2 670.995 125.4 677.929 125.4C683.129 125.4 687.462 124.267 690.929 122C694.529 119.6 697.195 116.533 698.929 112.8H724.929C723.062 119.067 719.929 124.8 715.529 130C711.262 135.067 705.929 139.067 699.529 142C693.262 144.933 686.129 146.4 678.129 146.4ZM678.329 63.2C672.062 63.2 666.529 65 661.729 68.6C656.929 72.0667 653.862 77.4 652.529 84.6H701.929C701.529 78.0667 699.129 72.8667 694.729 69C690.329 65.1334 684.862 63.2 678.329 63.2Z" fill="currentColor" />
				<path d="M584.172 144V0H609.772V144H584.172Z" fill="currentColor" />
				<path d="M518.503 146.4C511.036 146.4 504.503 145 498.903 142.2C493.303 139.4 488.77 135.467 485.303 130.4L482.503 144H459.703V0H485.303V59C488.503 54.6 492.703 50.7333 497.903 47.4C503.236 44.0667 510.103 42.4 518.503 42.4C527.836 42.4 536.17 44.6667 543.503 49.2C550.836 53.7333 556.636 59.9333 560.903 67.8C565.17 75.6667 567.303 84.6 567.303 94.6C567.303 104.6 565.17 113.533 560.903 121.4C556.636 129.133 550.836 135.267 543.503 139.8C536.17 144.2 527.836 146.4 518.503 146.4ZM513.103 124C521.236 124 527.97 121.267 533.303 115.8C538.636 110.333 541.303 103.267 541.303 94.6C541.303 85.9333 538.636 78.8 533.303 73.2C527.97 67.6 521.236 64.8 513.103 64.8C504.836 64.8 498.036 67.6 492.703 73.2C487.503 78.6667 484.903 85.7333 484.903 94.4C484.903 103.067 487.503 110.2 492.703 115.8C498.036 121.267 504.836 124 513.103 124Z" fill="currentColor" />
				<path d="M413.383 144V44.8H438.983V144H413.383Z" fill="currentColor" />
				<path id="i2" d="M414.582 25.2C417.648 28 421.515 29.4 426.182 29.4C430.848 29.4 434.648 28 437.582 25.2C440.648 22.4 442.182 18.8667 442.182 14.6C442.182 10.3333 440.648 6.86666 437.582 4.19999C434.648 1.4 430.848 0 426.182 0C421.515 0 417.648 1.4 414.582 4.19999C411.648 6.86666 410.182 10.3333 410.182 14.6C410.182 18.8667 411.648 22.4 414.582 25.2Z" fill="currentColor" />
				<path d="M354.304 146.4C345.504 146.4 337.771 145 331.104 142.2C324.438 139.267 319.104 135.267 315.104 130.2C311.104 125.133 308.704 119.267 307.904 112.6H333.704C334.504 116.467 336.638 119.8 340.104 122.6C343.704 125.267 348.304 126.6 353.904 126.6C359.504 126.6 363.571 125.467 366.104 123.2C368.771 120.933 370.104 118.333 370.104 115.4C370.104 111.133 368.238 108.267 364.504 106.8C360.771 105.2 355.571 103.667 348.904 102.2C344.638 101.267 340.304 100.133 335.904 98.8C331.504 97.4667 327.438 95.8 323.704 93.8C320.104 91.6667 317.171 89 314.904 85.8C312.638 82.4667 311.504 78.4 311.504 73.6C311.504 64.8 314.971 57.4 321.904 51.4C328.971 45.4 338.838 42.4 351.504 42.4C363.238 42.4 372.571 45.1334 379.504 50.6C386.571 56.0667 390.771 63.6 392.104 73.2H367.904C366.438 65.8667 360.904 62.2 351.304 62.2C346.504 62.2 342.771 63.1334 340.104 65C337.571 66.8667 336.304 69.2 336.304 72C336.304 74.9334 338.238 77.2667 342.104 79C345.971 80.7334 351.104 82.3334 357.504 83.8C364.438 85.4 370.771 87.2 376.504 89.2C382.371 91.0667 387.038 93.9334 390.504 97.8C393.971 101.533 395.704 106.933 395.704 114C395.838 120.133 394.238 125.667 390.904 130.6C387.571 135.533 382.771 139.4 376.504 142.2C370.238 145 362.838 146.4 354.304 146.4Z" fill="currentColor" />
				<path d="M266.984 144V44.8H292.584V144H266.984Z" fill="currentColor" />
				<path id="i1" d="M268.183 25.2C271.25 28 275.117 29.4 279.783 29.4C284.45 29.4 288.25 28 291.183 25.2C294.25 22.4 295.783 18.8667 295.783 14.6C295.783 10.3333 294.25 6.86666 291.183 4.19999C288.25 1.4 284.45 0 279.783 0C275.117 0 271.25 1.4 268.183 4.19999C265.25 6.86666 263.783 10.3333 263.783 14.6C263.783 18.8667 265.25 22.4 268.183 25.2Z" fill="currentColor" />
				<path d="M188.238 144L151.838 44.8H178.638L203.838 119.8L229.038 44.8H255.838L219.238 144H188.238Z" fill="currentColor" />
				<path d="M46.7344 144V44.8H69.3344L71.3344 61.6C74.401 55.7334 78.801 51.0667 84.5344 47.6C90.401 44.1334 97.2677 42.4 105.134 42.4C117.401 42.4 126.934 46.2667 133.734 54C140.534 61.7334 143.934 73.0667 143.934 88V144H118.334V90.4C118.334 81.8667 116.601 75.3334 113.134 70.8C109.668 66.2667 104.268 64 96.9344 64C89.7344 64 83.801 66.5334 79.1344 71.6C74.601 76.6667 72.3344 83.7334 72.3344 92.8V144H46.7344Z" fill="currentColor" />
				<path d="M0.599609 144V4H26.1996V144H0.599609Z" fill="currentColor" />
			</svg>
		</StyledLogoWrapper>
	)
}
