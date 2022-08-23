Feature: Amigos_seguidores

    Scenario: Adição de amigo bem sucedida
        Given: o usuário "Mariano" está na página "amigos/seguidores"
        And: o usuário "andrezzz" não está na sua lista de amigos
        When: o usuário "Mariano" clica em "adicionar amigo"
        And: preenche o campo "usuário" com o nome "andrezzz"
        Then: o usuário "Mariano" recebe uma mensagem de confirmação
        And: o usuário "andrezzz" é adicionado a lista de amigos

    Scenario: Adição de amigo mal sucedida
        Given: o usuário "Mariano" está na página "amigos/seguidores"
        And: o usuário "andrezzz" não está na sua lista de amigos
        When: o usuário "Mariano" clica em "adicionar amigo"
        And: preenche o campo "usuário" com o nome "Andrezz"
        Then: o usuário "Mariano" recebe uma mensagem de erro
        And: o usuário "andrezzz" não está na sua lista de amigos

    Scenario: Mostrar lista de amigos de um usuário
        Given Eu estou logado como "andrezzz"
        And não possuo lista de amigos vazia
        And Eu estou na página "/perfil"
        When Eu clico em "/amigos"
        Then O site mostra a lista de amigos do usuário "andrezzz"

    Scenario: Mostra lista de amigos vazia de um usuário
        Given O usuário "alan" possui lista de amigos vazia
        And Eu estou logado como "alan"
        And Eu estou na página "/perfil"
        When Eu clico em "/amigos"
        Then O site imprime na tela a mensagem "Você ainda não possui amigos"

    Scenario: Visitar um perfil de um amigo
        Given Eu estou logado como "Matheus" e não possuo lista de amigos vazia
        And Eu estou na página "/amigos"
        When Eu clico no usuário "alan"
        Then O site mostra a página "/perfil/alan" do usuário "alan"

    Scenario: Excluir um amigo
        Given Eu estou logado como "Matheus" e não possuo lista de amigos vazia
        And Eu estou na página "/amigos"
        And Eu clico no usuário "alan"
        When Eu clico para excluir amigo
        Then O site imprime na tela "Amigo excluido"
        And A página lista de amigos não possui o usuário "alan"
