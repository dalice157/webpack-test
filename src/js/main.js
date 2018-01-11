import '../css/style.css';
import '../css/button.css';

import '../scss/style.scss';
import '../scss/button.scss';

import 'jquery';
import {myButton, myDesc, print} from './init';
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

console.log("reload")
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
