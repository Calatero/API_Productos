const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoriesRouter');
const brandsRouter = require('./brandsRouter');
const moviesRouter = require('./moviesRouter')

function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoryRouter);
  app.use('/brands', brandsRouter);
  app.use('/movies', moviesRouter);
};

module.exports = routerApi;
