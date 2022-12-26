// HEADER
export const BellIcon = ({ className, width = '24px', height = '25px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 25'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M5.26855 10.2499C5.26731 9.36045 5.44213 8.47951 5.78294 7.6579C6.12375 6.83628 6.62381 6.09025 7.25429 5.4628C7.88476 4.83535 8.6332 4.33889 9.45644 4.00204C10.2797 3.66519 11.1615 3.49461 12.0509 3.50013C15.7625 3.52772 18.7312 6.61275 18.7312 10.3347V10.9999C18.7312 14.3577 19.4337 16.3061 20.0524 17.371C20.1191 17.4848 20.1546 17.6142 20.1553 17.746C20.156 17.8779 20.1219 18.0076 20.0565 18.1221C19.991 18.2366 19.8966 18.3318 19.7826 18.3982C19.6686 18.4645 19.5392 18.4996 19.4073 18.4999H4.59173C4.45985 18.4996 4.33038 18.4645 4.2164 18.3981C4.10242 18.3318 4.00795 18.2366 3.94252 18.122C3.8771 18.0075 3.84303 17.8778 3.84376 17.7459C3.84449 17.614 3.87999 17.4846 3.94667 17.3709C4.56573 16.3059 5.26855 14.3575 5.26855 10.9999L5.26855 10.2499Z'
                stroke='#424242'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9 18.5V19.25C9 20.0456 9.31607 20.8087 9.87868 21.3713C10.4413 21.9339 11.2044 22.25 12 22.25C12.7956 22.25 13.5587 21.9339 14.1213 21.3713C14.6839 20.8087 15 20.0456 15 19.25V18.5'
                stroke='#424242'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// SIDEBAR
export const DashboardIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M3.75 6.375H20.25'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.25 10.125H20.25'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M3.75098 13.875H20.2504'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.25098 17.625H20.2504'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
export const HomePageIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
            <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
    );
};
export const HistoryIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width={width}
            height={height}
            className={className}
            fill='currentColor'
            stroke='currentColor'
            color='currentColor'
        >
            <path d='M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z' />
        </svg>
    );
};
export const ProfileIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
            width={width}
            height={height}
            className={className}
            fill='currentColor'
            stroke='currentColor'
            color='currentColor'
        >
            <path d='M208 256c35.35 0 64-28.65 64-64c0-35.35-28.65-64-64-64s-64 28.65-64 64C144 227.3 172.7 256 208 256zM464 232h-96c-13.25 0-24 10.75-24 24s10.75 24 24 24h96c13.25 0 24-10.75 24-24S477.3 232 464 232zM240 288h-64C131.8 288 96 323.8 96 368C96 376.8 103.2 384 112 384h192c8.836 0 16-7.164 16-16C320 323.8 284.2 288 240 288zM464 152h-96c-13.25 0-24 10.75-24 24s10.75 24 24 24h96c13.25 0 24-10.75 24-24S477.3 152 464 152zM512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM528 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V416z' />
        </svg>
    );
};
export const ContactIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width={width}
            height={height}
            className={className}
            fill='currentColor'
            stroke='currentColor'
            color='currentColor'
        >
            <path d='M272 288h-64C163.8 288 128 323.8 128 368C128 376.8 135.2 384 144 384h192c8.836 0 16-7.164 16-16C352 323.8 316.2 288 272 288zM240 256c35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64S204.7 256 240 256zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM400 448c0 8.836-7.164 16-16 16H96c-8.836 0-16-7.164-16-16V64c0-8.838 7.164-16 16-16h288c8.836 0 16 7.162 16 16V448z' />
        </svg>
    );
};
export const LiveChatIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width={width}
            height={height}
            className={className}
            fill='currentColor'
            stroke='currentColor'
            color='currentColor'
        >
            <path d='M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z' />
        </svg>
    );
};
export const DepositsIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M15.749 15.75H18.749'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.249 15.75H12.749'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M2.24902 9.08008H21.749'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
export const WithdrawIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M21.75 6H2.25C1.83579 6 1.5 6.33579 1.5 6.75V17.25C1.5 17.6642 1.83579 18 2.25 18H21.75C22.1642 18 22.5 17.6642 22.5 17.25V6.75C22.5 6.33579 22.1642 6 21.75 6Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M16.5 6L22.5 11.25'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M16.5 18L22.5 12.75'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M7.5 6L1.5 11.25'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M7.5 18L1.5 12.75'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
export const UserIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeMiterlimit='10'
            />
            <path
                d='M14.5703 5.43149C15.2408 5.24257 15.9441 5.19953 16.6326 5.30528C17.3212 5.41102 17.9791 5.66309 18.562 6.0445C19.1449 6.42592 19.6393 6.92782 20.012 7.51641C20.3846 8.105 20.6268 8.76661 20.7221 9.45667C20.8175 10.1467 20.764 10.8492 20.565 11.5168C20.366 12.1844 20.0263 12.8017 19.5687 13.3269C19.1111 13.8522 18.5463 14.2733 17.9123 14.5619C17.2782 14.8505 16.5897 14.9998 15.8931 14.9999'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M1.5 18.5059C2.26138 17.4229 3.27215 16.539 4.44698 15.9288C5.62182 15.3186 6.92623 15.0001 8.25008 15C9.57393 14.9999 10.8784 15.3184 12.0532 15.9285C13.2281 16.5386 14.239 17.4225 15.0004 18.5054'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M15.8926 15C17.2166 14.999 18.5213 15.3171 19.6962 15.9273C20.8712 16.5375 21.8819 17.4218 22.6426 18.5054'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
