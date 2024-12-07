import { TextInput } from "../components/TextInput";
import { DropdownInput } from "../components/DropdownInput";

export default function ButtonAttributes({componentData, handleChange, errors}) {
    return(
        <>
        <div className="flex flex-col gap-4 w-1/2">
            <TextInput 
                value={componentData.text} 
                onChange={handleChange}
                label = "Default Text"
                placeholder="ex. Click Me"
                name="text"
                error={errors.text}
            />
            <TextInput 
                value={componentData.text_color} 
                onChange={handleChange}
                label = "Default Font Color"
                placeholder="ex. black"
                name="text_color"
                error={errors.text_color}
            />
            <TextInput 
                value={componentData.border_radius} 
                onChange={handleChange}
                label = "Default Border Radius (in pixels)"
                placeholder="ex. 12"
                name="border_radius"
                error={errors.border_radius}
            />

        </div>
        <div className="flex flex-col gap-4 w-1/2">
            <TextInput 
                value={componentData.bg_color} 
                onChange={handleChange}
                label = "Default Background Color"
                placeholder="ex. green"
                name="bg_color"
                error={errors.bg_color}
            />
            <TextInput 
                value={componentData.text_size} 
                onChange={handleChange}
                label = "Default Font Size (in pixels)"
                placeholder="ex. 14"
                name="text_size"
                error={errors.text_size}
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