import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './';
afterEach(cleanup);

describe('Usuário deslogado', () => {

    test('Estado dos elementos', () => {

        const mockUser = null;
        render(<Header User={mockUser}/>);

        expect(screen.getByText('ReviewShare')).toBeVisible();
        expect(screen.queryByTestId('HeaderLogOut')).toBeNull();
        expect(screen.queryByTestId('HeaderUserIcon')).toBeNull();
        expect(screen.getByTestId('HeaderLoginButton')).toBeInTheDocument();
        expect(screen.getByTestId('HeaderSignUpButton')).toBeInTheDocument();
    
    });

    it('deve ter ancora para página de login no botão Login', () => {

        const mockUser = null;
        render(<Header User={mockUser}/>);
        
        expect(screen.getByTestId('HeaderLoginButton')).toBeInTheDocument();
        expect(screen.getByText('Login')).toHaveAttribute('href', 'http://localhost:3000/login');

    });

    it('deve ter ancora para página de sign up no botão Sign Up', () => {

        const mockUser = null;
        render(<Header User={mockUser}/>);
        
        expect(screen.getByTestId('HeaderSignUpButton')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toHaveAttribute('href', 'http://localhost:3000/signUp');

    });

});

describe('Usuário logado', () => {

    test("Estado dos elementos", () => {

        const mockUser = {  username: "andrezzz",
                            photoURL: " "
                         };
        render(<Header User={mockUser}/>);
        
        expect(screen.getByText('ReviewShare')).toBeVisible();
        expect(screen.getByTestId('HeaderLogOut')).toBeInTheDocument();
        expect(screen.getByTestId('HeaderUserIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('HeaderLoginButton')).toBeNull();
        expect(screen.queryByTestId('HeaderSignUpButton')).toBeNull();

    });
    
    it('deve ter ancora para página de profile do usuário no icone do usuário', () => {

        const mockUser = {  username: "andrezzz",
                            photoURL: " "
                         };
        render(<Header User={mockUser}/>);
        
        expect(screen.getByTestId('HeaderUserIcon')).toBeInTheDocument();
        expect(screen.getByTestId('HeaderUserIcon')).toHaveAttribute('href', 'http://localhost:3000/profile/andrezzz');

    });
    
});

