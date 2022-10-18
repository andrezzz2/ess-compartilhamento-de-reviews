Feature: Amigos_seguidores

    Scenario: Mostrar lista de amigos de um usuário
        Given Eu estou logado com o usuario "mmag2" e senha "senha123"
        And Eu estou na pagina de profile
        When Eu clico em "Followers"
        Then O site mostra a lista de amigos do usuário "mmag2"

    Scenario: Adição de amigo bem sucedida
        Given eu não tenho o usuario "jjp" na lista de seguindo 
        When vou pro perfil de "jjp"
        And eu clico no botao "Follow"
        Then o usuário "jjp" é adicionado à lista de seguindo
    
    Scenario: Excluir um amigo
        Given "jjp" esta na minha lista de seguindo
        When Eu visito o perfil de "jjp"
        And clico no botao de "Unfollow"
        Then "jjp" é removido da minha lista de seguindo
        And No seu perfil aparece o botao de "Follow"

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

    


