Aplicação FrontEnd para controle de checkin de hóspedes em um hotel.

A aplicação foi feita usando o framework React para JavaScript e o Framework Primereact para HTML e CSS.

Todas as dependências são resolvidas pelo NPM e não é preciso nenhum build ou biblioteca adicional além que está descrito no arquivo package.json

Para rodar a aplicação basta ter o NodeJS / NPM instalados e executar os seguintes comandos dentro da pasta da aplicação:

$ npm install
$ npm start

Para gravar e consultar dados é preciso do acesso ao BackEnd da applicação.
Se o Backend estiver em outro host basta editar o arquivo Server.js com o host correto.

Resumo das funcionalidades.

Aba Hóspede:
- Consultar um hóspede pelo nome, documento ou telefone.
- Salvar os dados de um novo hóspede.
- Excluir um hóspede desde que não tenha efetuado algum checkin.
- O sistema mostra as informaçõe do hóspede, o valor total gasto pelo hóspede e o valor da última hospedagem.

Aba Histórico:
- Consultar o histórico ho hóspede informado na aba Hóspede.
- O sistema mostra todos os checkins já efetuados pelo hóspede e o valor de cada checkin.

Aba Checkin:
- Cadastrar um novo checkin para o hóspede informado na aba Hóspede.
- Deve-se informar a data de entrada utilizando o formato ISO,
- Deve se informar se o hóspede precisar de uma vaga na garagem marcando a opção Adicional Veículo.
- Após clicar em Entrar o sistema efetua o checkin do hóspede.

Aba Checkout
- Fazer o checkout do hóspede informado na aba Hóspede.
- Deve-se informar a data de saída utilizando o formato ISO,
- Após clicar em Sair o sistema efetua o checkout do hóspede.

Aba Lista:
- Fazer a consulta dos hóspedes que já realizaram checkin no hotel.
- Ao marcar a opção Listar Hospedados o sistema mostra os hóspedes que estão no hotel.
- Ao desmarcar a opção Listar Hospedados o sistema mostra os hóspedes que já fizeram algum checkin mas não estão no hotel no momento.








