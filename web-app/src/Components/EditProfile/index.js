import './Styles.css';
import axios from 'axios';
import { useEffect } from 'react';

function EditProfile ( {User} ){

    useEffect(()=>{
        if(User)
        document.getElementById('Firstname').value = User.firstName;
        document.getElementById('Lastname').value = User.lastName;
        document.getElementById('Email').value = User.email;
        document.getElementById('Bio').value = User.bio;
        document.getElementById('URL').value = User.photoURL;
    },[User])


    function alterarDados(){
        
        var pessoa = {};
        pessoa.firstName = document.getElementById('Firstname').value;
        pessoa.lastName = document.getElementById('Lastname').value;
        pessoa.email = document.getElementById('Email').value;
        pessoa.bio = document.getElementById('Bio').value;
        pessoa.photoURL = document.getElementById('URL').value;

        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');

        if(pessoa.firstName!=null && pessoa.lastName && pessoa.email!=null && pessoa.email!=null && pessoa.bio!=null && pessoa.photoURL!=null){

            axios.post('http://localhost:8080/user/updateProfile',{pessoa:pessoa},{headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}}).then((response)=>{
                
                console.log(response.status.responseObject.authMessage);

                if(response.data.responseObject.auth){
                    if(response.data.responseObject.newAccessToken){
                        localStorage.setItem('x-access-token', response.data.responseObject.newAccessToken);
                    }
                    console.log(response.data.responseObject.message);
                } 

            });
        }
    }

    function alterarSenha(){
        let text;
        let atualPW = prompt("Digite a senha atual:");
        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');
        if(User.password == atualPW){
            let newPW = prompt("Digite a nova senha:");
            if(newPW == null || newPW == "" || newPW.length<8){
                alert("Erro ao redefinir senha! A senha deve ter pelo menos 8 caracteres");
            }
            else{
                axios.post('http://localhost:8080/user/changePassword',{password:newPW},{headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}}).then((response)=>{
                        console.log(response.data.message);

                        if(response.data.refresh){
                            localStorage.setItem('x-access-token', response.data.newAccessToken);
                            axios.post('http://localhost:8080/user/changePassword',{password:newPW},{headers: {"x-access-token": response.data.newAccessToken, "x-refresh-token": refreshToken}}).then((response)=>{
                                console.log(response.data.message);
                            
                            alert(response.data.message);
                            window.location.reload();
                            });
                        }
                        else{
                            alert(response.data.message);
                            window.location.reload();
                        }
                
                });
                 
            }
        }
        else{
            alert("A senha digitada não corresponde com a senha atual do usuário!")
        }
        
    

    }

    return (
        <div className="EditProfile">
            <div className='EditContainer'>
                <div className='ChangeData'>
                    <form id='form'>
                        <h2>Alterar dados:</h2>
                        <h4>Firstname:</h4>
                        <input type="text" id='Firstname' placeholder='Digite o novo Firstname' />
                        <h4>Lastname:</h4>
                        <input type="text" id='Lastname' placeholder='Digite o novo Lastname' />
                        <h4>Email:</h4>
                        <input type="text" id='Email' placeholder='Digite o novo Email' />
                        <h4>Bio:</h4>
                        <input type="text" id='Bio' placeholder='Digite a nova Bio' />
                        <h4>Foto de Perfil:</h4>
                        <input type="text" id='URL' placeholder='Digite a URL da nova foto' />
                        <br/>
                    </form>
                    <button onClick={alterarDados}>alterar</button>
                    <button onClick={alterarSenha}>alterar senha</button>
                </div>
            </div>
        </div>
    )
    
}

export default EditProfile;