const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company: String,
    details: String,
    link: String,
}, {timestamps: true})

const Company = mongoose.model('Company', companySchema);
mongoose.connection.on('connected', () => console.log('Mongoose in cpmany connected to DB.'));
module.exports = Company;

