import { FiCopy } from "react-icons/fi";

export default function CodeSampleButton({ attributes, code, setCode }) {
    let indentedCode;

    if (attributes.type === 'button') {
        const {
            name,
            type,
            text,
            text_color,
            border_radius,
            bg_color,
            text_size,
            size,
        } = attributes;
    
        const padding = size === 'small' ? '6px 12px' : size === 'medium' ? '8px 16px' : '10px 20px';
    
        indentedCode = attributes.type ? `
export default function ${name}(props) {
    const text = props.text || '${text}';
    const bgColor = props.bgColor || '${bg_color}';
    const fontColor = props.fontColor || '${text_color}';
    const borderRadius = props.borderRadius || '${border_radius}';
    const textSize = props.textSize || '${text_size}';
    const padding = props.padding || '${padding}';

    return (
        <button
            type={props.type || "button"}
            style={{
                backgroundColor: bgColor,
                color: fontColor,
                borderRadius: borderRadius,
                fontSize: textSize,
                padding: padding,
                border: 'none',
                cursor: 'pointer',
            }}
            onClick={props.onClick}
        >
            {text}
        </button>
    );
}
`.trim() : '';
        setCode(indentedCode);
    }
    else if (attributes.type === 'image') {
        const {
            name,
            type,
            alt, 
            border_color, 
            border_radius, 
            size,
        } = attributes;
    
        const width = size === 'small' ? '64px' : size === 'medium' ? '96px' : '128px';
        const height = size === 'small' ? '64px' : size === 'medium' ? '96px' : '128px';
    
        indentedCode = attributes.type ? `
export default function ${name}(props) {
    const alt = props.alt || '${alt}';
    const borderColor = props.borderColor || '${border_color}';
    const borderRadius = props.borderRadius || '${border_radius}';
    const width = props.width || '${width};
    const height = props.height || '${height};

    return (
        <img 
            src={props.src || "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500-300x300.jpg"}
            alt={props.alt || alt}
            style={{
                borderRadius: borderRadius,
                borderColor: borderColor,
                borderWidth: '2px',
                objectFit: 'cover',
                width: width,
                height: height
            }}
        />
    );
}
`.trim() : '';
        setCode(indentedCode);
    }
    else if (attributes.type === 'input') {
        const {
            name,
            type,
            placeholder, 
            text_color, 
            bg_color, 
            border_color, 
            border_radius, 
            size,
        } = attributes;
    
        const height = size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px';
        const width = size === 'small' ? '96px' : size === 'medium' ? '192px' : '288px';
        const fontSize = size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px';
    
        indentedCode = attributes.type ? `
export default function ${name}(props) {
    const placeholder = props.placeholder || '${placeholder}';
    const fontColor = props.fontColor || '${text_color}';
    const bgColor = props.bgColor || '${bg_color}';
    const borderColor = props.borderColor || '${border_color}';
    const borderRadius = props.borderRadius || '${border_radius}';
    const width = props.width || '${width};
    const height = props.height || '${height};
    const fontSize = props.fontSize || '${fontSize};

    return (
        <input
            type='text'
            placeholder={placeholder}
            style={{
                color: fontColor,
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderRadius: borderRadius,
                fontSize: fontSize,
                height: height,
                width: width,
                borderWidth: '2px',
                padding: '8px',
                outline: 'none',
            }}
            value={props.value}
            onChange={props.onChange}
        />
    );
}
`.trim() : '';
        setCode(indentedCode);
    }
    

    return (
        <div className="w-full h-[190px] relative bg-black rounded-lg shadow-lg">

            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-700 flex items-center justify-between px-4 rounded-t-lg">
                <span className="text-white text-sm font-medium">{attributes.name}</span>
                <button
                    className="text-gray-300 hover:text-white focus:outline-none"
                    onClick={() => navigator.clipboard.writeText(indentedCode)}
                >
                    <FiCopy className="h-5 w-5" />
                </button>
            </div>

            <div className="overflow-auto h-full p-4 pt-12 text-sm text-gray-100 font-mono">
                <pre>
                    <code>{indentedCode}</code>
                </pre>
            </div>

        </div>
    );
}



