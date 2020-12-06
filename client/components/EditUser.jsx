import React from 'react'
import { connect } from 'react-redux'
import { editUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
import S3FileUpload from 'react-s3';


// const config = {
//   bucketName: 'bike-race',
//   dirName: 'photos', /* optional */
//   region: 'ap-southeast-2',
//   accessKeyId: 'AKIAJJRDTCK4DPW6E4IQ',
//   secretAccessKey: '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',
// }

export class EditUser extends React.Component {
  state = {
    username: this.props.activeUser.username,
    email: this.props.activeUser.email,
    imgURL: this.props.activeUser.imgURL,
    bikeType: this.props.activeUser.bikeType,
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let updatedUser = {...this.state}
    delete updatedUser.redirect
    this.props.dispatch(editUser(this.props.activeUser.id, updatedUser))
    this.setState({redirect: true})
  }



  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/users/active' />
    }

    return (
      <div>
        <h1 className='editUserHeader'>Edit your profile, {this.props.activeUser.username}</h1>
        <div className='editUserBox'>
        <form className='editUserContainer'>

        
     

          <label htmlFor="username" className='editUserLabel'>Username:</label>
          <input  className='editUserInput'
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <br/>
          <label htmlFor="email" className='editUserLabel'>Email</label>
          <input  className='editUserInput'
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br/>
           <label htmlFor="imgURL">profile picture</label>
          <input className='formInput'
            type="file"
            onChange={this.handleImageChange}
            name="imgURL"
            accept="image/*"
             />
             
          <br/>
          <label htmlFor="bikeType" className='editUserLabel'>Bike type:</label>
          <select  className='editUserInput'
            name="bikeType"
            onChange={this.handleChange}
            value={this.state.bikeType}>
            <option value="Mountain">Mountain</option>
            <option value="BMX">BMX</option>
            <option value="Road">Road</option>
            <option value="Unicycle">Unicycle</option>
          </select>
          <br/>
        </form>
          <div className="button" id="button-5">
            <div id="translate"></div>
              <button type="submit" onClick={this.handleSubmit}>Confirm</button>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(globalState) {
  return {
    activeUser: globalState.activeUser
  }
}

export default connect(mapStateToProps)(EditUser)
