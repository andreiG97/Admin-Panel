import React from 'react';
import UserItem from './UserItem';
import './UserList.css'

class UserList extends React.Component {
    render() {
        const users = this.props.users;
        const deleteUser = this.props.deleteUser;
        const imagine = this.props.imagine
        console.log(this.props);
        return(
           <div id='user-list'>
               {
                   users.map((user, index) => {
                    return(
                        <UserItem
                            id={user.id}
                            name={user.name}
                            imagine={imagine}
                            email={user.email}
                            salariu='2200$'
                            isGoldClient={user.isGoldClient}
                            key={index}
                            deleteUser={deleteUser}
        
                                
                        />
                   );
                })
               }
               
           </div>
        );
    }
}
export default UserList;