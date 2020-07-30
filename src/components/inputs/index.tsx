import React from 'react'


export interface InputParam {
    type: "text" | "number" | "file" | "date";
}

export function Input({ type }: InputParam) {
    return (
        <input type={type} />
    )
}
