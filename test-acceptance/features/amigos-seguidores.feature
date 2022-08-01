Feature: Amigos_seguidores

    Scenario: Mostrar lista de amigos de um usuário
        Given O usuário "andrezzz" está na página "/perfil"
        And O usuário não possui "lista_amigos" vazia
        When O usuário "andrezzz" vai para a página "/amigos"
        Then O site mostra a "lista_amigos" do usuário "andrezzz"
