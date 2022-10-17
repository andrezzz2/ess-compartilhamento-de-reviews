/* eslint-disable testing-library/no-container */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-conditional-expect */
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './';

afterEach(cleanup);



describe('Usuário na propria página', () => {

    test('Não aparece o botão de follow nem de unfollow',() => {

        render(<Profile User = {mockUser} requestedUser={mockUser2}/>);
        expect(screen.queryByTestId("unfollow")).toBeNull();
        expect(screen.queryByTestId("follow")).toBeNull();
        
    });

});

//usuário fictício para testes com todas as listas preenchidas
const mockUser = {  
                   "username": "mmag2",
                   "followerList":"andrezzz"
                 }

//usuário fictício para testes com todas as listas vazias
const mockUser2 = { 
                    "username": "mmag2",
                    "firstName": "",
                    "lastName": "",
                    "photoURL": "",
                    "moviesList":[],
                    "seriesList":[],
                    "booksList":[]
                  }

