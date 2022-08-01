Feature: Add_Edit_Remove_User

    Scenario: Adicionar um novo usuário 
        Given O usuário "lucasm" está na página "/login" 
        And Os usuários "marcos" e "bob" estão registrados no banco "Users"
        When O usuário "lucasm" tenta criar uma conta com username "lucasm" e senha "12345"
        Then O usuário "lucasm" é redirecionado para página "user/lucasm" 
        And Os usuários "marcos", "bob" e "lucasm" estâo registrados no banco do sistema.

    Scenario: Adicionar um usuário já existente
        Given O usuário "lucasm" está na página "/login" 
        And Os usuários "marcos", "bob" e "lucasm" estâo registrados no banco "Users"
        When O usuário "lucasm" tenta criar uma conta com usuário "lucasm" e senha "12345"
        Then A mensagem "Usuário já cadastrado" aparece
        And O usuário "lucasm" continua na página "/login"
        And Os usuários "marcos", "bob" e "lucasm" estâo registrados no banco "Users".

    Scenario: Editar nome do usuário
        Given O Usuário "lucasm" está na página "/user/lucasm" 
        And possui o nome "Lucas Mota"
        When O usuário seleciona a opção "Editar"
        And e preenche o nome "Lucas Mendes" 
        Then  O Usuário "lucasm" continua na página "/user/lucasm" 
        And possui o nome "Lucas Mendes"

    Scenario: Remover usuário
        Given O Usuário "lucasm" está na página "/user/lucasm" 
        And Os usuários "marcos", "bob" e "lucasm" estâo registrados no banco "Users"
        When O usuário seleciona a opção "Remover"
        Then A mensagem "Usuário removido!" aparece
        And O usuário é redirecionado para a página "/login"
        And Os usuários "marcos" e "bob" estão registrados no banco "Users".

