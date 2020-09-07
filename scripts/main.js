let myImage = document.querySelector("img")

myImage.onclick = function()
{
	let mySrc = myImage.getAttribute('src')
	if(mySrc === 'images/aben2.jpg'){
		myImage.setAttribute('src','images/aben3.jpg');
	}
	else {
		myImage.setAttribute('src','images/aben2.jpg');
	}
}