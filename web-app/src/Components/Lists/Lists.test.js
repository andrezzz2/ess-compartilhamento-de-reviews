/* eslint-disable testing-library/no-container */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/no-conditional-expect */
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Lists from './';
import fs from 'fs';
import path from 'path';

afterEach(cleanup);

const cssFile = fs.readFileSync(
    path.resolve(__dirname, './Styles.css'),
    'utf8'
)

describe('Usuário com todas as listas preenchidas sem expandir os itens', () => {

    test('lista de filmes com itens não expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptyMoviesListMessage');
        expect(emptyList).toBeNull();

        //cada elemento filho da lista que tem as classes CloseExpandItem ou HiddenAttribute nao esteja visivel
        const list = screen.getByTestId('MoviesList');
        list.childNodes.forEach((item)=>{
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("CloseExpandItem"))
                    expect(child).not.toBeVisible();
                if(child.classList.contains("HiddenAttribute"))
                    expect(child).not.toBeVisible();
            });
        });

    });

    test('lista de series com itens não expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptySeriesListMessage');
        expect(emptyList).toBeNull();

        //cada elemento filho da lista que tem as classes CloseExpandItem ou HiddenAttribute nao esteja visivel
        const list = screen.getByTestId('SeriesList');
        list.childNodes.forEach((item)=>{
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("CloseExpandItem"))
                    expect(child).not.toBeVisible();
                if(child.classList.contains("HiddenAttribute"))
                    expect(child).not.toBeVisible();
            });
        });

    });

    test('lista de livros com itens não expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptyBooksListMessage');
        expect(emptyList).toBeNull();

        //cada elemento filho da lista que tem as classes CloseExpandItem ou HiddenAttribute nao esteja visivel
        const list = screen.getByTestId('BooksList');
        list.childNodes.forEach((item)=>{
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("CloseExpandItem"))
                    expect(child).not.toBeVisible();
                if(child.classList.contains("HiddenAttribute"))
                    expect(child).not.toBeVisible();
            });
        });
        
    });

});

describe('Usuário com todas as listas preenchidas expandindo seus itens', () => {

    test('lista de filmes com itens expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptyMoviesListMessage');
        expect(emptyList).toBeNull();


        const list = screen.getByTestId('MoviesList');
        list.childNodes.forEach((item)=>{

            //Olhando os filhos de cada item e clicando na imagem deles
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("ItemImg")){
                    fireEvent.click(child);
                }   
            });
            
            //depois de clicado cada elemento filho do item tem que ser visível
            item.childNodes.forEach((child)=>{
                expect(child).toBeVisible();
            });
            
        });

    });

    test('lista de series com itens expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptySeriesListMessage');
        expect(emptyList).toBeNull();


        const list = screen.getByTestId('SeriesList');
        list.childNodes.forEach((item)=>{

            //Olhando os filhos de cada item e clicando na imagem deles
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("ItemImg"))
                    fireEvent.click(child);
            });

            //depois de clicado cada elemento filho do item tem que ser visível
            list.childNodes.forEach((item)=>{
                item.childNodes.forEach((child)=>{
                    expect(child).toBeVisible();
                });
            });

        });

    });

    test('lista de livros com itens expandidos', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //não pode ter mensagem de empty
        const emptyList = screen.queryByTestId('EmptyBooksListMessage');
        expect(emptyList).toBeNull();


        const list = screen.getByTestId('BooksList');
        list.childNodes.forEach((item)=>{

            //Olhando os filhos de cada item e clicando na imagem deles
            item.childNodes.forEach((child)=>{
                if(child.classList.contains("ItemImg"))
                    fireEvent.click(child);
            });

            //depois de clicado cada elemento filho do item tem que ser visível
            list.childNodes.forEach((item)=>{
                item.childNodes.forEach((child)=>{
                    expect(child).toBeVisible();
                });
            });

        });

    });

});

describe('lista de filmes, series e livros vazias', () => {

    test('lista de filmes vazia', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser2}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

        //deve ter mensagem de empty
        const emptyList = screen.getByTestId('EmptyMoviesListMessage');
        expect(emptyList).toBeDefined();

        //não devem haver itens na lista
        const movieItems = screen.queryAllByTestId('MovieItem');
        expect(movieItems.length).toBe(0);

    });

    test('lista de series vazia', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser2}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

         //deve ter mensagem de empty
        const emptyList = screen.getByTestId('EmptySeriesListMessage');
        expect(emptyList).toBeDefined();

        //não devem haver itens na lista
        const serieItems = screen.queryAllByTestId('SerieItem');
        expect(serieItems.length).toBe(0);

    });

    test('lista de livros vazia', () => {

        //aplicando css no DOM
        const { container } = render(<Lists requestedUser={mockUser2}/>);
        const style = document.createElement('style')
        style.type = 'text/css';
        style.innerHTML = cssFile;
        container.append(style);

         //deve ter mensagem de empty
        const emptyList = screen.getByTestId('EmptyBooksListMessage');
        expect(emptyList).toBeDefined();

        //não devem haver itens na lista
        const bookItems = screen.queryAllByTestId('BookItem');
        expect(bookItems.length).toBe(0);

    });

});



//usuário fictício para testes com todas as listas preenchidas
const mockUser = {  
                    "moviesList":[
                        {"type":"movie",
                        "id":"1",
                        "title":"Thor: Amor e Trovão",
                        "photoURL":"https://lumiere-a.akamaihd.net/v1/images/56015l10_bigsal_brazil_intpayoff_4x5_d4019af6.jpeg",
                        "description":"“Thor: Amor e Trovão”, da Marvel Studios, encontra o Deus do Trovão numa jornada diferente de tudo o que já enfrentou – a procura pela paz interior. Mas a reforma de Thor é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses, que procura a extinção dos deuses. Para combater a ameaça, Thor pede a ajuda da Rei Valkiria, de Korg e da ex-namorada Jane Foster, que – para surpresa de Thor – empunha inexplicavelmente o seu martelo mágico, Mjolnir, e se intitula a Poderosa Thor. Juntos, eles embarcam numa angustiante aventura cósmica para descobrir o mistério da vingança do Carniceiro dos Deuses e detê-lo antes que seja tarde demais.",
                        "director":"Taika Waitili",
                        "rate":"3",
                        "reviewId":"1",
                        "status":"watched"}],
                    "seriesList":[
                        {"type":"serie",
                        "id":"1",
                        "title":"Stranger Things",
                        "photoURL":"https://static.wikia.nocookie.net/dublagem/images/a/ae/Stranger-things-4.jpg/revision/latest?cb=20220527204114&path-prefix=pt-br",
                        "description":"A quarta temporada da série de terror de ficção científica estadunidense Stranger Things foi lançada no serviço de streaming Netflix em dois volumes. O primeiro volume de sete episódios foi lançado em 27 de maio de 2022, enquanto o segundo volume de dois episódios foi lançado em 1º de julho de 2022.",
                        "season":"4",
                        "originalBroadcaster":"netflix",
                        "rate":"5",
                        "reviewId":"2",
                        "status":"watching"}],
                    "booksList":[
                        {"type":"book",
                        "id":"1",
                        "title":"Clean Code",
                        "photoURL":"https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
                        "description":"Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.\nNoted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.\nWhat kind of work will you be doing? You’ll be reading code—lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft.\nClean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code—of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and “smells” gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code.",
                        "author":"Robert C. Martin",
                        "rate":"5",
                        "status":"abandoned"}]
                 }

//usuário fictício para testes com todas as listas vazias
const mockUser2 = { 
                    "moviesList":[],
                    "seriesList":[],
                    "booksList":[]
                  }