import React, { memo } from "react"
import { KeyOfStringInterface } from "../../constants"


export interface MenuData extends KeyOfStringInterface {
    content: string;
    click: (value: any) => void;
    key: string;
}

export interface MenuParam {
    data: MenuData[];
    refer: React.Ref<any>;
    addClass: string;
}

function Menu({ data, refer, addClass = "" }: MenuParam) {
    return (
        <div ref={refer} className={`rounded transform shadow hidden overflow-hidden bg-white text-gray-600 ${addClass}`}>
            {!!data.length && data.map((item, idx) => (
                <span
                    className="py-1 px-3 cursor-pointer text-left text-sm whitespace-no-wrap block font-normal hover:bg-gray-100"
                    key={idx}
                    onClick={() => item.click(item[item.key])}
                >
                    {item.content}
                </span>
            ))}
        </div>
    )
}

export default memo(Menu)