export const UploadIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 640 512'
            width={width}
            height={height}
            className={className}
            fill='currentColor'
            stroke='currentColor'
            color='currentColor'
        >
            <path d='M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z' />
        </svg>
    );
};
// MODAL
export const ArrowRightIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className={className}
        >
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='12 5 19 12 12 19' />
        </svg>
    );
};
export const ArrowLeftIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className={className}
        >
            <line x1='19' y1='12' x2='5' y2='12' />
            <polyline points='12 19 5 12 12 5' />
        </svg>
    );
};
// Breadcrumb
export const BreadcrumbHomeIcon = ({
    className,
    width = '16px',
    height = '16px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 16 16'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M9.49963 12.9991V9.99905C9.49963 9.86644 9.44696 9.73926 9.35319 9.64549C9.25942 9.55172 9.13224 9.49905 8.99963 9.49905H6.99963C6.86703 9.49905 6.73985 9.55172 6.64608 9.64549C6.55231 9.73926 6.49963 9.86644 6.49963 9.99905V12.9991C6.49963 13.1317 6.44696 13.2589 6.35321 13.3526C6.25945 13.4464 6.13229 13.4991 5.9997 13.4991L3.00006 13.4995C2.9344 13.4995 2.86937 13.4866 2.8087 13.4615C2.74803 13.4363 2.6929 13.3995 2.64647 13.3531C2.60003 13.3066 2.5632 13.2515 2.53807 13.1909C2.51293 13.1302 2.5 13.0652 2.5 12.9995V7.22073C2.5 7.15107 2.51456 7.08218 2.54273 7.01847C2.57091 6.95477 2.61209 6.89765 2.66363 6.85079L7.66329 2.30486C7.75532 2.22118 7.87525 2.17481 7.99964 2.1748C8.12403 2.1748 8.24396 2.22116 8.336 2.30484L13.3363 6.85078C13.3879 6.89765 13.4291 6.95477 13.4573 7.01848C13.4854 7.08219 13.5 7.15108 13.5 7.22075V12.9995C13.5 13.0652 13.4871 13.1302 13.4619 13.1909C13.4368 13.2515 13.4 13.3067 13.3535 13.3531C13.3071 13.3995 13.252 13.4363 13.1913 13.4615C13.1306 13.4866 13.0656 13.4995 12.9999 13.4995L9.99957 13.4991C9.86697 13.4991 9.73981 13.4464 9.64606 13.3526C9.5523 13.2589 9.49963 13.1317 9.49963 12.9991V12.9991Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// SEARCH
export const SearchIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M16.4434 16.4438L20.9997 21.0002'
                stroke='#9E9E9E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// SEARCH DATE
export const SearchDateIcon = ({
    className,
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            width={width}
            height={height}
            className={className}
        >
            <path d='M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z' />
        </svg>
    );
};
//MORE
export const MoreIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M12 13.125C12.6213 13.125 13.125 12.6213 13.125 12C13.125 11.3787 12.6213 10.875 12 10.875C11.3787 10.875 10.875 11.3787 10.875 12C10.875 12.6213 11.3787 13.125 12 13.125Z'
                fill='#212121'
            />
            <path
                d='M18 13.125C18.6213 13.125 19.125 12.6213 19.125 12C19.125 11.3787 18.6213 10.875 18 10.875C17.3787 10.875 16.875 11.3787 16.875 12C16.875 12.6213 17.3787 13.125 18 13.125Z'
                fill='#212121'
            />
            <path
                d='M6 13.125C6.62132 13.125 7.125 12.6213 7.125 12C7.125 11.3787 6.62132 10.875 6 10.875C5.37868 10.875 4.875 11.3787 4.875 12C4.875 12.6213 5.37868 13.125 6 13.125Z'
                fill='#212121'
            />
        </svg>
    );
};
// EDIT
export const EditIcon = ({ className, width = '16px', height = '16px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 16 16'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M6 13.4999H3C2.86739 13.4999 2.74021 13.4472 2.64645 13.3535C2.55268 13.2597 2.5 13.1325 2.5 12.9999V10.207C2.5 10.1414 2.51293 10.0764 2.53806 10.0157C2.56319 9.95503 2.60002 9.89991 2.64645 9.85348L10.1464 2.35348C10.2402 2.25971 10.3674 2.20703 10.5 2.20703C10.6326 2.20703 10.7598 2.25971 10.8536 2.35348L13.6464 5.14637C13.7402 5.24014 13.7929 5.36732 13.7929 5.49992C13.7929 5.63253 13.7402 5.75971 13.6464 5.85348L6 13.4999Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.5 4L12 7.5'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// DELETE
export const DeleteIcon = ({ className, width = '16px', height = '16px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 16 16'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M13.5 3.5L2.5 3.5'
                stroke='currentColor'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M6.5 6.5V10.5'
                stroke='currentColor'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.5 6.5V10.5'
                stroke='currentColor'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M12.5 3.5V13C12.5 13.1326 12.4473 13.2598 12.3536 13.3536C12.2598 13.4473 12.1326 13.5 12 13.5H4C3.86739 13.5 3.74021 13.4473 3.64645 13.3536C3.55268 13.2598 3.5 13.1326 3.5 13V3.5'
                stroke='currentColor'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M10.5 3.5V2.5C10.5 2.23478 10.3946 1.98043 10.2071 1.79289C10.0196 1.60536 9.76522 1.5 9.5 1.5H6.5C6.23478 1.5 5.98043 1.60536 5.79289 1.79289C5.60536 1.98043 5.5 2.23478 5.5 2.5V3.5'
                stroke='currentColor'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// CLOSE
export const CloseIcon = ({ className, width = '24px', height = '24px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M18.75 5.25L5.25 18.75'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M18.75 18.75L5.25 5.25'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// SEND
export const SendIcon = ({ className, width = '16px', height = '16px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 16 16'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z'
                stroke='currentColor'
                strokeMiterlimit='10'
            />
            <path
                d='M6.75 6.25H9.75V9.25'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M6.25 9.75L9.75 6.25'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// RECEIVED
export const ReceivedIcon = ({
    className,
    width = '16px',
    height = '16px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 16 16'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z'
                stroke='currentColor'
                strokeMiterlimit='10'
            />
            <path
                d='M6.25 6.75V9.75H9.25'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.75 6.25L6.25 9.75'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// VIEW USER
export const ViewUserIcon = ({
    className,
    width = '16px',
    height = '16px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            className={className}
            viewBox='0 0 18 18'
            fill='none'
            nighteye='disabled'
        >
            <path
                d='M6.75 3.375L12.375 9L6.75 14.625'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};
// ICON EYE
export const EyeIcon = ({ className, width = '20px', height = '20px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
            />
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
        </svg>
    );
};
// ICONS EYE SHOW
export const EyeShowIcon = ({ className, width = '20px', height = '20px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
            />
        </svg>
    );
};
// ICONS SELECT OPTION ARROW
export const SelectOptionArrowIcon = ({
    className,
    width = '18px',
    height = '18px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
        </svg>
    );
};
export const BlockUserIcon = ({
    className,
    width = '20px',
    height = '20px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
            />
        </svg>
    );
};
export const UnBlockUserIcon = ({
    className,
    width = '20px',
    height = '20px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
        </svg>
    );
};
export const RefreshIcon = ({ className, width = '20px', height = '20px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            color='currentColor'
            className={className}
            width={width}
            height={height}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
        </svg>
    );
};
export const RefreshPageIcon = ({
    className,
    width = '18px',
    height = '18px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            fill='currentColor'
            className={className}
            width={width}
            height={height}
            color='currentColor'
            stroke='currentColor'
            strokeWidth='1'
        >
            <path d='M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z' />
        </svg>
    );
};
export const AndroidIcon = ({ className, width = '20px', height = '20px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
            width={width}
            height={height}
            className={className}
            fill='#51f191'
            color='#51f191'
            stroke='#51f191'
        >
            <path d='M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55' />
        </svg>
    );
};
export const CHPlayIcon = ({ className, width = '20px', height = '20px' }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            width={width}
            height={height}
            className={className}
        >
            <path
                fill='#499ed7'
                d='m10.467 6.755 12.135 7.339c1.287.778 1.287 2.645 0 3.423l-12.135 7.339c-1.333.806-3.035-.154-3.035-1.711V8.466c0-1.557 1.702-2.517 3.035-1.711z'
            />
            <path
                fill='#f04c4d'
                d='m10.467 24.855 12.135-7.339c1.287-.778 1.287-2.645 0-3.423l-2.457-1.486-.12-.004L9.642 25.118a1.95 1.95 0 0 0 .825-.263z'
            />
            <path
                fill='#2b8ec6'
                d='M7.432 20.415v2.729c0 1.558 1.702 2.517 3.035 1.711l12.135-7.339c.765-.462 1.064-1.308.919-2.082L7.432 20.415z'
            />
            <path
                fill='#499ed7'
                d='M8.51 6.7a1.974 1.974 0 0 0-1.078 1.766v2.566L8.51 6.7z'
            />
            <path
                fill='#92ca62'
                d='M22.602 14.094 10.467 6.755a1.96 1.96 0 0 0-.827-.264l10.384 12.585 2.579-1.559c1.286-.779 1.286-2.645-.001-3.423z'
            />
            <path
                fill='#e13340'
                d='m15.657 17.869-6.015 7.25c.279-.029.559-.103.825-.263l12.135-7.339c.765-.462 1.064-1.308.919-2.082l-7.864 2.434z'
            />
            <path
                fill='#fcd770'
                d='m22.602 14.094-2.457-1.486-.12-.004-2.678 3.228 2.677 3.244 2.579-1.559c1.286-.779 1.286-2.645-.001-3.423z'
            />
            <path
                fill='#ffcc5c'
                d='m18.342 17.037 1.682 2.038 2.579-1.559c.765-.462 1.064-1.308.919-2.082l-5.18 1.603z'
            />
        </svg>
    );
};
export const AppleStoreIcon = ({
    className,
    width = '20px',
    height = '20px',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            width={width}
            height={height}
            className={className}
            fill='#0b88ee'
            color='#0b88ee'
            stroke='#0b88ee'
        >
            <path d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z' />
        </svg>
    );
};
