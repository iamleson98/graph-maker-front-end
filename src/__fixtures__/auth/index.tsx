import React, { memo, useMemo, useState } from "react"
import DelayInput from "../delayinput"
import { Button, FormHelperText, SvgIcon, Tooltip } from "@material-ui/core"
import { Email, Visibility, VisibilityOff } from "@material-ui/icons"
// import Logo from "../../components/logo"


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

// const staticUrl = "/static"

function Auth() {

    // state
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordVisible: false,

        emailError: null,
        passwordErr: null
    })
    const { email, password, passwordVisible, emailError, passwordErr } = state

    // memoized values:
    const socialButtons = useMemo(() => {
        return [
            { name: "Facebook", icon: Facebook, bgClass: "bg-blue-700", bgHoverClass: "bg-blue-600" },
            { name: "Google", icon: Google, bgClass: "bg-red-600", bgHoverClass: "bg-red-500" },
            { name: "Twitter", icon: Twitter, bgClass: "bg-blue-500", bgHoverClass: "bg-blue-400" },
        ]
    }, [])

    const changeHandler = (type: "password" | "email") => (value: string) => {

    }

    return (
        <div className="h-full w-full relative bg-white bg-no-repeat bg-auto xs:bg-contain"
            style={{
                backgroundImage: `url(/static/image/vn.jpg)`,
                backgroundPosition: "20% 50%"
            }}
        >
            <div className="flex absolute sm:flex-wrap sm:flex-col justify-between items-center"
                style={{
                    top: "50%",
                    right: "20%",
                    transform: "translateY(-50%)"
                }}
            >
                <div className="mr-3 mb-2">
                    <DelayInput
                        delay={333}
                        type="text"
                        giveValue={changeHandler("email")}
                        placeholder="Email"
                        className="bg-gray-100 rounded py-1 px-2 mb-1 border-2 border-gray-400"
                        defaultValue={email}
                        endAdornment={(
                            <div className="cursor-pointer text-gray-600 flex items-center justify-center">
                                <Email fontSize="small" />
                            </div>
                        )}
                    />
                    <br />
                    {!!emailError && <FormHelperText error={true} className="mb-1">{emailError}</FormHelperText>}
                    <DelayInput
                        delay={333}
                        type={passwordVisible ? "text" : "password"}
                        giveValue={changeHandler("password")}
                        placeholder="Password"
                        className="bg-gray-100 rounded py-1 px-2 mb-1 border-2 border-gray-400"
                        defaultValue={password}
                        endAdornment={(
                            <div className="cursor-pointer text-gray-600 flex items-center justify-center"
                                onClick={() => {
                                    setState({
                                        ...state,
                                        passwordVisible: !passwordVisible
                                    })
                                }}
                            >
                                {passwordVisible ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </div>
                        )}
                    />
                    {!!passwordErr && <FormHelperText error={true} className="mb-1">{passwordErr}</FormHelperText>}
                    <div className="text-right">
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            disableElevation={true}
                            className="focus:outline-none"
                        >
                            GO
                        </Button>
                    </div>
                </div>
                <div className="text-gray-600 px-1 py-1 rounded bg-white font-medium text-base mr-3 mb-2">
                    OR
                </div>
                <div className="m-auto">
                    {socialButtons.map((button, idx) => (
                        <Tooltip key={idx} title={`Continue with ${button.name}`} placement="right">
                            <div key={idx} className={`${button.bgClass} hover:${button.bgHoverClass} transition-colors duration-200 ease-linear rounded py-2 px-6 mb-2 flex cursor-pointer items-center text-center text-white`}>
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
