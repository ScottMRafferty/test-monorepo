import {useState} from 'react';
import { JsonForms } from "@jsonforms/react";
import { createAjv, generateDefaultUISchema } from '@jsonforms/core';
import { vanillaCells, vanillaRenderers, JsonFormsStyleContext } from '@jsonforms/vanilla-renderers';

const styleContextValue = { styles: [
	{
    name: 'control.validation',
    classNames: ['form-vanilla-validation-error']
  	},
	{
    name: 'control.validation.error',
    classNames: ['form-vanilla-validation-error']
  },
  {
    name: 'control.input',
    classNames: ['form-vanilla-input']
  },
  {
    name: 'input.description',
    classNames: ['form-vanilla-description'],
  },
  {
    name: 'button',
    classNames: ['form-vanilla-button']
  },
  {
    name: 'array.button',
    classNames: ['form-vanilla-button']
  }
]};

export default(props) => {

	const {schema, readOnly, handleSubmit} = props;

	const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState(props.formData||{});
	const [validationMode, setValidationMode] = useState('ValidateAndHide')

	const onChange = ({data,errors}) => {
        console.debug('onChange',data,errors);
        setFormData(data);        
        setErrors(errors);
    };

	const onSubmit = (formData) => {
		if (errors.length > 0)
			setValidationMode("ValidateAndShow");
		else
			handleSubmit(formData);
	}

	let uiSchema = schema.ui;
	if (!uiSchema && schema.form?.properties) {

		// JSONForms.IO will generate a default VerticalLayout schema but here we consider
		// custom JSONForm properties i.e. placeholder, description and help.  We do this to
		// keep our schemas a little simpler but don't lose the ability to customise at will.

		uiSchema = generateDefaultUISchema(schema.form, 'VerticalLayout');

		// Loop through our base properties - 1 level for the moment to keep it simple
		Object.keys(schema.form.properties||{}).map(prop=>{
			const o = schema.form.properties[prop];

			// Qualifies?
			if (o.placeholder || o.description || o.help) {
				const control = (uiSchema?.elements||[]).find(_ => _.scope === `#/properties/${prop}`);
				if (control) {
					control.options = {
						showUnfocusedDescription: o.description?true:false,
						placeholder: o.placeholder,
						help: o.help
					}
				}
			}
		});

		console.log('Auto UI Schema',uiSchema);


	}

	// We have an issue with CSS injection hence the className switch for the submit button
	const submitDisabled = (validationMode==='ValidateAndShow'&&errors.length>0) || false;

	return (
		<div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black" style={{width: '100%'}}>
        <JsonFormsStyleContext.Provider value={styleContextValue}>
        <JsonForms
            schema={schema.form}
			uischema={uiSchema}
            data={formData}
			renderers={vanillaRenderers}
      		cells={vanillaCells}
            validationMode="All"
            onChange={onChange}
            readonly={readOnly||false}
			validationMode={validationMode}
        />  
        </JsonFormsStyleContext.Provider>
		<button key={`btn-${submitDisabled}`} onClick={onSubmit} disabled={submitDisabled} className={'form-vanilla-button'} style={submitDisabled?{color: '#cccccc',cursor: 'not-allowed',opacity: 0.5}:{}}>Submit</button>
		</div>
    );

}