import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('https://exercise-tracker-node-backend.herokuapp.com/users/')
            .then(response => {
                console.log(response);
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(res => res.userName),
                        userName: response.data[0].userName
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('https://exercise-tracker-node-backend.herokuapp.com/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create new Exercise log.</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput' required className='form-control'
                            value={this.state.userName} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(user => {
                                    return (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text' className='form-control'
                            value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className='form-group'>
                        <label>Duration: </label>
                        <input type='text' className='form-control'
                            value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' className='btn btn-primary' value='Create Excercise'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExercise;