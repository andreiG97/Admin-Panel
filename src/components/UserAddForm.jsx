import React from 'react';
import './UserAddForm.css'

class UserAddForm extends React.Component {
    constructor(props){
        super(props);

        this.state={
            name: '',
            email: '',
            isGoldClient: false
        }
    }

    
    nameChangeHandler(e){
        let name = e.target.value;
       
        this.setState({
            name: name
        })
    }
    mailChangeHandler(e){
        let mail = e.target.value;
       
        this.setState({
            email: mail
        })
    }
    goldChangeHandler(e){
        let check = e.target.checked;
       
        this.setState({
            isGoldClient: check
        })
    }
    
    // handleSubmit(event) {
    //     event.preventDefault();
    
    //     const user = {
       
    //         name: this.state.name,
    //         email: this.state.email,
    //         isGoldClient: this.state.isGoldClient,
            
    //     };
    //     this.props.addUser(user);
    //}
 
    render(){
        
        const {name, email, isGoldClient} = this.state;
        return(
            <form className='user-add-form' onSubmit={(event) => this.props.addUser(event, name, email, isGoldClient)}>
                <h2>Login</h2>

                <label htmlFor="username">Username </label>
                <input 
                type="text" 
                id='username' 
                placeholder='Username' 
                maxLength='18'
                minLength='3'
                required
                value={this.state.name}
                onChange={(e) => this.nameChangeHandler(e)}
                />

                <label htmlFor="email" >Email </label>
                <input 
                type="email" 
                id='email'
                placeholder='Email'
                required
                value={this.state.email}
                onChange={(e) => this.mailChangeHandler(e)}
                  
                />

                <label htmlFor="gold">Gold Client </label>
                <input 
                type="checkbox" 
                id='gold'
                checked={this.state.isGoldClient}
                onChange={(e) => this.goldChangeHandler(e)}
                />

                <button id='add-user' type='submit'>Add User</button>
            </form>
        );
    }
}
export default UserAddForm;