import React from 'react';
import '../styles/Form.css';



class App extends React.Component {
  
    constructor(){
      super();
  
      this.state = {
        heightFeet: '',
        heightInch: '',
        weight: '',
        age: '',
      }
  
      this.handleHeightFeetChange = this.handleHeightFeetChange.bind(this);
      this.handleHeightInchChange = this.handleHeightInchChange.bind(this);
      this.handleWeightChange = this.handleWeightChange.bind(this);
      this.handleAgeChange = this.handleAgeChange.bind(this);
      this.calculateBMI = this.calculateBMI.bind(this);
    }
  
    handleHeightFeetChange(event){
      this.setState({
        heightFeet: event.target.value
      });
    }
  
    handleHeightInchChange(event){
      this.setState({
        heightInch: event.target.value
      });
    }  
  
    handleWeightChange(event){
      this.setState({
        weight: event.target.value
      });
    }

    handleAgeChange(event){
      this.setState({
        age: event.target.value
      });
    }
  
    calculateBMI(){
      if (this.state.weight && this.state.heightFeet && this.state.heightInch){
        let INCHES_IN_FEET = 12;
  
        var height = Number(this.state.heightFeet);
            height *= INCHES_IN_FEET;
            height += Number(this.state.heightInch);
  
        let weight = this.state.weight;
  
        var bmi = (weight / (height * height)) * 703;
            bmi = bmi.toFixed(2);
  
        return bmi;
      }
    }

    calculateBMR(){
      if (this.state.age && this.state.weight && this.state.heightFeet && this.state.heightInch){
        let INCHES_IN_FEET = 12;
  
        var height = Number(this.state.heightFeet);
            height *= INCHES_IN_FEET;
            height += Number(this.state.heightInch);

        let weight = this.state.weight;

        let age = this.state.age;

        var bmr = (4.536 * weight) + (15.88 * height) - (5 * age) + 5;
            bmr = bmr.toFixed(0);

            return bmr;
      }
    }

    calculateBMRfemale(){
      if (this.state.age && this.state.weight && this.state.heightFeet && this.state.heightInch){
        let INCHES_IN_FEET = 12;
  
        var height = Number(this.state.heightFeet);
            height *= INCHES_IN_FEET;
            height += Number(this.state.heightInch);

        let weight = this.state.weight;

        let age = this.state.age;

        var bmrFemale = (4.536 * weight) + (15.88 * height) - (5 * age) - 161;
            bmrFemale = bmrFemale.toFixed(0);

            return bmrFemale;
      }
    }


    getBMIResults(bmi){
      let bmiResults = {
        label: '',
        alertClass: '',
      };
      
      if (bmi <= 18.5){
        bmiResults.label = 'Underweight';
        bmiResults.alertClass = 'alert-danger';
      } 
      else if (bmi <= 24.9) {
        bmiResults.label = 'Normal weight';
        bmiResults.alertClass = 'alert-success';
      }
      else if (bmi <= 29.9){
        bmiResults.label = 'Overweight';
        bmiResults.alertClass = 'alert-warning';
      }
      else if (bmi >= 30) {
        bmiResults.label = 'Obesity';
        bmiResults.alertClass = 'alert-danger';
      } else {
        bmiResults.label = 'BMI';
        bmiResults.alertClass = 'alert-primary';
      }
  
      return bmiResults;
    }

    getNum(val) {
      val = +val || 0
    return <span className="red">{val.toFixed(0)}</span>
    }
  


