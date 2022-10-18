Feature: Listas de assistidos
    O usuário possui 3 listas (filmes, séries e livros), podendo adicionar 
    itens a elas com os status (assistido, assistindo ou abandonado) e notas
    de 1 a 5

    Background:
        Given Eu estou logado com o usuário "usuario-de-testes-das-listas-2" de senha "teste123"
        And Eu não tenho nenhum item nas listas

    Scenario: O usuário tem sua lista de filmes vazia
        When Eu clico no meu icone de usuário
        Then A lista movies exibe a mensagem "Empty List"

    Scenario: O usuário tem sua lista de series vazia
        When Eu clico no meu icone de usuário
        Then A lista series exibe a mensagem "Empty List"

    Scenario: O usuário tem sua lista de livros vazia
        When Eu clico no meu icone de usuário
        Then A lista books exibe a mensagem "Empty List"