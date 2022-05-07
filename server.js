const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { header } = require('./config/headers');
const { MONGO } = require('./config/db');
const { urlencoded } = require('body-parser');
const { createWriteStream } = require('fs');
const { fileFilter, fileStorage } = require('./config/file');
const { authRoute } = require('./routes/auth.routes');
const { articleRoute } = require('./routes/articles.routes');
const { usersRoute } = require('./routes/users.routes');
const { draftRoute } = require('./routes/drafts.routes');
const { isAuth } = require('./middleware/isAuth');
const { adminRoute } = require('./routes/admin.routes');

const accessLogStream = createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
const server = express();

// USE MIDDLLE WARES AND PACKAGES
server.use(cors());
// server.use(header);
server.use(morgan('combined', { stream: accessLogStream }));
server.use(urlencoded({ extended: true }))
server.use(express.json());
server.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
server.use('/assets/images', express.static(path.join(__dirname, "assets", "images")));
server.use('/assets/images', express.static(path.join(__dirname, "lib", "images")));
server.use('/api/auth', authRoute);
server.use('/api/articles', articleRoute);
server.use('/api/users', [isAuth], usersRoute);
server.use('/api/drafts', [isAuth], draftRoute);
server.use('/api/admin', [isAuth], adminRoute);
// SERVER CONFIGURATIONS
var port = process.env.PORT || 8082;

const app = () => {
    server.listen(port);
    console.log("=======> Server running at port", port)
}
app()

MONGO.then(
    result => {
        console.log('=======> Mongo client connected at port', port);
    }
).catch(err => {
    console.log(`========>${err}`);
})