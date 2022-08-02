Feature: Adicionar amigo
As a usuário do site de review
I want to adicionar um novo amigo
So that eu posso aumentar meus amigos e visitar seus reviews

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