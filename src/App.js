import React from 'react';
import './App.css';

class App extends React.Component{
  onSubmit(formData){
    alert(JSON.stringify(formData));
  }

  render(){
    let formFields = [
      {
        "tag": "input",
        "name": "first_name",
        "type": "text",
        "label": "First Name"
      },
      {
        "tag": "input",
        "name": "last_name",
        "type": "text",
        "label": "Last Name"
      },
      {
        "tag": "input",
        "name": "email",
        "type": "email",
        "label": "Email Address"
      },
      {
        "tag": "input",
        "name": "phone_number",
        "type": "text",
        "label": "Phone Number"
      },
      {
        "tag": "input",
        "name": "job_title",
        "type": "text",
        "label": "Job Title"
      },
      {
        "tag": "input",
        "name": "date_of_birth",
        "type": "date",
        "label": "Date of Birth"
      },
      {
        "tag": "input",
        "name": "parental_consent",
        "type": "checkbox",
        "label": "Parental Consent",
        "conditional": { "name": "date_of_birth", "show_if": requiresParentalConsent }
      }
    ];
    return (
      <div className="App">
        <Form 
        className = "Form-container"
        title = "Dynamic Form"
        formFields = {formFields} 
        onSubmit = {this.onSubmit}
        />
      </div>  
    );
  }
}

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  onChange(event, key){
    this.setState(
      { [key] : event.target.value }
    );
  }

  onSubmit(event){
    this.props.onSubmit(this.state);
  }

  renderForm(){
    let formFields = this.props.formFields;
    let formUI = formFields.map((field)=>{
      let tag = field.tag || "input";
      let type = field.type || "text";
      let name = field.name;
      let label = field.label;
      let show = true;
      if (field.conditional!=null){
        let key = field.conditional.name;
        let evaluator = field.conditional.show_if;
        if(!(key in this.state) || !evaluator(this.state[key])){
          show = false;
        }
      }
      if (show){
        return (
          <div className="Form-field" key={name}>
            <label className = "Form-label" key ={"label"+name}>{label}</label>
            <input 
            className="Form-input"
            type = {type}
            key = {"input"+name}
            onChange = {(event) => {this.onChange(event, name)}}
            />
          </div>
        );
      }
    });
    return formUI;
  }

  render(){
    return (
      <div className={this.props.className}>
       <div className="Form-title">{this.props.title}</div>
        <form 
        className="Form" 
        onSubmit={ (event)=>{ this.onSubmit(event) }} >
          {this.renderForm()}
          <div className="Form-field">
            <button className="Form_button" >Submit Form</button>
          </div>
        </form>
      </div>
    );
  }
}

function requiresParentalConsent(value){
    var returnValue = false;
    var dateValues = value.split('-');
    try{
      var birthDate = new Date(parseInt(dateValues[0]) , parseInt(dateValues[1]) -1 ,parseInt( dateValues[2]));
      const now = new Date(); 
      returnValue = birthDate >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
    }
    catch{
      console.log("Date Comparision failed!");
    }
    return returnValue;
  }

export default App;
