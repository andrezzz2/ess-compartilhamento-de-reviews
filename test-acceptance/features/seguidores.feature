Feature: Amigos_seguidores

    Background:
        Given Eu estou logado com o usuario "mmag2" e senha "senha123"

    Scenario: Adição de amigo bem sucedida
        Given eu estou na página de perfil de "andrezzz"
        And eu não tenho o usuario "andrezzz" na lista de seguindo 
        When eu clico em "adicionar amigo"
        Then o usuário "andrezzz" é adicionado à lista de seguindo

    Scenario: Mostrar lista de amigos de um usuário
        Given Eu estou logado como "mmag2"
        And não possuo lista de amigos vazia
        And Eu estou na página "/perfil"
        When Eu clico em "/amigos"
        Then O site mostra a lista de amigos do usuário "mmag2"

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
