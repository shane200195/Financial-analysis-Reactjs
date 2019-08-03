'use strict';

const e = React.createElement;

class LinRegression extends React.Component {
  render() {
    //  "<label for='nameInput'>Days in the past</label> <input type='text' id='days' placeholder='50'> <label for='nameInput'>How many data point do you want the regression to go for</label> <input type='text' id='lin_regression' placeholder='50'>"
    return e('div', {id: "react-form"},
      e('label', {for: 'nameInput'}, "Days in the past: ", e('input', {type:'text', id:'days', placeholder:'50'})),
      e('label', {for: 'nameInput'}, "How many data point do you want the regression to go for: ", e('input', {type:'text', id:'lin_regression', placeholder:'50'}))
    )
  }
}

class MovingAverage extends React.Component{
  render() {
    //<label for='nameInput'>Number of days in MA</label> <input type='text' id='past_days' placeholder='50'><label for='nameInput'>Total number of days</label> <input type='text' id='total_days' placeholder='50'>
      return e('div', {id: "react-form"},
        e('label', {for:'nameInput'}, "Number of days in the past", e('input', {type:'text', id:'past_days', placeholder:'50'})),
        e('label', {for:'nameInput'}, "Total number of days", e('input', {type:'text', id:'total_days', placeholder:'50'}))
      )
  }
}

class SubmitButton extends React.Component{
  handleSubmit(e){
    if(analysis_mode == "Linear Regression"){
        lin_regression_ajax(event);
    }else if(analysis_mode == "Moving Average"){
        moving_average_ajax(event)
    }
  }
  render(){
    //<button type="submit" class="submit-button">Submit</button>
    return e('button', {class:'submit-button', onClick:this.handleSubmit}, 'Submit')
  }
}
