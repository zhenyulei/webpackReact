// Greeter.js
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {getData} from '../api/index.js'
import '../../css/sendIndex.scss'

class Greeter extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }


  componentDidMount(){
  	getData().then((data)=>{
  		console.log(data);
  	});
  }

  render() {
    return (
      <div>
       <h2>你好 你是谁 who are you得到</h2>
       <div className="box">我是个按钮</div>
       <Link to="sendDetail">点击我进行跳转</Link>
      </div>
    );
  }
}

export default Greeter