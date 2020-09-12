import { Button, IconButton, Tooltip } from "@material-ui/core"
import { Camera, CameraAlt } from "@material-ui/icons"
import React, { memo, useEffect, useRef, useState } from "react"
import DelayInput from "../../components/delayinput"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions/transition"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
// import DialogContentText from "@material-ui/core/DialogContentText"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from "@material-ui/core/styles"
import Croppie from "croppie"
import "./croppie.css"


const Transition = React.forwardRef(function (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export interface AvatarDialogProps {
    onClose: () => void;
}

function AvatarDialog({ onClose }: AvatarDialogProps) {

    // references
    const crpRef = useRef<any>()

    // croppie options
    const croppieOps: Croppie.CroppieOptions = {
        boundary: { width: 280, height: 250 },
        enableZoom: true,
        viewport: { width: 200, height: 200, type: "square" }
    }

    // component state
    const [state, setState] = useState<{
        croppie: Croppie | null;
        canSave: boolean;
    }>({
        croppie: null,
        canSave: false
    })
    const { croppie, canSave } = state

    useEffect(() => {
        if (!croppie) {
            setState({
                ...state,
                croppie: new Croppie(
                    crpRef.current as HTMLDivElement,
                    croppieOps
                )
            })
        }
    }, [])

    const handleSelectImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = evt.target
        if (files && files[0]) {
            // binding croppie to new image source, after user choosing new image from their device.
            croppie?.bind({
                url: (URL || webkitURL).createObjectURL(files[0]),
                zoom: 2,
            })
            setState({
                croppie,
                canSave: true
            })
        }
    }

    const handleSave = () => {
        console.log(
            croppie?.get()
        )
    }

    return (
        <>
            <DialogTitle>
                <input
                    type="file"
                    id="new-avatar"
                    accept="image/jpeg,image/png,image/jpg"
                    className="hidden"
                    onChange={handleSelectImg}
                />
                <label htmlFor="new-avatar" className="cursor-pointer text-gray-700">
                    <IconButton color="primary" size="medium" component="span">
                        <CameraAlt fontSize="inherit" />
                    </IconButton>
                    Choose new image
                </label>
            </DialogTitle>
            <DialogContent>
                <div ref={crpRef}></div>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleSave}
                    disabled={!canSave}
                >
                    save
                </Button>
                <Button
                    size="small"
                    color="secondary"
                    onClick={onClose}
                >
                    cancel
                </Button>
            </DialogActions>
        </>
    )
}


function UserInfo() {

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"))

    // component state
    const [state, setState] = useState({
        name: "Le Minh Son",
        email: "leminhson2398@outlook.com",
        geoThought: "Well i really like learning Geography Especially in the lessons that teachers require us to write graphs",
        edit: false,
        open: false
    })
    const { name, email, geoThought, edit, open } = state

    const values: {
        name: "email" | "name";
        value: string;
    }[] = [
            { name: "name", value: name },
            { name: "email", value: email },
        ]

    const editClickHandler = () => {
        setState({
            ...state,
            edit: true
        })
    }

    return (
        <div className="p-4 rounded bg-white text-gray-700">
            <p className="text-base font-medium mb-2">About</p>

            {/* avatar */}
            <div className="rounded-full mb-4 group relative overflow-hidden border-solid border-4 border-gray-200 m-auto w-40 h-40">
                <img className="w-full h-full" src="https://i.pinimg.com/originals/0b/ee/64/0bee64ce2416f673c0dc9e04a10ed9d3.jpg" alt="profile picture" />
                <div
                    className="absolute items-center justify-center w-full text-white group-hover:flex hidden cursor-pointer left-0 right-0 bottom-0 bg-opacity-75 bg-black h-20"
                    onClick={() => setState({
                        ...state,
                        open: true
                    })}
                >
                    <Tooltip title="Change Avatar" placement="top">
                        <Camera />
                    </Tooltip>
                </div>
            </div>

            {values.map((item, idx) => (
                <div
                    key={idx}
                    className="flex flex-no-wrap group items-center mb-3"
                >
                    <div className="w-1/6 text-xs">
                        {item.name}
                    </div>
                    <p className="w-5/6 overflow-hidden text-sm mr-2 font-medium">
                        {!edit ? (
                            <>{item.value}</>
                        ) : (
                                <DelayInput
                                    placeholder={item.name}
                                    defaultValue={item.value}
                                    fullWidth={true}
                                    className="bg-gray-200 px-2 rounded"
                                    giveValue={(value: string) => {
                                        setState({
                                            ...state,
                                            [item.name]: value.trim()
                                        })
                                    }}
                                />
                            )}
                    </p>
                </div>
            ))}

            <div className="text-xs mb-2 group">
                Your thought about geography ?
            </div>
            {edit ? (
                <DelayInput
                    component="textarea"
                    defaultValue={geoThought}
                    className="rounded bg-gray-200 p-2 w-full mb-3"
                    giveValue={(value: string) => {
                        setState({
                            ...state,
                            geoThought: value.trim()
                        })
                    }}
                />
            ) : (
                    <p className="text-center text-sm p-2 mb-4 font-medium">
                        <sup>
                            <svg width="1.1rem" height="1.1rem" viewBox="0 0 18 18" className="transform rotate-180 origin-center inline-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                            </svg>
                        </sup>
                        {geoThought}
                    </p>
                )}

            {edit ? (
                <div className="text-right">
                    <Button color="primary" size="small">
                        save
                    </Button>
                    <Button color="secondary" size="small">
                        cancel
                    </Button>
                </div>
            ) : (
                    <Button
                        color="primary"
                        fullWidth={true}
                        onClick={editClickHandler}
                    >
                        Update
                    </Button>
                )
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                maxWidth="xs"
                fullWidth={true}
                scroll="body"
                fullScreen={fullScreen}
            >
                <AvatarDialog
                    onClose={() => setState({
                        ...state,
                        open: false
                    })}
                />
            </Dialog>
        </div>
    )
}

export default memo(UserInfo)
