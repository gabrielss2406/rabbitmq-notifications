
# RabbitMQ Notifications

Este projeto é uma API de notificações extremamente simples que utiliza RabbitMQ para enviar e consumir mensagens.

## RabbitMQ

Localmente estou rodando ele via docker ([Imagem]())
    
## Rodando o projeto

Inicie a API para envio das noticações
```bash
  npm start
```
Inicie o consumer

```bash
  ts-node src/consumers/notificationConsumer.ts
```

Envie notificações via HTTP

```bash
  POST /
  Body: { notification: { userId: string, message: string } }
```
Veja as notificações chegaram no terminal do consumer
