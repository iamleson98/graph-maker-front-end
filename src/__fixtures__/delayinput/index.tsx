import React, { memo, useEffect, useRef } from "react";
import InputBase from "@material-ui/core/InputBase";
import { debounceTime } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import TextareaAutosize from '@material-ui/core/TextareaAutosize'


export interface DelayInputParam {
    delay?: number,
    giveValue: (evt: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}
/**
 * @param {{ delay: Number, giveValue: Function, component?: 'textarea' | undefined }} param
 */
function DelayInput({
    delay = 500,
    giveValue,
    component,
    ...rest
}: any): JSX.Element {

    // references
    const inputRef = useRef<any>();
    const subscriptionRef = useRef<Subscription>();

    // fires after mounting:
    useEffect(() => {
        const { current } = inputRef;
        subscriptionRef.current = fromEvent(current, "keyup")
            .pipe(debounceTime(delay))
            .subscribe((evt: any) => {
                const { value } = evt.target
                giveValue(
                    typeof value === "string" ?
                        value.trim() :
                        value
                );
            });

        return () => {
            subscriptionRef.current?.unsubscribe()
        }
    }, [giveValue, delay]);

    return (
        <>
            {component === 'textarea' ? (
                <TextareaAutosize
                    ref={inputRef}
                    {...rest}
                />
            ) : (
                    <InputBase
                        ref={inputRef}
                        {...rest}
                    />
                )}
        </>
    );
}

export default memo(DelayInput);
