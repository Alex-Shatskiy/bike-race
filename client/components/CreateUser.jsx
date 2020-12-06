import React from 'react'
import { connect } from 'react-redux'
import { addNewUser, changeActiveUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'

import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'bike-race',
  dirName: 'photos', /* optional */
  region: 'ap-southeast-2',
  accessKeyId: 'AKIAJJRDTCK4DPW6E4IQ',
  secretAccessKey: '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',
}

export class CreateUser extends React.Component {
  state = {
    imgURL: '',
    username: '',
    email: '',
    bikeType: '',
    redirect: false
  }

  handleImageChange = evt =>{
    const file = evt.target.files[0]
    S3FileUpload
    .uploadFile(file, config)
    .then(data => {
      this.setState({imgURL: data.location})
    })
    .catch(err => console.error(err))
  }

  handleChange = evt => {
    this.setState({
        [evt.target.name]: evt.target.value
      })
      
    }
    
    handleSubmit = evt => {
      evt.preventDefault()
      let newUser = { ...this.state }
      delete newUser.redirect
      this.props.dispatch(addNewUser(newUser))
      this.props.dispatch(changeActiveUser(newUser))
      this.setState({
        imgURL: '',
        username: '',
        email: '',
        bikeType: '',
        redirect: true
      })
    }
    
    
    
    
    
    render() {
      console.log(this.state)
      const { redirect } = this.state
      if (redirect) {
        return <Redirect to='/' />
      }
      
      return (
        <div>
        <h1>Create Profile</h1>
        <form className='formBox' onSubmit={this.handleSubmit}>

          <label htmlFor="imgURL">profile picture</label>
          <input className='formInput'
            type="file"
            onChange={this.handleImageChange}
            name="imgURL"
            accept="image/*"
             />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"
            onChange={this.handleChange}
            value={this.state.username} />

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email"
            onChange={this.handleChange}
            value={this.state.email} />


          <label htmlFor="bikeType">Bike type:</label>
          <select id="bikeType" name="bikeType"
            onChange={this.handleChange}
            value={this.state.bikeType}>
            <option defaultValue></option>
            <option value="mountain">Mountain</option>
            <option value="bmx">BMX</option>
            <option value="road">Road</option>
            <option value="unicycle">Unicycle</option>
          </select>

          <button type="submit">Confirm</button>
        </form>
      </div>
    )
  }
}

export default connect()(CreateUser)