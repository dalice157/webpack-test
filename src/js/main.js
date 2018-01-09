import '../css/style.css';
import '../css/button.css';

import '../scss/style.scss';
import '../scss/button.scss';

import 'jquery';
import {myButton, myDesc} from './init';

if (module.hot) {  
	module.hot.accept();
 }

myDesc.hide();
myButton.on('click', function(e){
    myDesc.toggle();    
});
