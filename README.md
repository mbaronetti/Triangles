## drawShape

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Will install all required dependecies to run the application

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Basic flow

The user selects three arbitrary points within the client area of the browser. As they are
selected, the program highlights their location by drawing red circles, 11 pixels in diameter,
cantered on each selected point.
Based on these three points, two additional shapes are drawn:
- a blue parallelogram, having three of its corners in the points selected by the user.
- a yellow circle, with the same area and centre of mass as the parallelogram.
These shapes should not be filled.
The coordinates of the selected points as well as the area of the parallelogram and circle
should be presented to the user.
The user is free to move around the points. This makes the parallelogram, circle and printed
information update accordingly.
There is also a “reset” feature that clears the board and lets the user select three new points,
repeating the process described above. Finally, there is an “about” feature that presents
information about the program, its author and how it should be used, in your own words.


Enjoy drawShape!
