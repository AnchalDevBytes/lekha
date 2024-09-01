import { ChangeEventHandler } from "react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface labelledInputType {
    label : string,
    type?: "text" | "password" | "email",
    placeholder: string,
    changeHandler: ChangeEventHandler
}

function LabelledInput({ label, type, placeholder, changeHandler }: labelledInputType) {
    return(
        <div>
            <Label htmlFor={label}>
                {label}
            </Label>
            <Input
                id={label}
                name={label}
                type={type}
                placeholder={placeholder}
                onChange={changeHandler}
            />
        </div>
    )
}

export default LabelledInput;