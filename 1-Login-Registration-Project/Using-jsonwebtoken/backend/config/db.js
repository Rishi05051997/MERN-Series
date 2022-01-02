const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DATABASE}`).then(()=> {
    console.log('Connected to db')
}).catch((e)=> {
    console.log("Error in mogodb connection", e)
})

module.exports = mongoose;