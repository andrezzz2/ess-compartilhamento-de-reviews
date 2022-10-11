import './Styles.css';
import axios from 'axios';
import { useEffect } from 'react';

function EditProfile ( {requestedUser, User} ){

    var username;
    var firstname;
    var lastname;
    var email;
    var twitter;
    var bio;
    var foto;


    function alterarDados(){
        var pessoa = new Object();
        pessoa.username = document.getElementById('Username');
        pessoa.firstname = document.getElementById('Firstname');
        pessoa.lastname = document.getElementById('Lastname');
        pessoa.email = document.getElementById('Email');
        pessoa.twitter = document.getElementById('Twitter');
        pessoa.bio = document.getElementById('Bio');
        pessoa.foto = document.getElementById('URL');

       

        if(pessoa.username.value!=null||pessoa.firstname.value!=null||pessoa.lastname.value||pessoa.email.value!=null||pessoa.email.value!=null||pessoa.twitter.value!=null||pessoa.bio.value!=null||pessoa.foto.value!=null){
            axios.post('http://localhost:8080/user/updateProfile',{pessoa:pessoa}).then((response)=>{
                console.log(response.data.message);

                window.location.reload();
                });
        }
    }

    return (
        <div className="EditProfile">
            <div className='EditContainer'>
                <div className='ChangeData'>
                    <form id='form'>
                        <h2>Alterar dados:</h2>
                        <h4>Username:</h4>
                        <input type="text" id='Username' placeholder='Digite o novo Username' />
                        <h4>Firstname:</h4>
                        <input type="text" id='Firstname' placeholder='Digite o novo Firstname' />
                        <h4>Lastname:</h4>
                        <input type="text" id='Lastname' placeholder='Digite o novo Lastname' />
                        <h4>Email:</h4>
                        <input type="text" id='Email' placeholder='Digite o novo Email' />
                        <h4>Twitter:</h4>
                        <input type="text" id='Twitter' placeholder='Digite o novo Twitter' />
                        <h4>Bio:</h4>
                        <input type="text" id='Bio' placeholder='Digite a nova Bio' />
                        <h4>Foto de Perfil:</h4>
                        <input type="text" id='URL' placeholder='Digite a URL da nova foto' />
                        <br/>
                        <button onClick={alterarDados}>alterar</button>
                        <button>alterar senha</button>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default EditProfile;