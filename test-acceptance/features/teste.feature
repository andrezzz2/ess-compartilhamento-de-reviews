Feature: Listas de assistidos

    Scenario: O usuário tenta acessar a página de listas sem possuir alguma lista
        Given Eu estou logado com o usuário "andrezzz"
        When Eu vou para a página "/listas"

    Scenario: O usuário deseja criar uma lista com nome não existente
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico para criar uma lista
        Then O site mostra uma tela para criação lista
        When Eu insiro o nome da lista "animes" 
        And Eu clico para finalizar a criação da lista
        Then O site mostra na tela a mensagem "lista criada"

    Scenario: O usuário deseja criar uma lista com nome já existente
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico para criar uma lista
        Then O site mostra uma tela para criação lista
        When Eu insiro o nome da lista "animes" 
        And Eu clico para finalizar a criação da lista
        Then O site mostra na tela a mensagem "lista já existe"

    Scenario: O usuário tenta acessar a página de listas possuindo alguma lista
        Given Eu estou logado com o usuário "andrezzz"
        When Eu vou para a página "/listas"
        Then O site mostra na tela as listas do usuário

    Scenario: O usuário deseja acessar uma de suas listas
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico na lista "animes"
        Then O site mostra a lista "animes"

    
    Scenario: O usuário deseja acessar uma de suas listas
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico na lista "animes"
        Then O site mostra a lista "animes"


    Scenario: O usuário deseja acessar uma de suas listas
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico na lista "animes"
        Then O site mostra a lista "animes"
        Then para o roteiro


    Scenario: O usuário deseja criar uma lista com nome já existente
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico para criar uma lista
        Then O site mostra uma tela para criação lista
        When Modificando apenas para questao 8 do roteiro
        And Eu clico para finalizar a criação da lista
        Then O site mostra na tela a mensagem "lista já existe"


    Scenario: O usuário deseja criar uma lista com nome não existente
        Given Eu estou logado com o usuário "andrezzz"
        And Eu estou na página "/listas"
        When Eu clico para criar uma lista
        Then O site mostra uma tela para criação lista
        When Eu insiro o nome da lista "animes" 
        And Eu clico para finalizar a criação da lista
        Then O site mostra na tela a mensagem "lista criada"

    Scenario: Questao 14 commit na main

    Scenario: Q 14
        Given cenario pra questao 14
        And segundo commit questao 14
