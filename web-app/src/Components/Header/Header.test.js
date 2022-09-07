/* eslint-disable testing-library/no-container */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-conditional-expect */
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {useState} from 'react';
import Header from './';
import fs from 'fs';
import path from 'path';

afterEach(cleanup);

const cssFile = fs.readFileSync(
    path.resolve(__dirname, './Styles.css'),
    'utf8'
)

test('Sem usuário logado', () => {
    const [mockUser, setMockUser] = useState(null);
    //aplicando css no DOM
    //const { container } = render(<Lists requestedUser={mockUser}/>);
    //const style = document.createElement('style')
    //style.type = 'text/css';
    //style.innerHTML = cssFile;
    //container.append(style);
   
});

test('Com usuário logado', () => {

    const [mockUser, setMockUser] = useState({  username: "andrezzz",
                                                photoURL: " "
                                            });

});
