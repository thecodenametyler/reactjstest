import React, { Component } from 'react';
import API from "../utils/API";

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      survey: [],
      slug: ''
    }
  }
  async componentDidMount() {
    this.state.slug = this.props.match.params.slug;
    this.getSurvey(this.state.slug);
  };
  getSurvey(slug) {
    API.get('/'+slug+'.json').then((res) => {  
      this.setState({ survey: Object.values(res.data)});
     })   
    .catch((err) => { console.log(err); });
  }
  renderSwitch(param) {
    switch(param.type) {
      case 'qcm':
        var result = Object.keys(param.result).map((key) => [String(key), param.result[key]]);
        return result;
      case 'numeric':
        var result = (param.result.toString()).split();
        return result;
      case 'date':
        return param.result;
      default:
        return 'No case for type: ' + param.type;
    }
  }
  render() {
    return (
      <div>
        <h2>Survey</h2>
        
        <div>
          <table className='surveyDetails'>
            <thead>
              <tr>
                  <th>Code : {this.state.slug} </th>
              </tr>
            </thead>
            <tbody>
              {this.state.survey.map((survey,index) => {
                return (
                  <tr key={index}>
                    <td>
                      <table>
                        <thead>
                          <tr>
                            <th>type</th>
                            <th>label</th>
                            <th>result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>{ survey.type }</strong></td>
                            <td>{ survey.label }</td>
                            <td>
                              <ul>
                                {this.renderSwitch(survey).map((result,index) => {
                                return (
                                  <li key={index}>{result}</li>
                                )})}
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Survey;