var express = require("express");

var app = express();

const PORT = process.env.PORT || 3007
const path = require('path');

var Publishable_Key = 'pk_test_51MGbrvIjzm6oSi14hET7enuk1pU98kg5tKYK1iKLyBqtvbRz7zk7q0DCCAWUMBJ1xg4EAMzp8sTNS3QZPD9NA1QJ00AWA7bXBP'
var Secret_Key = 'sk_test_51MGbrvIjzm6oSi14lKvtRU5106zIsfMbbQLWBZkyJ7QabnqDpi03CuJ3aTIcbSIXxNCke0AeXoD21c1HKreCE3aT00BnzD9Lly'

const stripe = require('stripe')(Secret_Key)

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.get('/',function(req,res){
//     return res.render('index');
// });


app.use('/', require('./routes/sample_data'))



//default route
app.all('/', (req, res) => {
    return res.status(200).send(" Connected... wohoo")
})

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})
