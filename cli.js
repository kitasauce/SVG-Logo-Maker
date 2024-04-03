const inquirer = require ("inquirer");
const image = require("./image"); 
const { Circle, Triangle, Square } = require("./shapes");
const {writeFile} = require("fs/promises");

class CLI {
run() {
return inquirer
.prompt ([
    {
    name: "text",
    type: "input",
    message: "Enter 3 characters of text for logo",
    },
    {
    name: "textColor",
    type: "list",
    message: "Enter text color"
    },
    {
    name: "shapeType",
    type: "list",
    message: "select a shape",
    choices: ["circle", "square", "triange"],
    },
    {
    name: "shapeColor",
    type: "input",
    message: "Enter a shape color",
    },
])
.then(({ text, textColor, shapeType, shapeColor }) => {
    let shape;
    switch(shapeType) {
        case "circle":
            shape = new Circle();
            break;
        case "square":
            shape = new Square();
            break;
        default: 
            shape = new Triangle();
            break;
    }
shape.setColor(shapeColor);
const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shape);
        return writeFile("logo.svg", svg.render());
      })
      .then(() => {
        console.log("Generated logo.svg");
      })
      .catch((error) => {
        console.log(error);
        console.log("Something went wrong.");
      });
  }
}

module.exports = CLI;

