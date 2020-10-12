import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import { interval, Subscription } from "rxjs"


interface AuthPrvdProps {
    children: JSX.Element;
    provider: string;
    socket: any;
}

const { NODE_ENV, REACT_APP_DEVELOPMENT_API_URL, REACT_APP_PRODUCTION_API_URL } = process.env

function AuthPrvd({ children, provider, socket }: AuthPrvdProps) {

    const [state, setState] = useState({
        user: null,
    })
    const { user } = state

    // ref
    const popupRef = useRef<Window>()
    const $subRef = useRef<Subscription>()

    const AUTH_URL = useMemo(() => {
        return NODE_ENV === "development" ?
            REACT_APP_DEVELOPMENT_API_URL as string :
            REACT_APP_PRODUCTION_API_URL as string
    }, [])

    const performAuthen = () => {
        $subRef.current = interval(500).subscribe(() => {
            if (!!user && !!popupRef.current && !popupRef.current.closed) { // authenticated successfull, popup still not closed yet
                popupRef.current.close()
            }
        })
        openPopup()
    }

    const openPopup = () => {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${AUTH_URL}/${provider}?socketId=${socket.id}`

        popupRef.current = window.open(
            url,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        ) as Window
    }

    useEffect(() => {
        socket.on(provider, (user: any) => {
            // close popup first
            console.log(user)
            popupRef.current?.close()
            setState({
                ...state,
                user
            })
        })

        return () => {
            $subRef.current?.unsubscribe()
        }
    }, [provider, state, socket])

    return (
        <div
            onClick={performAuthen}
        >
            {children}
        </div>
    )
}

export default memo(AuthPrvd);
