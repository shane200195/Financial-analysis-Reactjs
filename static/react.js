'use strict';

const e = React.createElement;

class InfoForms extends React.Component{
    constructor(props) {
        super(props);
        //initiating the different values of input fields
        this.state = {value1: '', value2: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSubmit(e){
        if(analysis_mode == "Linear Regression"){
            lin_regression_ajax(event, this.state.value1, this.state.value2);
        }else if(analysis_mode == "Moving Average"){
            moving_average_ajax(event, this.state.value1, this.state.value2);
        }
        event.preventDefault;
    }

    render() {
        if (analysis_mode == "Moving Average"){
        //<label for='nameInput'>Number of days in MA</label> <input type='text' id='past_days' placeholder='50'><label for='nameInput'>Total number of days</label> <input type='text' id='total_days' placeholder='50'>
            return e('div', {id: "react-form"},
                e('label', {for:'nameInput'}, "Number of days in the past", e('input', {type:'text', id:'past_days', placeholder:'50', value:this.state.value1, onChange:this.handleChange, name:'value1'})),
                e('label', {for:'nameInput'}, "Total number of days", e('input', {type:'text', id:'total_days', placeholder:'50', value:this.state.value2, onChange:this.handleChange, name:'value2'})),
                e('button', {class:'submit-button', onClick:this.handleSubmit}, 'Submit')
            )
        }else{
            return e('div', {id: "react-form"},
              e('label', {for: 'nameInput'}, "Days in the past: ", e('input', {type:'text', id:'days', placeholder:'50', value:this.state.value1, onChange:this.handleChange, name:'value1'})),
              e('label', {for: 'nameInput'}, "How many data point do you want the regression to go for: ", e('input', {type:'text', id:'lin_regression', placeholder:'50', value:this.state.value2, onChange:this.handleChange, name:'value2'})),
              e('button', {class:'submit-button', onClick:this.handleSubmit}, 'Submit')
            )
        }
    }
}
