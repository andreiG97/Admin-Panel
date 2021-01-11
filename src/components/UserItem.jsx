import React from 'react';
import './UserItem.css'


function UserItem(props) {
    const{name, email, salariu, isGoldClient, imagine, deleteUser, id} = props

    console.log(id);
    
    
    return(
        <div id='container-item'>
            <ul>
             <li> <img src={imagine} width='100px' height='100px' alt="Error"/> </li>
            <li className='item-components'>{name}</li>
            <li className='item-components'>Email: {email}</li>
            <li className='item-components'>Salariu: {salariu}</li>
            <li className='item-components'>
                {
                    isGoldClient ? <p>Client Gold</p> : null
                }
            </li>
            <li>
            <button className='trash' onClick={ () => deleteUser(id)} >X</button>
            </li>
            </ul>


        </div>
    );
}

export default UserItem;