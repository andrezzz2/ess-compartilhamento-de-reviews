/* eslint-disable testing-library/no-container */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-conditional-expect */
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Followers from './';


describe('Usuário com seguidores', () => {

    test('lista de amigos não vazia',() => {

        render(<Followers requestedUser={mockUser}/>);
        const list = screen.getByTestId('Followers');
        expect(list.childNodes.length === 3);
        
        list.childNodes.forEach((div)=>{
            div.childNodes.forEach((follower,index)=>{
                expect(follower).toHaveAttribute('href', 'http://localhost:3000/profile'+mockUser.followersList[index]); 
            });
        });
        
    });

});

describe('Usuário sem seguidores', () => {

    test('lista de amigos vazia',() => {

        render(<Followers requestedUser={mockUser2}/>);
        const list = screen.getByTestId('Followers');
        expect(list.childNodes.length === 0);        
    });

});



//usuário fictício para testes com todas as listas preenchidas
const mockUser = {  
                    "followersList": ["mmag2","andrezzz","tatuzão_piranhão"]
                 }

//usuário fictício para testes com todas as listas vazias
const mockUser2 = { 
                    "followersList":[]
                  }