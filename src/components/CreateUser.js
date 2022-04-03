import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            userName: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            userName: this.state.userName
        }

        console.log(user);

        axios.post('https://exercise-tracker-node-backend.herokuapp.com/users/add', user)
            .then(res => console.log(res.data));

        this.setState(
            { userName: '' }
        )
    }

    render() {
        return (
            <div>
                <h3>Create new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>User: </label>
                        <input type='text' className='form-control'
                            value={this.state.userName} onChange={this.onChangeUsername} />
                    </div>
                    <div className='form-group'>
                        <input type='submit' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;