import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from './Main';
const app = document.getElementById('app');
app.style.fontFamily = "Roboto";

render(<Main/>, app);