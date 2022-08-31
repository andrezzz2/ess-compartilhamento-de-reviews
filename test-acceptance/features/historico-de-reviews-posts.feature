Feature: Histórico de Reviews, Posts

    Scenario: Usuário tenta acessar lista de reviews vazia
        Given O usuário está logado com o usuário "andrezzz"
        And Eu vou para a página "/Listas"
        When Tenta clicar no histórico de Reviews
        Then O site mostra "A Lista de reviews está vazia!"

    Scenario: Usuário tenta acessar um link de um post inexistente
        Given O usuário está logado com o usário "andrezzz"
        And Tenta acessar o link de um post inexistente
        Then O site mostra a "Página de Post não encontrado"

    Scenario: Usuário tenta acessar uma lista de reviews com conteúdo
        Given O usuário está logado com o usuário "andrezzz"
        And Eu vou para a página "/Listas"
        When Tenta clicar no histórico de Reviews
        Then O site retorna o histórico de reviews