const {User,login}= require('./users');
const Dokument = require('./dokuments');
const Signature = require('./signature');

User.hasMany(Signature,{
    foreignKey:'user_id'
});
Dokument.hasMany(Signature,{
    foreignKey:'document_id'
});