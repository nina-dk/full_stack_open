const Header = ({ title }) => (
  <h1>{title}</h1>
);

const Content = ({ parts }) => (
  <div className="course-content">
    {parts.map(part => {
      return <Part key={part.id} 
                   name={part.name}
                   exercises={part.exercises} />
    })}
  </div>
);

const Part = (props) => <p>{props.name} {props.exercises}</p>;

const Total = ({ parts }) => (
  <p>
    <strong>Total of {parts.map(({exercises}) => exercises)
                    .reduce((sum, num) => sum + num, 0)} exercises
    </strong>
  </p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;