import mongoose from 'mongoose';

const dbConnect = () => {
    try {
        const conn =  mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected successfully!!!!');
    } catch(err) {
        console.log('error');
    }
};

export default dbConnect;