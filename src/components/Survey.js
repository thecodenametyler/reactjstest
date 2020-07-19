import React, { Component } from 'react';
import API from "../utils/API";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      survey: []
    }
  }
  async componentDidMount() {
    let slug = this.props.match.params.slug;
    this.getSurvey(slug);
  };
  getSurvey(slug) {
    API.get('/'+slug+'.json').then((res) => {  
      this.setState({ survey: Object.values(res.data)});
     })   
    .catch((err) => { console.log(err); });
  }
  renderSwitch(param) {
    var result = "";
    switch(param.type) {
      case 'qcm':
        result = Object.keys(param.result).reduce((array, key) => {
          return [...array, {key: key, value: param.result[key]}]
        }, []);

        //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
        //reorder array base on object key
        result.sort((a, b) => (a.key > b.key) ? 1 : (a.key === b.key) ? ((a.value > b.value) ? 1 : -1) : -1 )
        
        var renderLineChart = (
          <LineChart width={600} height={300} data={result} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
          </LineChart>
        );

        return renderLineChart;
      case 'numeric':
        result = parseInt(param.result, 10);
        return result;
      case 'date':
        result = param.result.sort()
        const dateList = result.map((res, index) => {
          let date = new Date(res);
          let dateFormat = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
          return <li key={index}>{dateFormat}</li>
        }
        );
        return <ul>{dateList}</ul>;
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
                  <th>Code : {this.props.match.params.slug} </th>
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
                              {this.renderSwitch(survey)}
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