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
        background: 'white',
        color: 'black',
        users: [],
        posts: [],
        showHideUser: true,
        showHidePost: false

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

    this.setState(
      function(state){
        return{
          users: [
            ...state.users,
            {
              id: this.getId(state.users) + 1,
              name,
              email,
              isGoldClient
            }
          ]
        };
      }
    );
  }

  

  deleteUser(id) {
    const filteredUsers = this.state.users.filter( (user) => {return user.id !== id});

    this.setState(
     { users: filteredUsers}
    );
  }

   render(){
    const {showHideUser, showHidePost} = this.state;
    console.log(this.state.users);
    return(
      <div className='app' style={{background: this.state.background, color: this.state.color, 
        backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)"
       }}>
        <h1>Admin Panel</h1>
        <div id='form'>
           <UserAddForm users={this.state.users} getId={(users) => this.getId(users)} addUser={(event, name, email, isGoldClient) => this.addUser(event, name, email, isGoldClient)} imagine={avatar}/>
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
          <li>
          <button onClick={() => this.hideComponent('showHideUser')}> Users </button>
          </li>
          <li>
          <button onClick={() => this.hideComponent('showHidePost')}> Posts </button>
          </li>
        </ul>
        <br/>
        <br/>
        <div id='comp'>
       
       { showHideUser && <UserList users={this.state.users} imagine={avatar} 
        deleteUser={(id) =>  this.deleteUser(id)}
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
