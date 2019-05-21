var express = require('express');
var router = express.Router();

// Diretórios homecontroller
// Sistema de login/conection/logout
// Controle de acesso do usuário
var homeController = require('../app/controllers/home');
var logController = require('../app/controllers/log');
var userController = require('../app/controllers/user');

// Painel de exibição dos produtos
var portfolioController = require('../app/controllers/portfolio');

// customer controllers
var customerController = require('../app/controllers/customer');

// factory controllers
var productController = require('../app/controllers/factory/product');
var storageController = require('../app/controllers/factory/storage');
var productionController = require('../app/controllers/factory/production');
var productionInputController = require('../app/controllers/factory/production_input');
var saleController = require('../app/controllers/factory/sale');
var saleDevolutionController = require('../app/controllers/factory/sale_devolution');
var saleWithdrawalController = require('../app/controllers/factory/sale_withdrawal');

// store controllers
var storeProductController = require('../app/controllers/store/product');
var storeStorageController = require('../app/controllers/store/storage');
var storeSupplyController = require('../app/controllers/store/supply');
var storeSaleController = require('../app/controllers/store/sale');
var cashierController = require('../app/controllers/store/cashier');


// - Rotas das funcionalidades base do sistema
router.get('/', homeController.index);
router.get('/loja', homeController.store);
router.get('/fabrica', homeController.factory);

router.get('/user', userController.index);

router.get('/login', logController.login);
router.post('/authenticate', logController.authenticate);
router.get('/logout', logController.logout);


// -----------------------------------------
// - Rotas das funcionalidades de clientes
router.post('/customer-save', customerController.save);
router.post('/customer-show', customerController.show);



// -----------------------------------------
// - Rotas das funcionalidades da loja
router.get('/loja-caixa', cashierController.index);
router.get('/loja-caixa-fechamento', cashierController.menu);
router.post('/cashier-open', cashierController.open);
router.post('/cashier-close', cashierController.close);
router.post('/cashier-drain', cashierController.drain);
router.get('/cashier-list-drain', cashierController.listDrain);
router.get('/cashier-list-store-sale', cashierController.listStoreSale);

router.post('/store-sale-save', storeSaleController.save);

router.get('/loja-gestao', storeSaleController.manage);
router.post('/store-sale-filter', storeSaleController.filter);
router.post('/store-sale-show', storeSaleController.show);
router.post('/store-sale-get', storeSaleController.get);

router.get('/loja-estoque', storeStorageController.index);
router.get('/loja-estoque-entrada', storeStorageController.input);
router.get('/loja-estoque-saida', storeStorageController.output);

router.post('/customer-filter', customerController.filter);

router.get('/loja-abastecimento', storeSupplyController.index);
router.get('/loja-abastecimento-cadastrar', storeSupplyController.register);
router.get('/loja-abastecimento-gerir', storeSupplyController.manage);
router.post('/store-supply-save', storeSupplyController.save);
router.post('/store-supply-filter', storeSupplyController.filter);
router.post('/store-supply-confirm', storeSupplyController.approve);
router.post('/store-supply-show', storeSupplyController.show);

router.post('/store-product-get', storeProductController.get);
router.post('/store-product-filter', storeProductController.filter);







// -----------------------------------------
// Rotas das funcionalidades da fábrica
router.get('/produtos', productController.index);
router.post('/product-save', productController.save);
router.post('/product-filter', productController.filter);
router.post('/product-get', productController.get);
router.post('/product-remove', productController.remove);

router.get('/producao', productionController.index);
router.get('/producao-cadastro', productionController.register);
router.get('/producao-gerir', productionController.manage);
router.post('/production-save', productionController.save);
router.post('/production-filter', productionController.filter);
router.post('/production-show', productionController.show);
router.post('/production-remove', productionController.remove);
router.post('/production-send', productionController.send);
router.post('/production-update', productionController.update);
router.post('/production-report', productionController.report);

router.get('/venda', saleController.index);
router.get('/venda-cadastro', saleController.register);
router.get('/venda-gerir', saleController.manage);
router.post('/sale-save', saleController.save);
router.post('/sale-filter', saleController.filter);
router.post('/sale-filter-unwithdrawal', saleController.filterUnwithdrawal);
router.post('/sale-show', saleController.show);
router.post('/sale-print', saleController.print);
router.post('/sale-update', saleController.update);
router.post('/sale-report', saleController.report);

router.get('/venda-retira', saleWithdrawalController.index);
router.post('/sale-save-withdrawal', saleWithdrawalController.save);
router.post('/sale-filter-withdrawal', saleWithdrawalController.filter);
router.post('/sale-show-withdrawal', saleWithdrawalController.show);
router.post('/sale-confirm-withdrawal', saleWithdrawalController.confirm);

router.get('/venda-devolucao', saleDevolutionController.index);
router.post('/sale-devolution', saleDevolutionController.register);
router.post('/sale-save-devolution', saleDevolutionController.save);
router.post('/sale-filter-devolution', saleDevolutionController.filter);
router.post('/sale-devolution-get', saleDevolutionController.get);
router.post('/sale-confirm-devolution', saleDevolutionController.confirm);

router.get('/estoque', storageController.index);
router.get('/estoque-entrada', storageController.input);
router.get('/estoque-saida', storageController.output);

router.get('/estoque-entrada-producao', productionInputController.index);
router.post('/input-filter-production', productionInputController.filter);
router.post('/input-confirm-production', productionInputController.confirm);

router.get('/estoque-entrada-devolucao', saleDevolutionController.input);

router.get('/estoque-saida-retira', saleWithdrawalController.output);

router.get('/estoque-saida-abastecimento', storeSupplyController.output);

router.get('/portfolio', portfolioController.index);
router.get('/portfolioTable', portfolioController.table);
router.get('/portfolioPress', portfolioController.press);

module.exports = router;