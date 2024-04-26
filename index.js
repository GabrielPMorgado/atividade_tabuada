import express from 'express';
const app = express();
const host='0.0.0.0';
const porta = 3000;


function paginaInicial(requisicao,resposta){
resposta.send
   (`<!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A minha primeira aplicação para internet</title>
</head>
<body>
      <h1>Tabuada</h1>
</body>
</html>`)
resposta.end();
}

function gerarPaginaTabuada(requisicao,resposta){
  try{
  const numero = Number(requisicao.query.numero);
  const sequencia = Number(requisicao.query.sequencia);
  let conteudoResposta = `<!DOCTYPE html>
  <html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tabuada ${numero} ${sequencia}</title>
        </head>
        <body>
           <h1> Tabuada ${numero}</h1>
      <ul>
  `;
  for(let i=0; i<=sequencia;i++){
    const linha = `<li>${numero}x ${i} = ${numero*i}</li>`;
    conteudoResposta+=linha;
  }
  conteudoResposta+=`
      </ul>
      </body>
      </html>`;

  resposta.end(conteudoResposta);

   }catch(erro){
    resposta.end(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erro ao fazer a tabuada</title>
           </head>
           <body>
             <h1>Erro ao tentar gerar os resultados</h1>
             <h2>Não foi possivel processar sua requisição </h2>
             <h2>O usuário deverá informar esse número por meio da url, por exemplo: http://localhost/?tabuada=3;</h2>
             <h3>${erro.message}</h3>
           </body>
           </html>`);
    return;
   }
}

app.get('/',paginaInicial);
app.get('/tabuada',gerarPaginaTabuada);

app.listen(porta, host,()=>{
console.log(`Servidor executando em http://${host}:${porta}.`);
});