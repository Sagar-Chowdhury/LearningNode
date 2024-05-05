const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function (error1, channel) {
    if (error1) throw error1;

    var queue = "task_queue";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.consume(queue, function (msg) {
      console.log("[x] Received %s", msg);

      // Simulate processing time
      setTimeout(function () {
        console.log(" [x] Done", msg.content.toString());
        channel.ack(msg); // Acknowledge the message after processing
      }, 1000),
        {
          // Prefetch count: Limit the number of unacknowledged messages per worker
          prefetch: 1,
        };
    });
  });
});
