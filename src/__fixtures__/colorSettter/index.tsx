import React, { memo, useState } from "react"
import { CompactPicker, ColorResult } from "react-color"
import Popover from "@material-ui/core/Popover"
import { Tooltip } from "@material-ui/core"


export interface ColorSetterProps {
    giveColor: (color: string) => void;
    defaultBg?: string;
}

function ColorSetter({ giveColor, defaultBg }: ColorSetterProps) {

    const [state, setState] = useState<{
        anchor: HTMLElement | null;
        bgColor: string;
    }>({
        anchor: null,
        bgColor: defaultBg || "orange"
    })
    const { anchor, bgColor } = state

    const changeColor = (color: ColorResult, evt: any) => {
        setState({
            ...state,
            bgColor: color.hex,
            anchor: null
        })
        // give color's hex value to parent
        giveColor(color.hex)
    }

    return (
        <>
            <Tooltip title="Set color" placement="top">
                <div
                    className={`w-5 h-5 rounded cursor-pointer`}
                    onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => setState({
                        ...state,
                        anchor: evt.currentTarget
                    })}
                    style={{
                        backgroundColor: bgColor
                    }}
                >
                </div>
            </Tooltip>
            <Popover
                open={!!anchor}
                anchorEl={anchor}
                onClose={() => setState({
                    ...state,
                    anchor: null
                })}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <CompactPicker
                    color={bgColor}
                    onChangeComplete={changeColor}
                    // triangle="top"
                    // colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}
                />
            </Popover>
        </>
    )
}

export default memo(ColorSetter)