import React from 'react';
import Draggabilly from 'draggabilly';

export const getMousePosition = evt => {
    const target = evt.target;
    const rect = target.getBoundingClientRect();
    return {
      x: parseInt(evt.clientX - rect.left , 10),
      y: parseInt(evt.clientY - rect.top , 10)
    };
}

export const drawShape = (type, target, coordinates , diam) => {
    console.log('drawing' , type)
    console.log('coordinates' , coordinates)
    const context = getCanvas(target);
    switch(type){
        case 'triangle':
            context.beginPath();
            context.moveTo(coordinates[0].x, coordinates[0].y);
            context.lineTo(coordinates[1].x, coordinates[1].y);
            context.lineTo(coordinates[2].x, coordinates[2].y);
            context.closePath();
            context.strokeStyle = '#3498db';
            context.stroke();
            break;
        case 'circle':
            context.beginPath();
            context.arc(coordinates.x, coordinates.y, diam, 0, 2 * Math.PI);
            context.strokeStyle = '#f1c40f';
            context.stroke();
            break;
        default: break;
    }
}

export const getCanvas = id => {
    const canvas = document.getElementById(id);
    const context =  canvas.getContext("2d"); 
    return context;
}

export const rootNumber = (x,n) => {
    const ng = n % 2;
    if((ng == 1) || x<0)
       x = -x;
    var r = Math.pow(x, 1 / n);
    n = Math.pow(r, n);
    if(Math.abs(x - n) < 1 && (x > 0 === n > 0))
      return ng ? -r : r; 
}

export const getArea = points => {
    const Ax = points[0].x;
    const Ay = points[0].y;
    const Bx = points[1].x;
    const By = points[1].y;
    const Cx = points[2].x;
    const Cy = points[2].y;
    let area = (Ax * (By - Cy) + Bx * (Cy -Ay) + Cx * (Ay - By)) / 2;
    if(area < 1) area = area * -1
    return area;
}

export const getRatio = area => {
    const ratio = rootNumber(area/3.14 , 2);
    return ratio;
}

export const getMass = points => {
    let centroid = {x: 0, y: 0};
    for(let i = 0; i < points.length; i++) {
     const point = points[i];
     centroid.x += point.x;
     centroid.y += point.y;
    }
    centroid.x /= points.length;
    centroid.y /= points.length;
    return centroid;
}
    

export const Dot = props => {
    return <div className="dot" style={{top: props.top , left: props.left}}></div>
}

export const ShapeInfo = props => {
    return <ul className="shape-info-list">
                <li><strong>References</strong></li>
                <li><strong>p1: </strong> {props.c1}</li>
                <li><strong>p2: </strong> {props.c2}</li>
                <li><strong>p3: </strong> {props.c3}</li>
                <li><strong>area: </strong> {props.area}</li>
           </ul>
}