import React, { memo } from 'react'


function Dummy() {
    return (
        <div className="py-10 text-center text-base text-blue-600">
            <div className="mb-3">
                Coming soon ^-^
            </div>
            <div
                style={{
                    backgroundImage: `url(http://localhost:3000/static/image/coming.jpg)`
                }}
                className="bg-no-repeat bg-contain bg-center h-48"
            >

            </div>
        </div>
    )
}

export default memo(Dummy)
