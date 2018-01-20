// TODO:  Add a nice documentation header.
const doc = document;
const gridBody = document.querySelector('body');
const colorGrid = document.querySelector('#pixel_canvas');
const btnSizePicker = document.querySelector('#size-picker-btn');

/*
* Single event handler for the page.
*/
function respondToEvents(evt) {

	// handle the event for the grid size submit button
    if (evt.target === btnSizePicker) {
    	// stop the page from reloading (the default behavior)
    	evt.preventDefault();

		// get the values from the sizePicker form inputs
		const height = document.querySelector('#input_height').value;
		const width = document.querySelector('#input_width').value;

		// draw a new grid
    	makeGrid(height, width);

    // the grid was clicked so color the cell
    // if the cell is already that color revert it back to white
	} else if (evt.target.nodeName === 'TD') {
		// the chosen color
		const color = document.querySelector('#colorPicker').value;

		// you can't compare color strings because their inconsistent
		// sometimes you get rgb(0,0,0) and sometimes hex values
		const compareColor = document.createElement('div');
		compareColor.style.backgroundColor = color;

		// now compare the object color formatting on both sides.
		if (evt.target.style.backgroundColor === compareColor.style.backgroundColor) {
			evt.target.style.backgroundColor = '#fff';
		} else {
			evt.target.style.backgroundColor = color;
		}

		// no need to continue bubbling.  We're done.
		evt.stopPropagation();
	}
}

/*
* Display a table, remove any existing table first.
*/
function makeGrid(height, width) {

	// clear the current grid if there are child nodes
	let myNode = document.getElementById('pixel_canvas');
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}

	// create a new table
	let gridHTML = '<table>';

	// build the table depending on height and width
	for (let i = 0; i < height; i++){
		gridHTML += '<tr>';
		for (let j = 0; j < width; j++){
			gridHTML += '<td></td>';

		}
		gridHTML += '</tr>'
	}
	gridHTML += '</table>';
	colorGrid.innerHTML = gridHTML;
}

// set a listeners to the body
gridBody.addEventListener('click', respondToEvents);



