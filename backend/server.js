require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDataBase } = require('../backend/database/connectDataBase');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./util/verifyJWT');

const register = require('./routes/api-register-routes');
const auth = require('./routes/api-auth-routes');
const refresh = require('./routes/api-refresh-routes');
const logout = require('./routes/api-logout-routes');

const userApiRoutes = require('./routes/api-user-routes');
const categoryApiRoutes = require('./routes/api-category-routes');
const producerApiRoutes = require('./routes/api-producer-routes');
const storageApiRoutes = require('./routes/api-storage-routes');
const subcategoryApiRoutes = require('./routes/api-subcategory-routes');
const productApiRoutes = require('./routes/api-product-routes');
const productAmountApiRoutes = require('./routes/api-productAmount-routes');

connectDataBase();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(register);
app.use(auth);
app.use(refresh);
app.use(logout);

app.use(verifyJWT);
app.use(userApiRoutes);
app.use(categoryApiRoutes);
app.use(producerApiRoutes);
app.use(storageApiRoutes);
app.use(subcategoryApiRoutes);
app.use(productApiRoutes);
app.use(productAmountApiRoutes);

app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});
