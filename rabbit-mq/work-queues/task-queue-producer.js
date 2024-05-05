const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost",function(error0,connection){
    if(error0)throw error0;
    
    connection.createChannel(function(error1,channel){
        if(error1) throw error1

        var queue = "task_queue"
        
        // Simulate multiple tasks
        for(var i=1;i<=20;i++){
            var msg = "Task number"+i
            channel.sendToQueue(queue,Buffer.from(msg))
            console.log(" [x] Sent %s",msg)
        }
        
        setTimeout(function(){
           connection.close()
           process.exit(0) 
        },500)

    })

})