import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const Form = ({ 
    title, 
    fields = [], 
    onSubmit, 
    submitLabel = 'Enviar',
    loading = false,
    className = ''
}) => {
    const renderField = (field) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            value: field.value,
            onChange: field.onChange,
            required: field.required,
            className: 'w-full',
            placeholder: field.placeholder
        };

        switch (field.type) {
            case 'text':
                return <InputText {...commonProps} />;
            case 'password':
                return <Password {...commonProps} toggleMask feedback={false} />;
            case 'textarea':
                return <InputTextarea {...commonProps} rows={field.rows || 3} />;
            case 'dropdown':
                return (
                    <Dropdown 
                        {...commonProps}
                        options={field.options}
                        optionLabel={field.optionLabel || 'label'}
                        optionValue={field.optionValue || 'value'}
                    />
                );
            case 'date':
                return (
                    <Calendar 
                        {...commonProps}
                        dateFormat="dd/mm/yy"
                        showIcon
                    />
                );
            default:
                return <InputText {...commonProps} />;
        }
    };

    return (
        <Card className={`w-full md:w-6 lg:w-4 ${className}`}>
            <h2 className="text-center mb-4">{title}</h2>
            <form onSubmit={onSubmit} className="flex flex-column gap-3">
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-column gap-2">
                        <label htmlFor={field.name} className="font-medium">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                        {field.error && (
                            <small className="text-red-500">{field.error}</small>
                        )}
                    </div>
                ))}
                <Button 
                    type="submit" 
                    label={submitLabel} 
                    className="mt-3"
                    loading={loading}
                />
            </form>
        </Card>
    );
};

export default Form; 