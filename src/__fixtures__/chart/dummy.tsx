import React, { memo } from 'react'


export interface DummyParam {
    giveState: (value: any) => void;
}

function Dummy({ giveState }: DummyParam) {
    return (
        <div></div>
    )
}

export default memo(Dummy)
