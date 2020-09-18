import React, { useRef, useEffect, useState, memo } from "react"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import { CameraAlt } from "@material-ui/icons"
import Croppie from "croppie"
import "./croppie.css"


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
        if (!state.croppie) {
            setState({
                ...state,
                croppie: new Croppie(
                    crpRef.current as HTMLDivElement,
                    croppieOps
                )
            })
        }
    }, [croppieOps, state])

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

export default memo(AvatarDialog)