import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component{
    renderError(formProps){
        if (formProps.touched && formProps.error){
            return (
                <div>{formProps.error}</div>
            )
        }
    }
    renderInput = (formProps) => {
        //return <input onChange={formProps.input.onChange} value={formProps.input.value} />
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"/>
                <div style={{color: 'red'}}>{this.renderError(formProps.meta)}</div>
            </div>    
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(JSON.stringify(formValues));
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter title"/>
                <Field name="description" component={this.renderInput} label="Enter description"/>
                <button>Submit</button>
            </form>
        )
    }   
}

const validate = (formValues) => {
    //Errors.property looks for Field name and it's the same it passes the error
    //onto the this.renderInput which is formProps.meta.error
    const errors = {};

    if (!formValues.title){
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
