import '../css/style.css';
import '../css/button.css';

import '../scss/style.scss';
import '../scss/button.scss';

import 'jquery';
import {myButton, myDesc, print, dev, prod} from './init';
import printMe from './print.js';

if (module.hot) {  
	module.hot.accept();
}

myDesc.hide();
myButton.on('click', function(e){
    myDesc.toggle();    
});
print.on('click',function(){
	printMe();
})

let a = 12;

let foo = (x) => {
	let b = a * 4;
	function bar(y){
		let c = y * b;
		return c;
	}
	return bar(b);
}

console.log(foo(a));


const env =  NODE_ENV;
if (env === 'prod') {
	prod.show();
}else if (env === 'dev'){
	dev.show();
}
