// import '../css/style.css';
// import '../css/button.css';

// import '../scss/_color.scss';
import '../scss/style.scss';
import '../scss/button.scss';

import {myButton, myDesc} from './init';

myDesc.hide();
myButton.on('click', function(e){
    myDesc.toggle();    
});
