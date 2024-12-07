import { TextInput } from "../components/TextInput";
import { DropdownInput } from "../components/DropdownInput";

export default function InputAttributes({componentData, handleChange, errors}) {
    return (
        <>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.placeholder} 
                    onChange={handleChange}
                    label = "Default Placeholder"
                    placeholder="ex. search..."
                    name="placeholder"
                    error={errors.placeholder}
                />
                <TextInput 
                    value={componentData.text_color} 
                    onChange={handleChange}
                    label = "Default Text Color"
                    placeholder="ex. black"
                    name="text_color"
                    error={errors.text_color}
                />
                <TextInput 
                    value={componentData.bg_color} 
                    onChange={handleChange}
                    label = "Default Background Color"
                    placeholder="ex. white"
                    name="bg_color"
                    error={errors.bg_color}
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
                <TextInput 
                    value={componentData.border_color} 
                    onChange={handleChange}
                    label = "Default Border Color"
                    placeholder="ex. grey"
                    name="border_color"
                    error={errors.border_color}
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
