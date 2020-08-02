import React, { memo, useMemo } from 'react'
import DelayInput from '../../components/delayinput'
import { Button, SvgIcon, Tooltip } from '@material-ui/core'


const Google = (props: any) => (
    <SvgIcon {...props}>
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
    </SvgIcon>
)

const Facebook = (props: any) => (
    <SvgIcon {...props}>
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </SvgIcon>
)

const Twitter = (props: any) => (
    <SvgIcon {...props}>
        <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
    </SvgIcon>
)

const staticUrl = "http://localhost:3000/static"

function Auth() {

    // memoized values:
    const socialButtons = useMemo(() => {
        return [
            { name: "Facebook", icon: Facebook, bgClass: "bg-blue-700" },
            { name: "Google", icon: Google, bgClass: "bg-gray-700" },
            { name: "Twitter", icon: Twitter, bgClass: "bg-blue-500" },
        ]
    }, [])

    return (
        <div
            className="relative bg-no-repeat w-screen h-screen max-w-6xl m-auto"
            style={{
                backgroundPosition: "20% 50%",
                backgroundImage: `url(${staticUrl}/image/file.png)`
            }}
        >
            <div className="cursor-pointer absolute"
                style={{
                    top: "50px",
                    left: "100px"
                }}
            >
                <svg width="156" height="31" viewBox="0 0 156 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.93 29.21C5.47 29.21 4.29 28.83 3.39 28.07C2.51 27.33 2.07 26.35 2.07 25.13C2.07 24.37 2.25 23.67 2.61 23.03C2.97 22.39 3.46 21.89 4.08 21.53C4.7 21.15 5.38 20.96 6.12 20.96C6.88 20.96 7.49 21.15 7.95 21.53C8.43 21.91 8.67 22.41 8.67 23.03C8.67 23.51 8.56 23.89 8.34 24.17C8.16 23.93 7.91 23.74 7.59 23.6C7.29 23.46 6.97 23.39 6.63 23.39C6.03 23.39 5.54 23.59 5.16 23.99C4.78 24.39 4.59 24.91 4.59 25.55C4.59 26.19 4.77 26.71 5.13 27.11C5.51 27.51 5.98 27.71 6.54 27.71C7.24 27.71 7.84 27.4 8.34 26.78C8.84 26.16 9.22 25.24 9.48 24.02L10.98 17.39H10.86C10.32 18.15 9.66 18.73 8.88 19.13C8.12 19.53 7.28 19.73 6.36 19.73C5.2 19.73 4.18 19.42 3.3 18.8C2.42 18.18 1.74 17.3 1.26 16.16C0.8 15 0.57 13.66 0.57 12.14C0.57 9.94 1.05 7.94 2.01 6.14C2.97 4.32 4.29 2.89 5.97 1.85C7.65 0.809999 9.5 0.289999 11.52 0.289999C13.22 0.289999 14.56 0.659999 15.54 1.4C16.54 2.14 17.04 3.15 17.04 4.43C17.04 5.29 16.83 5.98 16.41 6.5C15.99 7.02 15.44 7.28 14.76 7.28C14.38 7.28 14.02 7.2 13.68 7.04C13.36 6.88 13.09 6.65 12.87 6.35C13.23 6.11 13.53 5.73 13.77 5.21C14.03 4.67 14.16 4.13 14.16 3.59C14.16 2.99 13.98 2.53 13.62 2.21C13.28 1.87 12.79 1.7 12.15 1.7C10.99 1.7 9.87 2.22 8.79 3.26C7.71 4.28 6.84 5.62 6.18 7.28C5.52 8.94 5.19 10.68 5.19 12.5C5.19 14 5.43 15.15 5.91 15.95C6.39 16.73 7.08 17.12 7.98 17.12C9.06 17.12 10.01 16.55 10.83 15.41C11.67 14.27 12.34 12.61 12.84 10.43L16.38 10.46L14.19 20.54C13.55 23.52 12.64 25.71 11.46 27.11C10.3 28.51 8.79 29.21 6.93 29.21ZM19.3838 8H23.7038L23.3138 9.86C23.9938 9.26 24.6038 8.8 25.1438 8.48C25.7038 8.16 26.3038 8 26.9438 8C27.5838 8 28.0838 8.22 28.4438 8.66C28.8238 9.1 29.0138 9.63 29.0138 10.25C29.0138 10.83 28.8238 11.34 28.4438 11.78C28.0638 12.22 27.5338 12.44 26.8538 12.44C26.4138 12.44 26.1138 12.34 25.9538 12.14C25.8138 11.92 25.7038 11.61 25.6238 11.21C25.5638 10.95 25.5038 10.76 25.4438 10.64C25.3838 10.52 25.2738 10.46 25.1138 10.46C24.6938 10.46 24.3338 10.55 24.0338 10.73C23.7538 10.89 23.3838 11.18 22.9238 11.6L20.5238 23H16.2037L19.3838 8ZM32.223 23.18C31.083 23.18 30.133 22.79 29.373 22.01C28.613 21.23 28.233 20.01 28.233 18.35C28.233 16.87 28.523 15.32 29.103 13.7C29.703 12.06 30.583 10.68 31.743 9.56C32.923 8.42 34.323 7.85 35.943 7.85C36.763 7.85 37.373 7.99 37.773 8.27C38.173 8.55 38.373 8.92 38.373 9.38V9.59L38.703 8H43.023L40.863 18.2C40.783 18.5 40.743 18.82 40.743 19.16C40.743 20.02 41.153 20.45 41.973 20.45C42.533 20.45 43.013 20.19 43.413 19.67C43.833 19.15 44.163 18.47 44.403 17.63H45.663C44.923 19.79 44.003 21.26 42.903 22.04C41.823 22.8 40.733 23.18 39.633 23.18C38.793 23.18 38.113 22.95 37.593 22.49C37.093 22.01 36.793 21.32 36.693 20.42C36.113 21.24 35.463 21.91 34.743 22.43C34.043 22.93 33.203 23.18 32.223 23.18ZM34.173 20.27C34.673 20.27 35.163 20.04 35.643 19.58C36.143 19.1 36.483 18.45 36.663 17.63L38.103 10.85C38.103 10.59 38.003 10.34 37.803 10.1C37.603 9.84 37.293 9.71 36.873 9.71C36.073 9.71 35.353 10.18 34.713 11.12C34.073 12.04 33.573 13.16 33.213 14.48C32.853 15.78 32.673 16.93 32.673 17.93C32.673 18.93 32.813 19.57 33.093 19.85C33.393 20.13 33.753 20.27 34.173 20.27ZM46.6941 6.89H51.0141L50.5341 9.14C51.5341 8.28 52.7041 7.85 54.0441 7.85C55.1641 7.85 56.0541 8.22 56.7141 8.96C57.3741 9.7 57.7041 10.91 57.7041 12.59C57.7041 14.17 57.4741 15.77 57.0141 17.39C56.5541 18.99 55.7741 20.36 54.6741 21.5C53.5741 22.62 52.1241 23.18 50.3241 23.18C49.0441 23.18 48.1941 22.82 47.7741 22.1L46.2141 29.42L41.6841 30.5L46.6941 6.89ZM49.3941 20.57C50.3541 20.57 51.1441 20.12 51.7641 19.22C52.4041 18.32 52.8641 17.25 53.1441 16.01C53.4441 14.75 53.5941 13.58 53.5941 12.5C53.5941 10.84 53.0941 10.01 52.0941 10.01C51.7341 10.01 51.3641 10.14 50.9841 10.4C50.6241 10.66 50.3041 11.02 50.0241 11.48L48.2541 19.88C48.4141 20.34 48.7941 20.57 49.3941 20.57ZM68.7373 23.18C67.6773 23.18 66.9073 22.86 66.4273 22.22C65.9473 21.58 65.7073 20.77 65.7073 19.79C65.7073 19.37 65.7573 18.9 65.8573 18.38C65.9573 17.84 66.0573 17.32 66.1573 16.82C66.2773 16.32 66.3573 16 66.3973 15.86C66.5573 15.16 66.7073 14.47 66.8473 13.79C66.9873 13.11 67.0573 12.56 67.0573 12.14C67.0573 11.12 66.6973 10.61 65.9773 10.61C65.4973 10.61 65.0573 10.83 64.6573 11.27C64.2773 11.71 63.9673 12.29 63.7273 13.01L61.5973 23H57.2773L61.6273 2.6L66.0673 2L64.4473 9.53C65.4473 8.43 66.6173 7.88 67.9573 7.88C68.9773 7.88 69.7873 8.16 70.3873 8.72C70.9873 9.28 71.2873 10.13 71.2873 11.27C71.2873 11.85 71.2173 12.5 71.0773 13.22C70.9373 13.92 70.7373 14.78 70.4773 15.8C70.3173 16.42 70.1673 17.03 70.0273 17.63C69.9073 18.21 69.8473 18.67 69.8473 19.01C69.8473 19.41 69.9373 19.72 70.1173 19.94C70.2973 20.16 70.6073 20.27 71.0473 20.27C71.5273 20.27 71.8573 20.21 72.0373 20.09C71.9173 21.11 71.5473 21.88 70.9273 22.4C70.3273 22.92 69.5973 23.18 68.7373 23.18ZM96.7849 23.18C95.5649 23.18 94.6649 22.86 94.0849 22.22C93.5249 21.56 93.2449 20.75 93.2449 19.79C93.2449 19.37 93.2949 18.9 93.3949 18.38C93.4949 17.84 93.5949 17.32 93.6949 16.82C93.8149 16.32 93.8949 16 93.9349 15.86C94.0949 15.16 94.2449 14.47 94.3849 13.79C94.5249 13.11 94.5949 12.56 94.5949 12.14C94.5949 11.12 94.2349 10.61 93.5149 10.61C92.9949 10.61 92.5349 10.87 92.1349 11.39C91.7349 11.89 91.4149 12.55 91.1749 13.37L89.1349 23H84.8149L87.0049 12.65C87.0649 12.41 87.0949 12.16 87.0949 11.9C87.0949 11.02 86.7949 10.58 86.1949 10.58C85.6349 10.58 85.1449 10.84 84.7249 11.36C84.3249 11.86 84.0049 12.53 83.7649 13.37L81.7249 23H77.4049L80.5849 8H84.9049L84.5749 9.56C85.5949 8.42 86.8149 7.85 88.2349 7.85C89.9949 7.85 91.0249 8.71 91.3249 10.43C92.4249 8.73 93.8149 7.88 95.4949 7.88C96.5149 7.88 97.3249 8.16 97.9249 8.72C98.5249 9.28 98.8249 10.13 98.8249 11.27C98.8249 11.85 98.7549 12.5 98.6149 13.22C98.4749 13.92 98.2749 14.78 98.0149 15.8C97.8549 16.42 97.7049 17.03 97.5649 17.63C97.4449 18.21 97.3849 18.67 97.3849 19.01C97.3849 19.41 97.4749 19.72 97.6549 19.94C97.8349 20.16 98.1449 20.27 98.5849 20.27C99.1849 20.27 99.6649 20.06 100.025 19.64C100.385 19.2 100.745 18.53 101.105 17.63H102.365C101.625 19.83 100.765 21.31 99.7849 22.07C98.8249 22.81 97.8249 23.18 96.7849 23.18ZM104.704 23.18C103.564 23.18 102.614 22.79 101.854 22.01C101.094 21.23 100.714 20.01 100.714 18.35C100.714 16.87 101.004 15.32 101.584 13.7C102.184 12.06 103.064 10.68 104.224 9.56C105.404 8.42 106.804 7.85 108.424 7.85C109.244 7.85 109.854 7.99 110.254 8.27C110.654 8.55 110.854 8.92 110.854 9.38V9.59L111.184 8H115.504L113.344 18.2C113.264 18.5 113.224 18.82 113.224 19.16C113.224 20.02 113.634 20.45 114.454 20.45C115.014 20.45 115.494 20.19 115.894 19.67C116.314 19.15 116.644 18.47 116.884 17.63H118.144C117.404 19.79 116.484 21.26 115.384 22.04C114.304 22.8 113.214 23.18 112.114 23.18C111.274 23.18 110.594 22.95 110.074 22.49C109.574 22.01 109.274 21.32 109.174 20.42C108.594 21.24 107.944 21.91 107.224 22.43C106.524 22.93 105.684 23.18 104.704 23.18ZM106.654 20.27C107.154 20.27 107.644 20.04 108.124 19.58C108.624 19.1 108.964 18.45 109.144 17.63L110.584 10.85C110.584 10.59 110.484 10.34 110.284 10.1C110.084 9.84 109.774 9.71 109.354 9.71C108.554 9.71 107.834 10.18 107.194 11.12C106.554 12.04 106.054 13.16 105.694 14.48C105.334 15.78 105.154 16.93 105.154 17.93C105.154 18.93 105.294 19.57 105.574 19.85C105.874 20.13 106.234 20.27 106.654 20.27ZM128.175 23.18C126.935 23.18 125.995 22.89 125.355 22.31C124.715 21.71 124.395 20.86 124.395 19.76C124.395 19.28 124.455 18.76 124.575 18.2L124.815 17.03C124.895 16.69 124.935 16.32 124.935 15.92C124.935 14.96 124.575 14.48 123.855 14.48C123.535 14.48 123.195 14.57 122.835 14.75C122.495 14.93 122.095 15.21 121.635 15.59L120.075 23H115.755L120.105 2.6L124.545 2L122.295 12.56L128.085 8H131.055L125.055 12.17C125.355 12.09 125.685 12.05 126.045 12.05C127.125 12.05 127.945 12.38 128.505 13.04C129.065 13.7 129.345 14.54 129.345 15.56C129.345 15.98 129.305 16.36 129.225 16.7L128.895 18.2C128.795 18.56 128.745 18.88 128.745 19.16C128.745 19.9 129.135 20.27 129.915 20.27C130.515 20.27 130.995 20.06 131.355 19.64C131.715 19.2 132.075 18.53 132.435 17.63H133.695C132.455 21.33 130.615 23.18 128.175 23.18ZM136.712 23.18C135.232 23.18 134.082 22.8 133.262 22.04C132.442 21.26 132.032 20.05 132.032 18.41C132.032 17.03 132.302 15.51 132.842 13.85C133.382 12.19 134.262 10.76 135.482 9.56C136.702 8.34 138.252 7.73 140.132 7.73C142.332 7.73 143.432 8.69 143.432 10.61C143.432 11.73 143.112 12.76 142.472 13.7C141.832 14.64 140.982 15.4 139.922 15.98C138.862 16.54 137.732 16.86 136.532 16.94C136.492 17.54 136.472 17.94 136.472 18.14C136.472 19.12 136.642 19.79 136.982 20.15C137.322 20.49 137.872 20.66 138.632 20.66C139.712 20.66 140.632 20.41 141.392 19.91C142.172 19.41 143.022 18.65 143.942 17.63H144.962C142.742 21.33 139.992 23.18 136.712 23.18ZM136.772 15.5C137.512 15.46 138.212 15.2 138.872 14.72C139.552 14.24 140.092 13.63 140.492 12.89C140.912 12.15 141.122 11.37 141.122 10.55C141.122 9.73 140.872 9.32 140.372 9.32C139.652 9.32 138.942 9.95 138.242 11.21C137.562 12.47 137.072 13.9 136.772 15.5ZM145.976 8H150.296L149.906 9.86C150.586 9.26 151.196 8.8 151.736 8.48C152.296 8.16 152.896 8 153.536 8C154.176 8 154.676 8.22 155.036 8.66C155.416 9.1 155.606 9.63 155.606 10.25C155.606 10.83 155.416 11.34 155.036 11.78C154.656 12.22 154.126 12.44 153.446 12.44C153.006 12.44 152.706 12.34 152.546 12.14C152.406 11.92 152.296 11.61 152.216 11.21C152.156 10.95 152.096 10.76 152.036 10.64C151.976 10.52 151.866 10.46 151.706 10.46C151.286 10.46 150.926 10.55 150.626 10.73C150.346 10.89 149.976 11.18 149.516 11.6L147.116 23H142.796L145.976 8Z" fill="#FF7C7C" />
                </svg>
            </div>
            <div className="absolute flex sm:right-0 sm:flex-wrap"
                style={{
                    top: "30%",
                    right: "10%"
                }}
            >
                <div className="mr-6 mb-4">
                    <DelayInput
                        type="text"
                        giveValue={console.log}
                        placeholder="Enter your email"
                        className="bg-gray-200 rounded py-1 px-2 mb-2"
                    />
                    <div className="text-right">
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation={true}
                            className="focus:outline-none"
                            size="small"
                        >
                            GO
                        </Button>
                    </div>
                </div>
                <div className="border-solid border-gray-400 border-l relative mr-6 sm:hidden">
                    <div className="text-gray-600 px-1 py-1 rounded bg-white absolute font-medium text-base"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        OR
                    </div>
                </div>
                <div className="m-auto">
                    {socialButtons.map((button, idx) => (
                        <Tooltip key={idx} title={`Continue with ${button.name}`} placement="right">
                            <div key={idx} className={`${button.bgClass} rounded py-2 px-6 mb-2 flex cursor-pointer items-center text-center text-white`}>
                                <button.icon fontSize="small" className="mr-2" />
                                <span>{button.name}</span>
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Auth)