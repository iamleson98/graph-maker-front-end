import React, { useRef, useEffect, useState, memo } from "react"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import { CameraAlt } from "@material-ui/icons"
import Croppie from "croppie"
import "./croppie.css"
import { useTranslation } from "react-i18next"
import { useMutation } from "@apollo/client"
import { UPLOAD_RESIZE_IMAGE } from "../../graphql/mutations"


export interface AvatarDialogProps {
    onClose: () => void;
}

function AvatarDialog({ onClose }: AvatarDialogProps) {

    // trans
    const { t } = useTranslation()

    // references
    const crpRef = useRef<any>()

    // croppie options
    const croppieOps: Croppie.CroppieOptions = {
        boundary: { width: 300, height: 280 },
        enableZoom: true,
        viewport: { width: 250, height: 250, type: "square" }
    }

    // component state
    const [state, setState] = useState<{
        croppie: Croppie | null;
        canSave: boolean;
        file: File | null;
    }>({
        croppie: null,
        canSave: false,
        file: null
    })
    const { croppie, canSave, file } = state

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
                ...state,
                croppie,
                canSave: true,
                file: files[0]
            })
        }
    }

    // mutation
    const [upFile, { data, loading }] = useMutation(UPLOAD_RESIZE_IMAGE)

    const handleSave = () => {
        upFile({
            variables: {
                input: {
                    file: file,
                    dimenParam: croppie?.get().points,
                }
            }
        })
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
                    {t("aboutUser.chooseNewAva")}
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
                    {t("save")}
                </Button>
                <Button
                    size="small"
                    color="secondary"
                    onClick={onClose}
                >
                    {t("cancel")}
                </Button>
            </DialogActions>
        </>
    )
}

export default memo(AvatarDialog)