require('./loadEnv')();
const mongoose = require('mongoose');
const bhajanModel = require('./models/bhajanSchema.js');
const { connectToMongo, getDbState } = require('./db.js');
const bhajans = require('./Bhajanawali.bhajans.json');

connectToMongo().then(async () => {
    try {
        if (!getDbState().connected) {
            throw new Error('MongoDB is not connected. Set MONGODB_URI in the root .env file before importing.');
        }

        // Clear existing data
        await bhajanModel.deleteMany({});
        console.log('Cleared existing data');
        
        // Convert _id from MongoDB extended JSON format to string
        const processedBhajans = bhajans.map(bhajan => {
            const processed = { ...bhajan };
            if (bhajan._id && bhajan._id.$oid) {
                processed._id = new mongoose.Types.ObjectId(bhajan._id.$oid);
            }
            return processed;
        });
        
        // Insert new data
        const result = await bhajanModel.insertMany(processedBhajans);
        console.log(`Successfully imported ${result.length} bhajans`);
        
        // Verify data
        const count = await bhajanModel.countDocuments({});
        console.log(`Total bhajans in database: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
}).catch(error => {
    console.error('Connection error:', error);
    process.exit(1);
});
