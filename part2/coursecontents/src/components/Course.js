import React from 'react';

const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
)

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
}


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
}

const Total = ({ course }) => {
    const parts = course.parts;
    
    const sum = parts.reduce((s, p) => s+p.exercises, 0)
    
    return(
      <p><strong>Total of {sum} exercises </strong></p>
    ) 
}


export default Course