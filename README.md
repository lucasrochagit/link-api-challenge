  <h1 align="center">LinkApi Challenge</h1>

## Descrição

Desafio Técnico requerido no processo seletivo da LinkApi.

## Recursos Implementados

- ( ✓ ) Integração com as plataformas Pipedrive e Bling, através de requisições HTTP
- ( ✓ ) Cronjob para verificar as oportunidades cujo status = 'won' todos os dias, às 21:00
- ( ✓ ) Endpoint para buscar as oportunidades (com suporte à [query strings](https://npmjs.com/package/nest-mongo-query-parser))
- ( ✓ ) Endpoint para agregar todas as oportunidades de uma data específica
- ( ✓ ) Documentação do Postman (Collection + Environment) para testes na aplicação;

## Recursos futuros:

- ( ✓ ) Adicionar documentação Swagger

## Endpoints Implementados

- `GET /deals/:date/aggregate`

  - Validações

    - path params:
      - date: precisa estar no formato ISO Date `(yyyy-MM-DD)`

  - Exemplo de resposta:

    - Body

      ```json
      [
        {
          "total_value": 242.5,
          "count": 1,
          "date": "2021-11-01"
        }
      ]
      ```

- `GET /deals`

  - Exemplo de resposta:

    - Headers:

      ```json
      {
        "X-Total-Count": 1
      }
      ```

    - Body:

      ```json
      [
        {
          "value": 242.5,
          "products": [
            {
              "name": "Banana",
              "quantity": 50,
              "item_price": 0.3
            },
            {
              "name": "Apple",
              "quantity": 50,
              "item_price": 0.5
            },
            {
              "name": "Guava",
              "quantity": 50,
              "item_price": 0.5
            },
            {
              "name": "Kiwi",
              "quantity": 25,
              "item_price": 1.5
            },
            {
              "name": "Carrot",
              "quantity": 100,
              "item_price": 0.5
            },
            {
              "name": "Lettuce",
              "quantity": 50,
              "item_price": 1
            },
            {
              "name": "Tomato",
              "quantity": 100,
              "item_price": 0.25
            },
            {
              "name": "Onion",
              "quantity": 50,
              "item_price": 0.3
            }
          ],
          "client": {
            "name": "Jane Doe",
            "phone": "88988887654",
            "email": "janedoe@mail.com"
          },
          "date": "2021-11-01",
          "deal_id": 4,
          "created_at": "2021-11-01T05:26:08.576Z",
          "updated_at": "2021-11-01T05:26:08.576Z"
        }
      ]
      ```

## Instruções de Execução

Para executar a API, abra a pasta `link-api-challenge-api` com a sua IDE favorita, e siga o passo-a-passo ilustrado
no [README](https://github.com/lucasrochagit/link-api-challenge/blob/main/link-api-challenge-api/README.md) da API.
