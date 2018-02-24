import amqp     from 'amqplib';
import config   from 'config';

export default class RabbitmqBridge {
  constructor (app) {
    this._app = app;
  }

  connect () {

  }

  async sendToMail (route, data) {
    try {
      const conn = await amqp.connect(config.get('rabbit.uri'));
      const channel = await conn.createChannel();
      const msg = JSON.stringify(data);

      await channel.assertExchange(config.get('rabbit.exchange.relay-mail'), config.get('rabbit.exchange.type'), config.get('rabbit.exchange.options'));
      channel.publish(config.get('rabbit.exchange.relay-mail'), route, new Buffer(msg));

      console.log(" [x] Sent %s:'%s'", route, msg);

      setTimeout(() => {
        conn.close();
        process.exit(0);
      }, 500);
    } catch (e) {
      console.log(`-----ERROR : ${e}`)
    }

  }
}
