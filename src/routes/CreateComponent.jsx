import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { DropdownInput } from "../components/DropdownInput";
import { toast } from "react-toastify";
import LiveComponentRender from "../components/LiveComponentRender";
import CodeSampleButton from "../components/CodeSampleButton";
import ButtonAttributes from "../components/ButtonAttributes";
import ImageAttributes from "../components/ImageAttributes";
import InputAttributes from "../components/InputAttributes";


export function CreateComponent() {
    const [code, setCode] = useState('');
    const currComponentId = sessionStorage.getItem('currentComponent');
    const currData = useLoaderData();

    const [showRenderCode, setShowRenderCode] = useState(false);

    const { id, component_id, ...restData } = currData || {};
    const [componentData, setComponentData] = useState(restData.attributes || {
        name: "", 
        type: "",
        }
    );

    const [errors, setErrors] = useState({});

    // set page title
    useEffect(() => {
        document.title = "Create Component";
    }, []);

    // handles when the component type is changed, transitions to different component data and retains common attributes
    function handleTypeChange(e) {
        if (e.target.value === 'button') {
            setComponentData({
                name: componentData.name || "",
                type: 'button',
                text: componentData.text || "", 
                text_color: componentData.text_color || "", 
                border_radius: componentData.border_radius || "", 
                bg_color: componentData.bg_color || "", 
                text_size: componentData.text_size || "", 
                size: componentData.size || "",
            });
        }
        else if (e.target.value === 'image') {
            setComponentData({
                name: componentData.name || "",
                type: 'image',
                alt: componentData.alt || "", 
                border_color: componentData.border_color || "", 
                border_radius: componentData.border_radius || "", 
                size: componentData.size || "",
            });
        }
        else if (e.target.value === 'input') {
            setComponentData({
                name: componentData.name || "",
                type: 'input',
                placeholder: componentData.placeholder || "", 
                text_color: componentData.text_color || "", 
                bg_color: componentData.bg_color || "", 
                border_color: componentData.border_color || "", 
                border_radius: componentData.border_radius || "", 
                size: componentData.size || "",
            });
        }
    }

    // handles when data in the form is changed (component attributes)
    function handleChange(e) {
        setComponentData({ ...componentData, [e.target.name]: e.target.value });
    };

    // validates form inputs before sending to backend
    function validateForm() {
        const newErrors = {};
        
        if (!componentData.name) newErrors.name = "Name is required.";
        if (!componentData.type) newErrors.type = "Type is required.";

        if (componentData.type === 'button') {
            if (!componentData.text) newErrors.text = "Text is required.";
            if (!componentData.text_color) newErrors.text_color = "Text color is required.";
            if (!componentData.border_radius) newErrors.border_radius = "Border radius is required.";
            if (!componentData.bg_color) newErrors.bg_color = "Background color is required.";
            if (!componentData.text_size) newErrors.text_size = "Text size is required.";
            if (!componentData.size) newErrors.size = "Size is required.";
        }
        else if (componentData.type === 'image') {
            if (!componentData.alt) newErrors.alt = "Alt text is required.";
            if (!componentData.border_color) newErrors.border_color = "Border color is required.";
            if (!componentData.border_radius) newErrors.border_radius = "Border radius is required.";
            if (!componentData.size) newErrors.size = "Size is required.";
        }
        else if (componentData.type === 'input') {
            if (!componentData.placeholder) newErrors.placeholder = "Placeholder is required.";
            if (!componentData.text_color) newErrors.text_color = "Text color is required.";
            if (!componentData.bg_color) newErrors.bg_color = "Background color is required.";
            if (!componentData.border_color) newErrors.border_color = "Border color is required.";
            if (!componentData.border_radius) newErrors.border_radius = "Border radius is required.";
            if (!componentData.size) newErrors.size = "Size is required.";
        }

        setErrors(newErrors);

        // return if errors or not
        return Object.keys(newErrors).length === 0;
    }

    // handles when a specific component is saved, updating its data in the 'database'
    function handleSaveChanges(id) {
        if (!validateForm()) return;

        // begin showing live render
        setShowRenderCode(true);
        
        // PUT /components/id, saved component basic info (name, type)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/components/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": componentData.name,
                "type": componentData.type,
            })
        })
        .catch((err) => console.error(err));

        // PUT /component_info/component_id, saves component's attribute data
        fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info/${currComponentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "attributes": componentData
            })
        })
        .catch((err) => console.error(err));

        // PUT /component_code/component_id, saves component's code
        fetch(`${process.env.REACT_APP_BACKEND_URL}/component_code/${currComponentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "code": code
            })
        })
        .catch((err) => console.error(err));

        toast.success("component successfully saved");
    }


    return(
        <div className="flex flex-row h-full m-[60px] mt-[30px] gap-8">
            <div className="card-no-spacing flex flex-col gap-8 w-1/2">
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-4xl">Customize Component</h2>
                    <p>Fill out all fields below to customize your React component. If default attributes not changed, the current values will be used.</p>
                </div>
                <div className="flex flex-row gap-8 w-full">
                    <TextInput 
                        value={componentData.name} 
                        onChange={handleChange}
                        label = "Component Name"
                        placeholder="MyComponent"
                        name="name"
                        error={errors.name}
                    />
                    <DropdownInput
                        value={componentData.type}
                        onChange={handleTypeChange}
                        options={['button', 'image', 'input']}
                        label="Component Type"
                        name="type"
                        error={errors.type}
                    />
                </div>
                <div className="flex flex-row gap-8">
                    {componentData.type === 'button' && <ButtonAttributes componentData={componentData} handleChange={handleChange} errors={errors} />}
                    {componentData.type === 'image' && <ImageAttributes componentData={componentData} handleChange={handleChange} errors={errors} />}
                    {componentData.type === 'input' && <InputAttributes componentData={componentData} handleChange={handleChange} errors={errors} />}
                </div>
                {componentData.type && 
                <>
                    <p>You must pass in the following props:  
                        {componentData.type === 'button' ? ' onClick' : componentData.type === 'image' ? ' src' : componentData.type === 'input' ? ' value, onChange' : ''}
                    </p>
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white font-regular rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => handleSaveChanges(currComponentId)}
                    >Save Component</button> 
                </>}
            </div>
            <div className="flex flex-col gap-8 w-1/2">
                <div className="card-no-spacing flex flex-col gap-4 max-h-1/2">
                    <h2 className="font-bold text-4xl">Live Render</h2>
                    <div className="w-full h-[195px] relative bg-gray-200 rounded-xl border border-gray-300 flex items-center justify-center overflow-hidden">
                        {componentData.type && showRenderCode && <LiveComponentRender attributes={componentData} />}
                    </div>
                </div>
                <div className="card-no-spacing flex flex-col gap-4 max-h-1/2">
                    <h2 className="font-bold text-4xl">Code</h2>
                    <CodeSampleButton code={code} setCode={setCode} attributes={componentData} />
                </div>
            </div>
        </div>

    );
}