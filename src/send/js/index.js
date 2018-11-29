// main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './components/greeter.jsx';
import SendDetail from './components/sendDetail.jsx';

import { BrowserRouter,Route } from 'react-router-dom';


render(
<BrowserRouter>
    <div className="container">
        <Route path='/'  exact component={Greeter} />
        <Route path='/sendDetail' component={SendDetail} />
    </div>
</BrowserRouter>, 
document.getElementById('root'));
