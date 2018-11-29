// Greeter.js
import React, {Component} from 'react'
import '../../css/style.scss'

class SendDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
       <h2>你好 我是第二个页面</h2>
       <div class="pox">元内容</div>
      </div>
    );
  }
}

export default SendDetail