import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from "../utils/API";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      surveys: []
    }
  }
  async componentDidMount() {
    this.getSurveys();
  };
  getSurveys() {
    API.get('/list.json').then((res) => {  
      this.setState({ surveys: Object.values(res.data)});
     })   
    .catch((err) => { console.log(err); });
  }

  render() {
    return (
        <div>
          <h2>Home</h2>
          
          <div>
            <table className='surveyList'>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.surveys.map((survey,index) => {
                  return (
                    <tr key={index}>
                      <td> { survey.name } </td>
                      <td> { survey.code } </td>
                      <td> <Link to={'/survey/'+survey.code} className="">view</Link> </td>
                    </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

    );
  }
}

export default Home;