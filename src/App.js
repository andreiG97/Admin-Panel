import React from 'react';
import './App.css';
import UserList from './components/UserList';
import avatar from './pictures/avatar.webp';
import PostList from './components/PostList';
import UserAddForm from './components/UserAddForm';


class App extends React.Component {
  constructor(){
    super();

      this.state = {
        background: "linear-gradient(to right, #4880EC, #019CAD)",
        
        color: 'black',
        users: [],
        name: '',
        email: '',
        isGoldClient: false,
        posts: [],
        showHideUser: true,
        showHidePost: false,
        edit: false

      };
      this.hideComponent = this.hideComponent.bind(this);
   }

   


   componentDidMount(){
     fetch('https://jsonplaceholder.typicode.com/users')
     .then(res => res.json())
     .then(users => {
       console.log(users);
       const filtered = users.filter((user) =>{ return user.id <= 5})
       this.setState({users: filtered});
     })

     fetch('https://jsonplaceholder.typicode.com/posts')
     .then(res => res.json())
     .then(posts => {
       console.log(posts)
       const postsF = posts.filter((post) => {
         return post.id <= 3
       })
       this.setState({posts: postsF})
     })
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

   changeBackgroundColor(e) {
     
    this.setState({background: e.target.value});
   }
   changeColor(e) {
    this.setState({color: e.target.value});
   }

  hideComponent(name) {
    switch(name) {
      case 'showHideUser':
        this.setState({showHideUser: !this.state.showHideUser})
        break;
        case 'showHidePost':
        this.setState({showHidePost: !this.state.showHidePost})
        break;
        default:
    }
  }
  getId(users) {
    let newId = 0;

    users.forEach(user => {
      if (user.id > newId) {
        newId = user.id;
      }
    });

    return newId;
  }

  addUser(event, name,email,isGoldClient) {
    event.preventDefault();

    const newUser = {
      id: this.getId(this.state.users) + 1,
      name: name,
      email:email,
      isGoldClient:isGoldClient
    }

    const updatedList = [...this.state.users, newUser];

    this.setState(
      {
        users: updatedList,
        name: '',
        email: '',
        isGoldClient: false,
        edit: false
      }    
    );
  }

  

  deleteUser(id) {
    const filteredUsers = this.state.users.filter( (user) => {return user.id !== id});

    this.setState(
     { users: filteredUsers}
    );
  }

  editUser(id) {
    const filteredUsers = this.state.users.filter((user) => {return user.id !== id});
    const selectedUser = this.state.users.find((user) => {return user.id === id})
    console.log(selectedUser);

    this.setState(
      { 
        users: filteredUsers,
        name: selectedUser.name,
        email: selectedUser.email,
        isGoldClient: selectedUser.isGoldClient,
        edit: true,
        id: id
      }
     );
    
  }

   render(){
    const {showHideUser, showHidePost} = this.state;
    console.log(this.state.users);
    return(
      <div className='app' style={{background: this.state.background, color: this.state.color
       }}>
        <h1>Admin Panel</h1>
        <div id='form'>
           <UserAddForm users={this.state.users} name={this.state.name} email={this.state.email} 
           getId={(users) => this.getId(users)} isGoldClient={this.state.isGoldClient}
            addUser={(event, name, email, isGoldClient) => this.addUser(event, name, email, isGoldClient)}
             imagine={avatar} nameChangeHandler={(e) => this.nameChangeHandler(e)} mailChangeHandler={(e) => this.mailChangeHandler(e)}
             goldChangeHandler={(e) => this.goldChangeHandler(e)} edit={this.state.edit}
           />
        </div>
        {/* <div className='btn'>
          <button onClick={() => this.hideComponent('showHideUser')}> Users </button>
          <button onClick={() => this.hideComponent('showHidePost')}> Posts </button>
        </div> */}
        <ul className='colors'>
            <li>
            <label htmlFor='back'>Background color</label>
             <input type='color' id='back' onChange={(e) => this.changeBackgroundColor(e)}/>
             </li>
             <li>
             <label htmlFor='text'>Text color</label>
          <input type='color' id='text' onChange={(e) => this.changeColor(e)}/>
          </li>
          <li className='hide'>
          <button onClick={() => this.hideComponent('showHideUser')}> Users </button>
          </li>
          <li className='hide'>
          <button onClick={() => this.hideComponent('showHidePost')}> Posts </button>
          </li>
        </ul>
        <br/>
        <br/>
        <div id='comp'>
       
       { showHideUser && <UserList users={this.state.users} imagine={avatar} 
        deleteUser={(id) =>  this.deleteUser(id)}
        editUser={(id) =>  this.editUser(id)}
        
       /> }
       </div>

       { showHidePost && <PostList posts={this.state.posts} /> }
      
        <br/>
        <br/>

       

      </div>
    );
   }
}

export default App;