    render() {
  
      let bmi = this.calculateBMI();
      let results = this.getBMIResults(bmi);
      let bmr = this.calculateBMR();
      let bmrF = this.calculateBMRfemale();
      let sedentary = bmr * 1.2;
      let light = bmr * 1.375;
      let moderate = bmr * 1.55;
      let active = bmr * 1.725
      let superActive = bmr * 1.9;
      let sedentaryF = bmrF * 1.2;
      let lightF = bmrF * 1.375;
      let moderateF = bmrF * 1.55;
      let activeF = bmrF * 1.725
      let superActiveF = bmrF * 1.9;

  
      return (
        <div className="main">
        <div className="App container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Fitness Calculator</h1>
            </div>
          </div>
          <div className="form">
          <p>Enter your age, weight, and height below.</p>
            <div className="ui form">
              <form>
                <div className="form-group">
                  <legend>Weight (lbs)</legend>
                  <div className="row">
                    <div className="col-xs-12">
                      <input className="form-control" id="bmiWeight" placeholder= "150" type="number" min="1" max="1000" value={ this.state.weight } onChange={ this.handleWeightChange } />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <legend>Age</legend>
                  <div className="row">
                    <div className="col-xs-12">
                      <input className="form-control" placeholder="25" id="bmiAge" type="number" min="1" max="100" value={ this.state.age } onChange={ this.handleAgeChange } />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <legend>Height</legend>
                  <div className="row">
                    <div className="col-xs-6">
                      <input className="form-control" placeholder="Feet" id="bmiHeightFeet" type="number" min="1" max="12" value={ this.state.heightFeet } onChange={ this.handleHeightFeetChange } />
                    </div>
                    <div className="col-xs-6">
                      <input className="form-control" placeholder="Inches" id="bmiHeightInch" type="number" min="0" max="12" value={ this.state.heightInch } onChange={ this.handleHeightInchChange } />
                    </div>
                  </div>
                </div>
              </form>
            </div>
  
            <div className="col-sm-6">
              <br></br>
              <BmiDisplay bmi={bmi} label={results.label} alertClass={results.alertClass}/>
              <br></br>
              <br></br>
              <img className="ui fluid image" src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Body_mass_index_chart.svg"/>
            </div>
            <br></br>
          <div>
            <h1>Calories Burned Per Day</h1>
          <div className="ui stackable two column grid">

            <div className="column">
                <h3>Male</h3>
                <div>Basal Metabolic Rate(BMR) : {bmr}</div>
                <div>No Exercise: {this.getNum(sedentary)}</div>
                <div>Exercise 1-3 times per week: {this.getNum(light)}</div>
                <div>Moderate Exercise 3-5 times per week: {this.getNum(moderate)}</div>
                <div>Hard Exercise 6-7 days per week: {this.getNum(active)}</div>
                <div>Daily Exercise with Physical Job: {this.getNum(superActive)}</div>
            </div>
            <div className="column">
                <h3>Female</h3>
                <div>Basal Metabolic Rate(BMR) : {bmrF}</div>
                <div>No Exercise: {this.getNum(sedentaryF)}</div>
                <div>Exercise 1-3 times per week: {this.getNum(lightF)}</div>
                <div>Moderate Exercise 3-5 times per week: {this.getNum(moderateF)}</div>
                <div>Hard Exercise 6-7 days per week: {this.getNum(activeF)}</div>
                <div>Daily Exercise with Physical Job:{this.getNum(superActiveF)}</div>
            </div>
          </div>
          <br></br>
          <div className="info">
            <div className="ui text container">
              <h2>What is BMR?</h2>
              <p>Your BMR is the amount of calories you burn when your body is at rest. If your goal is to maintain your weight, you should consume the amount of calories that you burn daily according to your BMR and exercise. If your goal is to lose weight, it is recommended that you consume 400-600 calories less than what you burn daily. If your are underweight and your goal is to put on weight, consume more calories than you burn daily. </p>
            </div>
          </div>
          </div>
          </div>
        </div>
        <p><small>Mark Hernandez - 2020</small></p>

        </div>
      );
    }
  }
  
  function BmiDisplay(props){
    return (
      <div className={"bmi-result alert " + props.alertClass}>
        <div>{ props.bmi || '--.--' }</div>
        <br></br>
        <div>{ props.label }</div>
      </div> 
    )
  }

  export default App;