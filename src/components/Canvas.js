import React, { Component } from 'react';
import {Button , Icon} from 'antd';
import {getMousePosition , Dot , drawShape , getCanvas, setDraggies , getMass , getArea , getRatio , ShapeInfo} from './Helpers';
import Draggabilly from 'draggabilly';


class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            dotsPlaced: 0,
            coordinates: [],
            draggableDots: [],
            draw: true
        }
    }
    
    resetCanvas = (id) => {
        const context = getCanvas(id);
            context.clearRect(0, 0, 750, 500);
        this.setState({
            dotsPlaced: 0,
            coordinates: [],
            draggableDots: [],
            draw: true
        });
    }
    
    placeDot = (mousePos , coordinates) => {
        const {draggableDots} = this.state;
        const newDots = draggableDots.concat(<Dot key={draggableDots.length} top={mousePos.y - 5 + 'px'} left={mousePos.x - 5 + 'px'} />);
        this.setState({
            draggableDots: newDots
        } , () => {this.setDraggies(coordinates)});
    }
    setDraggies = (coordinates) => {
        const draggies = [];
        let draggableElems = null;
        let draggie = null;
        const comp = this;
        draggableElems = document.querySelectorAll('.dot');
        for ( var i=0; i < draggableElems.length; i++ ) {
            let draggableElem = draggableElems[i];
            draggie = new Draggabilly( draggableElem, {
                containment: '#shapeCanvas'
        });
        draggie.on( 'dragStart', function( event, pointer ) {
            const context = getCanvas('shapeCanvas');
            context.clearRect(0, 0, 750, 500);
        });
        draggie.on( 'dragEnd', function( event, pointer ) {
            comp.updateShape();
        });
        draggies.push( draggie );
        }
    }
    
    updateShape = () => {
        const {areat} = this.state;
        const dots = document.querySelectorAll('.dot');
        const newCoordinates = [];
        for(let i=0;i<dots.length;i++){
            const currentDot = dots[i];
            const x = parseInt(currentDot.style.left.replace('px' , '') , 10) + 5;
            const y = parseInt(currentDot.style.top.replace('px' , '') , 10) + 5;
            newCoordinates.push({x,y});
        }
        const mass = getMass(newCoordinates);
        const area = getArea(newCoordinates);
        drawShape('triangle' , 'shapeCanvas' , newCoordinates , null);
        drawShape('circle' , 'shapeCanvas' , mass , 5.5);
        drawShape('circle' , 'shapeCanvas' , mass , getRatio(area));
        this.setState({coordinates:newCoordinates,area});
    }
    
    handleCanvasClick = (e) => {
        const {dotsPlaced , coordinates , draw} = this.state;
        const mousePos = getMousePosition(e);
        var newCoordinates = coordinates.concat(mousePos);
        if(draw){
            const newDots = this.placeDot(mousePos , newCoordinates);
            drawShape('circle' , 'shapeCanvas' , mousePos , 5.5);
            if(dotsPlaced === 2){
                const mass = getMass(newCoordinates);
                const area = getArea(newCoordinates);
                drawShape('triangle' , 'shapeCanvas' , newCoordinates , null);
                drawShape('circle' , 'shapeCanvas' , mass , 5.5);
                drawShape('circle' , 'shapeCanvas' , mass , getRatio(area));
                this.setState({
                    draw: false,
                    area
                });
            }
            this.setState({
                dotsPlaced: dotsPlaced + 1,
                coordinates: newCoordinates
            });
        }
    }
    
    render() {
    const {draggableDots , draw , coordinates, area} = this.state;
    const mass = getMass(coordinates);
    return (
        <div>
            <Button type="primary" 
                    disabled={draw} 
                    onClick={() => this.resetCanvas('shapeCanvas')}>
                    <Icon type="rest" />
                    Reset
            </Button>
            <div>
                {coordinates.length === 3 && 
                <ShapeInfo 
                    area={area}
                    c1={coordinates[0].x + ' x ' + coordinates[0].y}
                    c2={coordinates[1].x + ' x ' + coordinates[1].y}
                    c3={coordinates[2].x + ' x ' + coordinates[2].y}/>}
                <div className="canvas-container">
                    {draggableDots}
                    <canvas width='750' height='500' id="shapeCanvas"
                            onClick={(e) => this.handleCanvasClick(e)}>
                    </canvas>
                </div>
            </div>
        </div>
    );
    }
}

export default Canvas;
