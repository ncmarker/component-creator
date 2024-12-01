import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { DropdownInput } from "../components/DropdownInput";
import LiveComponentRender from "../components/LiveComponentRender";

import CodeSampleButton from "../helper_function/CodeSampleButton";


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

    console.log(componentData);

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

    function handleChange(e) {
        setComponentData({ ...componentData, [e.target.name]: e.target.value });
    };

    function handleSaveChanges(id) {
        const hasEmptyValue = Object.values(componentData).some(value => value === "");
        if (hasEmptyValue) {
            alert("You must fill in all input fields.")
            return;
        }

        // begin showing live render
        setShowRenderCode(true);
        
        // PUT /components/id 
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

        // PUT /component_info/component_id
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

        // PUT /component_code/component_id
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
                    />
                    <DropdownInput
                        value={componentData.type}
                        onChange={handleTypeChange}
                        options={['button', 'image', 'input']}
                        label="Component Type"
                        name="type"
                    />
                </div>
                <div className="flex flex-row gap-8">
                    {componentData.type === 'button' && <ButtonAttributes componentData={componentData} handleChange={handleChange} />}
                    {componentData.type === 'image' && <ImageAttributes componentData={componentData} handleChange={handleChange} />}
                    {componentData.type === 'input' && <InputAttributes componentData={componentData} handleChange={handleChange} />}
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


function ButtonAttributes({componentData, handleChange}) {
    return(
        <>
        <div className="flex flex-col gap-4 w-1/2">
            <TextInput 
                value={componentData.text} 
                onChange={handleChange}
                label = "Default Text"
                placeholder="ex. Click Me"
                name="text"
            />
            <TextInput 
                value={componentData.font_color} 
                onChange={handleChange}
                label = "Default Font Color"
                placeholder="ex. black"
                name="text_color"
            />
            <TextInput 
                value={componentData.border_radius} 
                onChange={handleChange}
                label = "Default Border Radius (in pixels)"
                placeholder="ex. 12"
                name="border_radius"
            />

        </div>
        <div className="flex flex-col gap-4 w-1/2">
            <TextInput 
                value={componentData.bg_color} 
                onChange={handleChange}
                label = "Default Background Color"
                placeholder="ex. green"
                name="bg_color"
            />
            <TextInput 
                value={componentData.text_size} 
                onChange={handleChange}
                label = "Default Font Size (in pixels)"
                placeholder="ex. 14"
                name="text_size"
            />
            <DropdownInput
                value={componentData.size}
                onChange={handleChange}
                options={['small', 'medium', 'large']}
                label="Default Size"
                name="size"
            />
        </div>
        </>
    );
}


function ImageAttributes({componentData, handleChange}) {
    return (
        <>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.alt} 
                    onChange={handleChange}
                    label = "Default Alt Text"
                    placeholder="ex. profile photo"
                    name="alt"
                />
                <TextInput 
                    value={componentData.border_color} 
                    onChange={handleChange}
                    label = "Default Border Color"
                    placeholder="ex. grey"
                    name="border_color"
                />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.border_radius} 
                    onChange={handleChange}
                    label = "Default Border Radius (in pixels)"
                    placeholder="ex. 12"
                    name="border_radius"
                />
                <DropdownInput
                    value={componentData.size}
                    onChange={handleChange}
                    options={['small', 'medium', 'large']}
                    label="Default Size"
                    name="size"
                />
            </div>
        </>
    );
}


function InputAttributes({componentData, handleChange}) {
    return (
        <>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.placeholder} 
                    onChange={handleChange}
                    label = "Default Placeholder"
                    placeholder="ex. search..."
                    name="placeholder"
                />
                <TextInput 
                    value={componentData.text_color} 
                    onChange={handleChange}
                    label = "Default Text Color"
                    placeholder="ex. black"
                    name="text_color"
                />
                <TextInput 
                    value={componentData.bg_color} 
                    onChange={handleChange}
                    label = "Default Background Color"
                    placeholder="ex. white"
                    name="bg_color"
                />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <TextInput 
                    value={componentData.border_radius} 
                    onChange={handleChange}
                    label = "Default Border Radius (in pixels)"
                    placeholder="ex. 12"
                    name="border_radius"
                />
                <TextInput 
                    value={componentData.border_color} 
                    onChange={handleChange}
                    label = "Default Border Color"
                    placeholder="ex. grey"
                    name="border_color"
                />
                <DropdownInput
                    value={componentData.size}
                    onChange={handleChange}
                    options={['small', 'medium', 'large']}
                    label="Default Size"
                    name="size"
                />
            </div>
        </>
    );
}
