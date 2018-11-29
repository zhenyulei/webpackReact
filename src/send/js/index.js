// main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './components/greeter.jsx';
import SendDetail from './components/sendDetail.jsx';

import { HashRouter,Route } from 'react-router-dom';

// if(module.hot){
// 	module.hot.accept();
// }

render(
<HashRouter>
    <div className="container">
        <Route path='/'  exact component={Greeter} />
        <Route path='/sendDetail' component={SendDetail} />
    </div>
</HashRouter>, 
document.getElementById('root'));
