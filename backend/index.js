const { app } = require('./src/main.js');
const colors = require('colors');
const connectDB = require('./src/config/db.js');

//-------------port----------------//
const PORT = process.env.PORT || 5000;

//-----------------connect to db----------------//
connectDB().then(() => {
    app.listen( PORT , () => {
        console.log(`Server is running on port ${PORT}`.yellow.bold);
    });
}
);

module.exports = app;