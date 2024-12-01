import React from 'react';

export default function LiveComponentRender({ attributes }) {
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
    
    
        const buttonStyles = {
            backgroundColor: bg_color,
            color: text_color,
            borderRadius: `${border_radius}px`,
            fontSize: `${text_size}px`,
            padding: size === 'small' ? '6px 12px' : size === 'medium' ? '8px 16px' : '10px 20px',
            border: 'none',
            cursor: 'pointer',
        };
    
        return (
            <button className="absolute max-w-full max-h-full" style={buttonStyles}>{text || 'Button'}</button>
        );
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

        const imageStyles = {
            width: size === 'small' ? '64px' : size === 'medium' ? '96px' : '128px',
            height: size === 'small' ? '64px' : size === 'medium' ? '96px' : '128px',
            borderColor: `${border_color}`,
            borderRadius: `${border_radius}px`,
            borderWidth: '2px',
            objectFit: 'cover',
        };

        return (
            <img 
                className="absolute max-w-full max-h-full" 
                src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500-300x300.jpg"
                alt={alt || name}
                style={imageStyles}
            />
        );
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

        const inputStyles = {
            color: text_color,
            backgroundColor: bg_color,
            borderColor: border_color,
            borderRadius: `${border_radius}px`,
            borderWidth: '2px',
            padding: '8px',
            fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px',
            outline: 'none',
            height: size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px',
            width: size === 'small' ? '96px' : size === 'medium' ? '192px' : '288px',
        };

        return (
            <input
                type='text'
                placeholder={placeholder || name || 'Enter text'}
                style={inputStyles}
            />
        );
    }
    
}
