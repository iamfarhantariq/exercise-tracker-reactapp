import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
    <tr>
        <td>{props.counter}</td>
        <td>{props.exercise.userName}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id} className='btn btn-link btn-sm'>Edit</Link>
            <button className='btn btn-link btn-sm'
                onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</button>
        </td>
    </tr>
)

class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.onDeleteExercise = this.onDeleteExercise.bind(this);

        this.state = {
            counter: 0,
            exercises: []
        };
    }

    componentDidMount(){
        axios.get('https://exercise-tracker-node-backend.herokuapp.com/exercises/')
            .then(res => {
                this.setState({ exercises: res.data });
            })
            .catch(err => console.log('Error: ' + err));
    }

    onDeleteExercise = (id) => {
        axios.delete('https://exercise-tracker-node-backend.herokuapp.com/exercises/' + id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(dat => dat._id !== id)
        });
    }

    exerciselist() {
        return (
            this.state.exercises.map((currentexercise, index) => {
                return (
                    <Exercise counter={index + 1} exercise={currentexercise} deleteExercise={this.onDeleteExercise}
                        key={currentexercise._id} />
                )
            })
        )
    }

    render() {
        return (
            <div>
                <h3>Logged Excercise</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciselist()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList;