# Lista de Universidades (BIS)

Projeto de API que lista nomes, sites, estado, pais de universidades.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

Instale o Node.JS (v16.x):

[Nodejs Download](https://nodejs.org/en/) - baixe a versao LTS

No terminal, instale as bibliotecas globalmente. isso localmente.
```
npm install -g typescript
npm install -g nodemon
```

### 🔧 Instalação em sua maquina local

Clone o repositorio:
```
git clone https://github.com/CodifyBrazil/bis
```

Inicie o projeto:
```
npm install
```

Antes de subir para o servidor rodar o comando:
```
tsc
```
o comando acima é para compilar os arquivos typescript para javascript


### 🔧 Instalação em um servidor

Levando em consideracao que ja tenha o servidor previamente configurado.

para instalar o MongoDB em sua instancia EC2 na AWS, seguir tutorial:
[Tutorial install mongodb instance EC2](https://www.solutionanalysts.com/blog/8-simple-steps-to-install-mongodb-with-authentication-on-ec2-ami-linux/)

Instale o node.js LTS (v16.x):
```sh
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
```

Clone nosso repositorio em seu servidor:
Obs: caso queira colocar dentro de uma pasta basta colocar o nome da pasta na frente do repostorio
```
git clone https://github.com/CodifyBrazil/bis nomedapasta
```

Instale a aplicacao - isso fara download de todos as biblicotecas usadas
```
npm install
```

Baixe o pm2 para atualizarmos o projeto caso precise:
```
npm install pm2
```

Rodar o comando para rodar o script e sempre estar disponivel:
vamos passar o argumento --name para conseguirmos identificar nossa aplicacao
```
pm2 start dist/server.js --name=nomedeindentificacao
```

Rode o comando para testar se esta funcionando:
```
pm2 list
```


Libere a porta 3000 em seu servidor.

## EndPoints

(GET) Para testar a aplicacao:
```
    /ping
```

(GET) Para salvar todas as universidades no banco de dados mongoDb:
```
    /saveUniversities
```

(GET) Buscar dados das universidades:
```
    /universities?country=brazil&page=1
```

(GET) Buscar baseado no Id:
```
    /universities/1234
```

(POST) Salvar novos dados no banco, enviar, name, domains[array], state_province, web_pages[array], country, alpha_two_code.
```
    /universities
```

(PUT) Atualizar os dados, enviando Id como paramentro, e na body(name, domains[array], web_pages[array])
```
    /universities/1234
```

(DELETE) Deletar um dado, enviando como parameto o Id:
```
    /universities/1234
```


## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [NodeJS](https://nodejs.org/en/) - O framework web usado
* [Npm](#) - Genenciador de pacotes
* [typescrit](#) - Construido em typescript


## 📌 Versão

Nós usamos [git](https://git-scm.com/) para controle de versão. Para as versões disponíveis, observe as [bis](https://github.com/codifybrazil/bis). 

## ✒️ Autores

* **Rafael Guilber** - *Construcao* - [CodifyBrazil](https://github.com/codifybrazil)

## 📄 Licença

Este projeto está sob a licença (sem licença) - veja o arquivo [LICENSE.md](https://github.com/codifybrazil/bis/licenca) para detalhes.


---
⌨️ com ❤️ por [Rafael Guilber](https://gist.github.com/codifybrazil) 😊