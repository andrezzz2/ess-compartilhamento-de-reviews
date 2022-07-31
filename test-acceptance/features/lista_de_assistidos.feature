Feature: Lista de assistidos

    Scenario: Mostrar página de listas apenas com um aviso quando usuário não possuir listas
        Given O usuário "andrezzz" não possui uma lista criada
        When O usuário "andrezzz" vai para a página "/listas"
        Then O site imprime a mensagem "nenhuma lista criada"