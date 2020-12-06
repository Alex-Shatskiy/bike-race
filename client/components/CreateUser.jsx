import React from 'react'
import { connect } from 'react-redux'
import { addNewUser, changeActiveUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import S3FileUpload from 'react-s3';



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
    
    handleTakePhoto = (dataUri) => {
      this.setState({imgURL: dataUri})
      console.log(this.state);
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
        <Camera
      onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
    />
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