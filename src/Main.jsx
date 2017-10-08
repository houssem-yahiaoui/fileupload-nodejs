import React, {Component} from 'react';
const app = document.getElementById('app');
var This;
export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
    This = this;
  }
  
  toggle(){
    var {show} = This.state;
    This.setState({show: !show});
  }
  
  button(){
    var {show} = This.state;
    return <button onClick={This.toggle} className="btn btn-primary">{show ? "Hide" : "Show"}</button>
  }
  render(){
    var {show} = this.state;
    if(show) {
      return <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Hello This is from React</h1>
          <p className="lead">a text to show in small</p>
          {This.button()}
        </div>
      </div>
    } else {
      return <div>{This.button()}</div>;
    }
  }
}