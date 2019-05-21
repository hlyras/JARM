'Architecture of lyfesystem'

'access priority'
- occupation access - 
developer - 'a1'
suport developer - 'a2'

owner - 'b1'
auditory - 'b2'
mannager - 'b3'

production_mannager - 'c1'

storage_manager - 'd1'

low_access - 'e1'

- permissions - 
'a1' - full access
'a2' - full view access

'b1' - view access
'b2' - view access
'b3' - view access / create/edit/del product

'c1' - create/update production

'd1' - confirm input/output storage

'e1' - user access

---------------------------------------------------

//Home
- Home -
'controller' - homeController
.verify
.index

---------------------------------------------------

- Log - 
'database' - login
id - 'int(11) / NN / PRI / AI'
date - 'varchar(30) / NN'
user - 'varchar(15) / NN'

'controller' - logController
.login
.authenticate
.logout

'model' - Log
this.date
this.user
this.save()
.save()

---------------------------------------------------

//Usuários do sistema
- User -
'database' - user
id - 'int(10) UNS / NN / PRI / AI / UNQ'
login - 'varchar(15) / NN / UNQ'
password - 'varchar(30) / NN'
access - 'varchar(2) / NN'
name - 'varchar(80) / NN'
occupation - 'varchar(45) / NN'

'model' - User
this.id
this.login
this.password
this.access
this.name
this.occupation
this.save()
.save
.get'search'
.verify

'controller' - userController
.verify
.index

'routes'
.get'/user'.index

'jquery' - No

--------------------------------------------------

//Produtos do estoque
- Product -

'database' - product
id - 'int(11) UNS / NN / PRI / AI'
cod - 'int(11) UNS / NN  / UNQ / ZF'
type - 'varchar(15) / NN'
name - 'varchar(30) / NN'
color - 'varchar(20) / NN'
amount - 'int(5) UNS / NN / D=0'

'model' - Product
this.id
this.cod
this.type
this.name
this.color
this.amount
this.save()
.save
.list
.filter
.get
.remove
.updateAmount

'controller' - productController
.index
.save
.filter
.get
.remove
.'storage'
.'entryStorage'

'routes'
.get'/produtos'.index
.get'/criar-produto'.create
.post'/salvar-produto'.save
.post'/filtrar-produto'.filter
.post'/encontrar-produto'.get
.post'/remover-produto'.remove
'jquery'
'#crt-product-btn'.on'click'
'#flt-product-frm'.on'submit'
function edit(id)'edit-product'
function del(id)'del-product'

----------------------------------------------------

// Estoque do sistema
- Storage -
'database' - storage_input
id - 'int(11) UNS / NN / AI / PRI'
date - 'varchar(15) / NN'
production_id - 'int(11) / NN / FK'
product_id - 'int(11) / NN / FK'
product_name - 'varchar(45) / NN'
amount - 'int(11) / NN / def=0'
status - 'varchar(45) / NN' - 'parcial/finalizado'
checked - 'tinyint(1) / NN / def=0'

'controller' - storageController
.index'product.storage'
.input'product.entryStorage'
.inputFilter'productionController'.filterEntry
.inputConfirm'productionController'.confirmEntry

'routes'
.get'/estoque'.index
.get'/entrada-estoque'.input
.post'/filtrar-entrada'.inputFilter
.post'/confirmar-entrada'.inputConfirm

'jquery'
'#flt-storage'.on'submit'
'#flt-input-frm'.on'submit'
'table'.on'click','#update-input-btn'

----------------------------------------------

// Produção
// input
- Production - 
'database' - production
id - 'int(11) / NN / PRI / AI'
date - 'varchar(15) / NN'
origin - 'varchar(45) / NN'
provider - 'varchar(45) / NN'
product_id - 'varchar(45) / NN / FK'
product_name - 'varchar(45)'
amount - 'int(11) UNS / NN'
storage_amount - 'int(11) UNS / 0'
received_amount - 'int(11) UNS / 0'
status - 'varchar(10) / NN'
obs - 'varhcar(255)'
//checked - 'varchar(1) / def=0'

'model' - Production
this.id
this.date
this.origin
this.provider
this.productId
this.amount
this.status - 'preparacao/produzindo/parcial/finalizado'
this.obs
this.check
this.save()
.save()
.filter()
.input()
.inputFilter()
.send()
.update()
.check()
.inputConfirm()

'controller' - productionController
.index
.save
.filter
.send
.update

'routes'
.get'/producao'.index
.post'/salvar-producao'.save
.post'/filtrar-producao'.filter
.post'/enviar-producao'.send
.post'/atualizar-producao'.update

'jquery'
'#crt-production-btn'.on'click'
'#flt-production-frm'.on'submit'
'table'.on'click','#send-production-btn'
'table'.on'click','#updt-production-btn'
document.on'change','#production-origin'
document.on'change','#list-origin'

------------------------------------------------

// vendas online
// output
- Sale - 
'database' - sale
id - 'int(11) UNS / NN / PRI / AI / UNQ'
date - 'varchar(30) / NN'
origin - 'varchar(20) / NN'
cod - 'varchar(20) UNS / NN / UNQ'
name - 'varchar(50) / NN'
user - 'varchar(15) / NN'
status - 'varchar(10) / NN'

'database' - sale_product
id - 'int(11) UNS / NN / PRI / AI / UNQ'
sale_cod - 'int(11) UNS / NN / FK'
product_info - 'varchar(45) / NN'
product_id - 'int(11) UNS / NN'
amount - 'int(4) / UNS / NN / def=0'

'model' - Sale
this.id
this.date
this.cod
this.name
this.origin
this.user
this.status - 'preparacao/enviado/cancelado/aguardando-devolucao/devolucao'
this.save()
.save()
.get()
.saveProducts()



// ---------------------------------

store -
	cashier -
		store_sale
			cod
			date
			customer
			value
			discount
			method


	store_product - 
		product.save 'salva, edita e exclui o produto para os dois estoques.'

		store_withdrawal
			id
			date
			user
			status
			confirmation_user

		store_withdrawal_products
			id
			store_withdrawal_id
			store_product_id
			store_product_cod
			store_product_info
			amount


