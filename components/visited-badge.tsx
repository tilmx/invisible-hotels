import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';

const StyledContainer = styled.div`
    display: inline-block;
    position: relative;
`;

const StyledVisitedBadge = styled.svg<{ small?: boolean; }>`
    animation: rotateBadge 30s infinite linear;
    width: calc(${Size.XXXL} * 2);
    height: calc(${Size.XXXL} * 2);

    @keyframes rotateBadge {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    ${props => props.small && `
        width: calc(${Size.XXL} * 2);
        height: calc(${Size.XXL} * 2);
    `}

    ${Breakpoint.TabletSmall} {
        width: calc(${Size.XXL} * 2);
        height: calc(${Size.XXL} * 2);
    }

    ${Breakpoint.Mobile} {
        width: ${Size.XXXL};
        height: ${Size.XXXL};
    }
`;

const StyledEmoji = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;

    ${Breakpoint.Mobile} {
        font-size: 44px;
    }
`;

export const VisitedBadge: FunctionComponent<{ small?: boolean; className?: string; }> = props => {
    return (
        <StyledContainer className={props.className}>
            <StyledEmoji>✌️</StyledEmoji>
            <StyledVisitedBadge small={props.small} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="2" />
                <path d="M172.728 104.21L191.645 102.207L191.175 105.156L175.595 106.364L189.944 112.893L189.462 115.92L173.816 117.542L188.251 123.527L187.781 126.477L170.46 118.626L170.971 115.418L185.806 113.72L172.252 107.371L172.728 104.21Z" fill="currentColor" />
                <path d="M166.034 129.215C166.553 128.05 167.27 127.126 168.185 126.444C169.11 125.785 170.148 125.406 171.301 125.307C172.454 125.209 173.645 125.433 174.873 125.98C176.118 126.534 177.101 127.268 177.822 128.181C178.536 129.111 178.958 130.14 179.087 131.268C179.208 132.412 179.003 133.582 178.47 134.779C177.952 135.944 177.237 136.84 176.327 137.467C175.433 138.102 174.449 138.467 173.374 138.562C172.299 138.657 171.243 138.474 170.206 138.012C170.046 137.941 169.874 137.855 169.69 137.754C169.514 137.675 169.318 137.579 169.102 137.463L173.215 128.224C172.03 127.792 170.986 127.777 170.081 128.177C169.185 128.6 168.538 129.259 168.141 130.152C167.821 130.871 167.714 131.54 167.82 132.161C167.935 132.805 168.219 133.37 168.671 133.858L167.541 136.396C166.566 135.579 165.917 134.525 165.593 133.234C165.262 131.959 165.409 130.619 166.034 129.215ZM176.398 133.828C176.775 132.983 176.853 132.119 176.634 131.237C176.431 130.363 175.858 129.63 174.917 129.039L171.934 135.741C172.88 136.105 173.76 136.105 174.572 135.74C175.385 135.375 175.994 134.738 176.398 133.828Z" fill="currentColor" />
                <path d="M155.67 145.957C156.716 144.692 157.888 143.905 159.186 143.596C160.484 143.286 161.695 143.494 162.818 144.219L161.032 146.379C160.485 146.109 159.877 146.036 159.206 146.162C158.549 146.298 157.948 146.697 157.403 147.356C156.868 148.002 156.613 148.585 156.638 149.104C156.662 149.622 156.849 150.026 157.199 150.316C157.711 150.739 158.227 150.814 158.747 150.541C159.269 150.293 159.905 149.867 160.654 149.262C161.242 148.797 161.871 148.365 162.541 147.967C163.199 147.582 163.866 147.351 164.541 147.275C165.218 147.223 165.873 147.459 166.506 147.982C167.381 148.705 167.83 149.643 167.852 150.795C167.888 151.957 167.405 153.145 166.403 154.356C165.479 155.473 164.464 156.153 163.358 156.394C162.241 156.649 161.141 156.43 160.058 155.739L161.761 153.68C162.248 153.968 162.751 154.045 163.272 153.909C163.781 153.786 164.264 153.448 164.72 152.897C165.165 152.358 165.396 151.846 165.412 151.361C165.442 150.887 165.281 150.505 164.931 150.215C164.581 149.926 164.138 149.9 163.603 150.137C163.056 150.387 162.423 150.782 161.705 151.322C161 151.872 160.314 152.347 159.644 152.745C158.977 153.168 158.31 153.399 157.644 153.437C156.978 153.476 156.281 153.194 155.554 152.593C154.628 151.85 154.162 150.864 154.157 149.636C154.142 148.422 154.646 147.196 155.67 145.957Z" fill="currentColor" />
                <path d="M146.832 155.379C147.784 154.531 148.744 154.086 149.712 154.044C150.691 154.014 151.709 154.593 152.765 155.78L157.033 160.575L158.696 159.095L160.247 160.837L158.583 162.317L160.523 165.01L158.703 166.629L156.509 164.163L153.769 166.602L152.218 164.86L154.958 162.422L150.691 157.627C150.215 157.092 149.773 156.818 149.365 156.807C148.956 156.82 148.471 157.077 147.91 157.576L146.795 158.569L145.227 156.807L146.832 155.379Z" fill="currentColor" />
                <path d="M139.769 160.267C140.697 159.677 141.562 159.344 142.363 159.269C143.164 159.194 143.872 159.313 144.485 159.627C145.108 159.955 145.612 160.421 145.996 161.025C146.671 162.086 146.793 163.189 146.362 164.333C145.93 165.477 144.948 166.537 143.416 167.512L140.542 169.34L140.668 169.539C141.212 170.394 141.856 170.885 142.599 171.012C143.328 171.149 144.061 170.983 144.798 170.514C145.446 170.101 145.91 169.578 146.19 168.945C146.465 168.335 146.457 167.688 146.166 167.003L148.51 165.513C148.942 166.355 149.108 167.202 149.008 168.053C148.902 168.927 148.589 169.737 148.069 170.482C147.544 171.251 146.854 171.907 145.999 172.451C144.467 173.426 143.023 173.776 141.667 173.5C140.321 173.238 139.207 172.415 138.325 171.03L134.036 164.288L136.069 162.994L137.464 164.746C137.389 163.945 137.515 163.151 137.842 162.363C138.169 161.575 138.811 160.877 139.769 160.267ZM140.514 162.464C139.881 162.867 139.444 163.352 139.204 163.918C138.959 164.509 138.878 165.13 138.961 165.781C139.029 166.442 139.226 167.093 139.551 167.734L142.16 166.075C143.088 165.484 143.648 164.9 143.84 164.323C144.017 163.755 143.95 163.228 143.641 162.741C143.322 162.24 142.885 161.96 142.329 161.899C141.767 161.863 141.163 162.051 140.514 162.464Z" fill="currentColor" />
                <path d="M128.749 160.434L128.345 167.939L129.052 167.661L138.188 176.883L135.383 177.983L128.163 170.487L127.798 180.96L125.066 182.032L126.018 161.506L128.749 160.434Z" fill="currentColor" />
                <path d="M112.794 171.056C114.049 170.832 115.216 170.907 116.294 171.282C117.359 171.677 118.255 172.324 118.984 173.223C119.712 174.122 120.195 175.233 120.432 176.557C120.672 177.898 120.616 179.124 120.264 180.233C119.896 181.346 119.281 182.273 118.419 183.012C117.541 183.755 116.457 184.242 115.167 184.472C113.912 184.697 112.769 184.608 111.74 184.207C110.713 183.823 109.858 183.213 109.176 182.376C108.494 181.54 108.054 180.563 107.854 179.446C107.823 179.274 107.798 179.083 107.778 178.874C107.744 178.685 107.714 178.468 107.688 178.224L117.644 176.444C117.336 175.221 116.763 174.348 115.924 173.824C115.071 173.32 114.163 173.154 113.2 173.326C112.426 173.464 111.812 173.752 111.358 174.188C110.89 174.644 110.58 175.196 110.43 175.844L107.696 176.333C107.825 175.068 108.333 173.939 109.22 172.947C110.09 171.957 111.281 171.327 112.794 171.056ZM114.792 182.224C115.703 182.061 116.462 181.641 117.068 180.965C117.678 180.306 117.963 179.421 117.924 178.31L110.703 179.602C110.933 180.59 111.427 181.317 112.185 181.785C112.943 182.253 113.812 182.399 114.792 182.224Z" fill="currentColor" />
                <path d="M98.5304 172.176C99.7874 172.215 100.887 172.546 101.829 173.169C102.771 173.792 103.496 174.627 104.006 175.674C104.515 176.721 104.75 177.899 104.709 179.208C104.669 180.518 104.362 181.67 103.79 182.666C103.217 183.68 102.441 184.46 101.463 185.006C100.467 185.569 99.3407 185.832 98.0837 185.793C97.0536 185.761 96.1607 185.532 95.4049 185.107C94.6317 184.681 94.0382 184.095 93.6244 183.348L93.3817 191.205L90.6059 191.119L91.1882 172.264L93.676 172.341L93.9018 174.366C94.3397 173.768 94.9325 173.245 95.6804 172.796C96.4282 172.347 97.3782 172.141 98.5304 172.176ZM97.9585 174.57C96.7713 174.533 95.7897 174.914 95.0136 175.711C94.2201 176.508 93.8034 177.552 93.7635 178.844C93.7231 180.154 94.0745 181.222 94.8179 182.048C95.5433 182.892 96.4995 183.332 97.6867 183.369C98.8739 183.406 99.8642 183.026 100.658 182.229C101.451 181.449 101.867 180.405 101.908 179.096C101.934 178.24 101.783 177.475 101.454 176.801C101.126 176.127 100.662 175.588 100.063 175.185C99.4455 174.799 98.7441 174.594 97.9585 174.57Z" fill="currentColor" />
                <path d="M82.9895 170.771L77.0312 188.67L74.3962 187.793L76.9119 180.235C76.2604 180.81 75.5038 181.175 74.6422 181.33C73.7585 181.496 72.8693 181.43 71.9743 181.132C70.4994 180.641 69.4938 179.791 68.9575 178.582C68.4213 177.372 68.4593 175.848 69.0717 174.008L71.4302 166.923L74.0404 167.792L71.7729 174.604C70.9785 176.99 71.5342 178.5 73.44 179.135C74.4344 179.466 75.3789 179.394 76.2735 178.918C77.1515 178.437 77.8057 177.551 78.236 176.258L80.3545 169.894L82.9895 170.771Z" fill="currentColor" />
                <path d="M64.3258 162.77C65.433 163.403 66.2803 164.208 66.8677 165.187C67.4313 166.173 67.7046 167.244 67.6876 168.401C67.6706 169.558 67.3287 170.721 66.6617 171.888C65.9862 173.072 65.1577 173.976 64.1765 174.603C63.1801 175.22 62.1143 175.537 60.9791 175.553C59.8287 175.559 58.6847 175.238 57.5471 174.588C56.4399 173.956 55.6196 173.156 55.0864 172.188C54.5445 171.234 54.2799 170.218 54.2925 169.14C54.3052 168.061 54.5931 167.028 55.156 166.042C55.2427 165.891 55.3455 165.728 55.4646 165.555C55.5599 165.388 55.6757 165.203 55.8122 164.999L64.5944 170.014C65.1422 168.879 65.2621 167.841 64.9542 166.901C64.6224 165.967 64.0319 165.258 63.1825 164.773C62.4999 164.383 61.8445 164.21 61.2162 164.253C60.5641 164.303 59.9727 164.529 59.4421 164.93L57.0304 163.553C57.94 162.664 59.0535 162.123 60.3706 161.93C61.6726 161.728 62.991 162.008 64.3258 162.77ZM58.7002 172.622C59.5041 173.081 60.3555 173.245 61.2546 173.115C62.145 173 62.9313 172.504 63.6134 171.626L57.2429 167.988C56.7861 168.894 56.6986 169.769 56.9805 170.614C57.2624 171.459 57.8356 172.128 58.7002 172.622Z" fill="currentColor" />
                <path d="M56.9583 158.435L48.7875 168.54L46.8521 166.976L48.2172 164.912C47.3259 165.292 46.4142 165.42 45.4819 165.295C44.525 165.173 43.5984 164.749 42.702 164.024L44.5305 161.763L45.1213 162.24C45.719 162.724 46.3378 163.056 46.9779 163.236C47.5935 163.419 48.236 163.389 48.9057 163.144C49.5507 162.902 50.2082 162.367 50.8781 161.538L54.7987 156.689L56.9583 158.435Z" fill="currentColor" />
                <path d="M46.389 148.339C47.2436 149.286 47.7971 150.316 48.0496 151.429C48.2774 152.541 48.2027 153.644 47.8254 154.738C47.4482 155.832 46.7605 156.83 45.7624 157.731C44.7513 158.644 43.6819 159.245 42.5541 159.534C41.4147 159.81 40.3033 159.778 39.22 159.438C38.1249 159.086 37.1384 158.424 36.2604 157.451C35.4058 156.505 34.8763 155.489 34.6719 154.402C34.4546 153.328 34.5203 152.28 34.8691 151.259C35.2179 150.238 35.8136 149.347 36.6561 148.586C36.7858 148.469 36.9342 148.347 37.1015 148.219C37.2441 148.09 37.412 147.95 37.6051 147.799L44.3834 155.305C45.2581 154.397 45.696 153.449 45.6969 152.459C45.6731 151.469 45.3335 150.611 44.6779 149.885C44.1511 149.301 43.5825 148.932 42.972 148.778C42.3369 148.622 41.7047 148.651 41.0753 148.867L39.214 146.805C40.3555 146.245 41.5821 146.079 42.8938 146.306C44.1937 146.521 45.3588 147.199 46.389 148.339ZM37.9696 155.943C38.5901 156.63 39.3477 157.052 40.2425 157.209C41.1243 157.377 42.0262 157.151 42.9482 156.53L38.0314 151.086C37.3147 151.804 36.9584 152.608 36.9625 153.499C36.9666 154.389 37.3023 155.204 37.9696 155.943Z" fill="currentColor" />
                <path d="M28.1161 134.188L25.9258 134.908L19.8305 116.365L22.0208 115.645L28.1161 134.188Z" fill="currentColor" />
                <path d="M27.2639 95.8483L8.34766 97.8514L8.81718 94.9017L24.3967 93.694L10.0486 87.1653L10.5305 84.138L26.176 82.5163L11.7414 76.531L12.2109 73.5813L29.5321 81.4322L29.0214 84.6406L14.1863 86.3382L27.7405 92.6875L27.2639 95.8483Z" fill="currentColor" />
                <path d="M33.9071 70.9234C33.3886 72.0883 32.6716 73.0118 31.7561 73.6941C30.8317 74.3533 29.7931 74.7322 28.6403 74.8309C27.4875 74.9295 26.2967 74.7054 25.068 74.1585C23.8234 73.6044 22.8404 72.8705 22.1191 71.9568C21.405 71.0271 20.9835 69.9982 20.8546 68.8702C20.7329 67.7263 20.9384 66.5559 21.4712 65.3591C21.9897 64.1942 22.704 63.2982 23.6142 62.6709C24.5084 62.0365 25.4929 61.6717 26.5676 61.5765C27.6424 61.4814 28.6984 61.6647 29.7356 62.1264C29.8952 62.1974 30.0672 62.2835 30.2516 62.3847C30.4271 62.4628 30.623 62.5596 30.8393 62.675L26.7266 71.9142C27.9111 72.3458 28.9556 72.3615 29.8603 71.9612C30.7562 71.5379 31.403 70.8794 31.8008 69.9858C32.1204 69.2677 32.2272 68.5983 32.1211 67.9775C32.0062 67.3337 31.7228 66.7678 31.2708 66.2798L32.4002 63.7426C33.3752 64.559 34.0245 65.6128 34.3483 66.9041C34.6793 68.1794 34.5322 69.5192 33.9071 70.9234ZM23.5429 66.31C23.1665 67.1557 23.0879 68.0194 23.3073 68.9009C23.5108 69.7753 24.0832 70.5081 25.0246 71.0992L28.0078 64.3972C27.061 64.0331 26.1814 64.0335 25.3689 64.3983C24.5565 64.7632 23.9478 65.4004 23.5429 66.31Z" fill="currentColor" />
                <path d="M44.2172 54.1828C43.171 55.4482 41.9988 56.2355 40.7006 56.5447C39.4025 56.8538 38.1918 56.646 37.0686 55.9213L38.8549 53.7608C39.4016 54.0315 40.0102 54.1041 40.6806 53.9785C41.3376 53.8417 41.9388 53.4436 42.4842 52.784C43.0184 52.1378 43.2733 51.5554 43.249 51.0366C43.2246 50.5179 43.0374 50.1138 42.6874 49.8244C42.1759 49.4015 41.6601 49.3263 41.1401 49.599C40.6177 49.847 39.982 50.2732 39.2329 50.8777C38.6443 51.3429 38.0153 51.7747 37.3459 52.1732C36.6877 52.5581 36.021 52.7888 35.3459 52.8652C34.6685 52.9171 34.0134 52.6814 33.3807 52.1583C32.5057 51.4349 32.0571 50.4973 32.0347 49.3457C31.9989 48.1829 32.4819 46.9957 33.4836 45.7842C34.4073 44.6669 35.4223 43.9876 36.5284 43.7462C37.6456 43.4914 38.7456 43.7097 39.8285 44.4011L38.1256 46.4606C37.6392 46.1718 37.1357 46.0955 36.6151 46.2317C36.1057 46.3544 35.6228 46.6917 35.1665 47.2436C34.7213 47.7821 34.4907 48.294 34.4747 48.7794C34.4452 49.2536 34.6055 49.6354 34.9555 49.9248C35.3055 50.2141 35.7484 50.2404 36.2842 50.0035C36.8311 49.7531 37.4636 49.3582 38.1817 48.8187C38.8862 48.2681 39.5732 47.7935 40.2426 47.3951C40.9096 46.9721 41.5763 46.7414 42.2426 46.703C42.9089 46.6647 43.6055 46.946 44.3324 47.547C45.2589 48.2904 45.7245 49.276 45.7293 50.5037C45.7452 51.718 45.2411 52.9444 44.2172 54.1828Z" fill="currentColor" />
                <path d="M52.9456 44.8236C51.9931 45.6713 51.0331 46.1165 50.0656 46.1591C49.0865 46.1887 48.0686 45.6099 47.0119 44.4225L42.7444 39.6275L41.0809 41.1081L39.5306 39.3662L41.1942 37.8856L39.2539 35.1932L41.0741 33.5733L43.2688 36.0393L46.0088 33.6007L47.559 35.3426L44.819 37.7812L49.0865 42.5762C49.5626 43.1111 50.0045 43.3843 50.4121 43.3957C50.8211 43.3823 51.3061 43.126 51.8672 42.6267L52.9828 41.6339L54.5504 43.3953L52.9456 44.8236Z" fill="currentColor" />
                <path d="M60.0241 39.865C59.0957 40.4558 58.2309 40.7886 57.4298 40.8636C56.6287 40.9385 55.9214 40.8192 55.3079 40.5057C54.685 40.1775 54.1813 39.7113 53.7969 39.1071C53.1218 38.046 52.9999 36.9435 53.4314 35.7995C53.8628 34.6555 54.8448 33.5959 56.3775 32.6207L59.2511 30.7923L59.1245 30.5934C58.5807 29.7387 57.937 29.2476 57.1935 29.1203C56.4648 28.9836 55.732 29.1497 54.9952 29.6185C54.3467 30.0311 53.8825 30.5542 53.6025 31.1878C53.3278 31.7973 53.3358 32.4444 53.6265 33.1289L51.2834 34.6198C50.8507 33.7771 50.6847 32.9305 50.7852 32.0798C50.8911 31.205 51.2039 30.3952 51.7238 29.6504C52.249 28.8815 52.9389 28.2252 53.7936 27.6813C55.3262 26.7062 56.7704 26.3566 58.1261 26.6327C59.4724 26.894 60.5862 27.7173 61.4676 29.1025L65.7573 35.8445L63.7237 37.1385L62.3293 35.3861C62.4042 36.1872 62.2782 36.9816 61.9513 37.7693C61.6244 38.557 60.982 39.2556 60.0241 39.865ZM59.2788 37.6687C59.9124 37.2655 60.3492 36.7806 60.589 36.2139C60.8342 35.6231 60.9153 35.0022 60.8323 34.3512C60.764 33.6907 60.5671 33.0396 60.2416 32.3979L57.6333 34.0576C56.7049 34.6483 56.1448 35.2323 55.9532 35.8097C55.7764 36.3777 55.8426 36.9048 56.1521 37.3911C56.4709 37.8922 56.9082 38.1729 57.4642 38.2332C58.0255 38.2694 58.6303 38.0812 59.2788 37.6687Z" fill="currentColor" />
                <path d="M71.0983 39.6276L71.5026 32.1231L70.7953 32.4007L61.6602 23.1795L64.4649 22.0788L71.6847 29.5749L72.05 19.1022L74.7816 18.0302L73.8299 38.5557L71.0983 39.6276Z" fill="currentColor" />
                <path d="M87.2996 28.9281C86.0436 29.1478 84.8771 29.0682 83.8 28.6891C82.7372 28.2899 81.8432 27.6395 81.1181 26.7379C80.393 25.8363 79.9145 24.7231 79.6828 23.3982C79.448 22.0562 79.5086 20.831 79.8644 19.7226C80.2374 18.6112 80.856 17.6873 81.7201 16.951C82.6015 16.2116 83.6874 15.7291 84.9778 15.5034C86.2338 15.2837 87.376 15.3764 88.4044 15.7817C89.4299 16.1698 90.2819 16.7832 90.9606 17.622C91.6393 18.4608 92.0764 19.4394 92.272 20.5577C92.3021 20.7298 92.3266 20.9205 92.3456 21.13C92.3787 21.3193 92.4077 21.5358 92.4326 21.7797L82.4707 23.5223C82.7734 24.7461 83.3433 25.6216 84.1803 26.149C85.0314 26.6562 85.9388 26.8255 86.9023 26.657C87.6765 26.5216 88.2916 26.2366 88.7476 25.8023C89.2178 25.3476 89.5292 24.7967 89.682 24.1493L92.4176 23.6708C92.2842 24.9354 91.7721 26.0623 90.8812 27.0515C90.0075 28.0377 88.8136 28.6633 87.2996 28.9281ZM85.3448 17.7532C84.4329 17.9127 83.6724 18.3294 83.0633 19.0034C82.4512 19.6602 82.1625 20.5441 82.1973 21.6551L89.4235 20.391C89.1973 19.4022 88.7062 18.6724 87.9501 18.2018C87.1939 17.7312 86.3255 17.5816 85.3448 17.7532Z" fill="currentColor" />
                <path d="M101.298 27.8195C100.041 27.7807 98.9412 27.4497 97.9994 26.8264C97.0575 26.2032 96.3319 25.3682 95.8225 24.3214C95.3131 23.2747 95.0786 22.0966 95.119 20.7872C95.1595 19.4779 95.4659 18.3252 96.0384 17.3294C96.6114 16.316 97.387 15.5361 98.365 14.9897C99.361 14.4263 100.487 14.164 101.744 14.2028C102.775 14.2347 103.667 14.4632 104.423 14.8885C105.196 15.3143 105.79 15.9005 106.204 16.6473L106.446 8.79102L109.222 8.87675L108.64 27.7318L106.152 27.6549L105.926 25.6296C105.488 26.2277 104.896 26.7511 104.148 27.1998C103.4 27.6486 102.45 27.8551 101.298 27.8195ZM101.87 25.4257C103.057 25.4623 104.038 25.082 104.814 24.2846C105.608 23.4878 106.025 22.4434 106.065 21.1515C106.105 19.8421 105.754 18.7741 105.01 17.9472C104.285 17.1035 103.329 16.6633 102.141 16.6266C100.954 16.59 99.9639 16.9701 99.1704 17.7669C98.3774 18.5462 97.9607 19.5906 97.9203 20.9C97.8939 21.7554 98.045 22.5203 98.3737 23.1945C98.7023 23.8687 99.1663 24.4072 99.7654 24.8102C100.383 25.1962 101.084 25.4014 101.87 25.4257Z" fill="currentColor" />
                <path d="M116.854 29.1754L122.812 11.2771L125.448 12.1543L122.932 19.7114C123.583 19.1367 124.34 18.7719 125.202 18.6169C126.085 18.4508 126.974 18.5167 127.869 18.8147C129.344 19.3057 130.35 20.1559 130.886 21.3653C131.422 22.5747 131.384 24.0992 130.772 25.9388L128.414 33.0235L125.803 32.1546L128.071 25.3433C128.865 22.9568 128.31 21.4464 126.404 20.812C125.409 20.4809 124.465 20.5531 123.57 21.0285C122.692 21.5094 122.038 22.3961 121.608 23.6888L119.489 30.0526L116.854 29.1754Z" fill="currentColor" />
                <path d="M135.413 37.0788C134.305 36.4465 133.458 35.6408 132.871 34.6617C132.307 33.6762 132.034 32.6049 132.051 31.448C132.068 30.2911 132.41 29.1287 133.077 27.9608C133.752 26.7777 134.581 25.8729 135.562 25.2465C136.558 24.6288 137.624 24.3122 138.759 24.2967C139.91 24.2898 141.054 24.6112 142.191 25.2608C143.298 25.8931 144.119 26.6934 144.652 27.6616C145.194 28.6147 145.458 29.6307 145.446 30.7096C145.433 31.7885 145.145 32.8209 144.582 33.8068C144.496 33.9585 144.393 34.121 144.274 34.2944C144.178 34.4612 144.063 34.6465 143.926 34.8502L135.144 29.8352C134.596 30.9706 134.476 32.0084 134.784 32.9486C135.116 33.8822 135.706 34.5916 136.556 35.0766C137.238 35.4664 137.894 35.6395 138.522 35.596C139.174 35.546 139.766 35.3205 140.296 34.9195L142.708 36.2967C141.798 37.1852 140.685 37.7261 139.368 37.9193C138.066 38.1211 136.747 37.841 135.413 37.0788ZM141.038 27.2272C140.234 26.7682 139.383 26.6038 138.484 26.734C137.593 26.8491 136.807 27.3455 136.125 28.2231L142.495 31.8609C142.952 30.9552 143.04 30.0799 142.758 29.235C142.476 28.3902 141.903 27.7209 141.038 27.2272Z" fill="currentColor" />
                <path d="M142.925 41.4705L151.095 31.3654L153.031 32.9303L151.666 34.9937C152.557 34.6137 153.469 34.4861 154.401 34.611C155.358 34.7333 156.284 35.1569 157.181 35.8817L155.352 38.1431L154.761 37.6654C154.164 37.1822 153.545 36.8502 152.905 36.6696C152.289 36.4863 151.647 36.5171 150.977 36.7618C150.332 37.004 149.675 37.5393 149.005 38.3678L145.084 43.2167L142.925 41.4705Z" fill="currentColor" />
                <path d="M153.599 51.6451C152.748 50.6957 152.198 49.6638 151.95 48.5494C151.726 47.4363 151.805 46.3336 152.186 45.2411C152.567 44.1487 153.259 43.1536 154.26 42.2558C155.274 41.3464 156.346 40.7493 157.475 40.4645C158.615 40.1928 159.726 40.2287 160.809 40.5722C161.902 40.9288 162.886 41.5947 163.761 42.5701C164.612 43.5195 165.138 44.5378 165.338 45.6248C165.552 46.7002 165.482 47.7478 165.13 48.7676C164.777 49.7873 164.178 50.6762 163.333 51.434C163.203 51.5506 163.054 51.6724 162.886 51.7993C162.743 51.9275 162.575 52.0668 162.381 52.217L155.63 44.6869C154.752 45.5914 154.311 46.5383 154.306 47.5276C154.326 48.5183 154.663 49.3777 155.316 50.106C155.841 50.6913 156.408 51.0624 157.018 51.2193C157.652 51.3777 158.285 51.3503 158.915 51.1373L160.769 53.2052C159.625 53.7612 158.398 53.9231 157.087 53.6908C155.788 53.4714 154.625 52.7895 153.599 51.6451ZM162.046 44.0722C161.428 43.3829 160.672 42.9582 159.778 42.7981C158.897 42.6263 157.994 42.8492 157.07 43.4667L161.967 48.929C162.686 48.2137 163.045 47.4107 163.044 46.5201C163.044 45.6295 162.711 44.8135 162.046 44.0722Z" fill="currentColor" />
                <path d="M171.864 65.7393L174.055 65.0193L180.15 83.5622L177.96 84.2822L171.864 65.7393Z" fill="currentColor" />
            </StyledVisitedBadge>
        </StyledContainer>
    )
}
