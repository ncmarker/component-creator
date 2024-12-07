import { TextInput } from "../components/TextInput";
import { DropdownInput } from "../components/DropdownInput";

export default function ImageAttributes({componentData, handleChange, errors}) {
    return (
        <>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.alt} 
                    onChange={handleChange}
                    label = "Default Alt Text"
                    placeholder="ex. profile photo"
                    name="alt"
                    error={errors.alt}
                />
                <TextInput 
                    value={componentData.border_color} 
                    onChange={handleChange}
                    label = "Default Border Color"
                    placeholder="ex. grey"
                    name="border_color"
                    error={errors.border_color}
                />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.border_radius} 
                    onChange={handleChange}
                    label = "Default Border Radius (in pixels)"
                    placeholder="ex. 12"
                    name="border_radius"
                    error={errors.border_radius}
                />
                <DropdownInput
                    value={componentData.size}
                    onChange={handleChange}
                    options={['small', 'medium', 'large']}
                    label="Default Size"
                    name="size"
                    error={errors.size}
                />
            </div>
        </>
    );
}