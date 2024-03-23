const mongoose = require('mongoose');

const db = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successful Connection');
    } catch (error) {
    console.log(error);
     console.log('Connection Error');   
    }
}

module.exports = {db}