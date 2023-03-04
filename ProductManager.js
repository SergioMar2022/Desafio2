class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      // Generar id único para el producto
      const id = Date.now().toString();
      // Verificar que el id no esté repetido
      const existingProduct = this.getProductById(id);
      if (existingProduct) {
        throw new Error('ID de producto repetido');
      }
      // Agregar el producto al arreglo
      this.products.push({ id, ...product });
      return id;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    }
  
    updateProduct(id, update) {
      // Encontrar el producto y actualizar sus campos
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error('Producto no encontrado');
      }
      this.products[productIndex] = { ...this.products[productIndex], ...update };
    }
  
    deleteProduct(id) {
      // Encontrar el producto y eliminarlo del arreglo
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error('Producto no encontrado');
      }
      this.products.splice(productIndex, 1);
    }
  }
  
  // Crear una instancia de la clase ProductManager
const pm = new ProductManager();

// Llamar al método getProducts, debe devolver un arreglo vacío
console.log(pm.getProducts()); // []

// Llamar al método addProduct para agregar un producto
const productId = pm.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});
console.log(productId); // debería imprimir un id generado automáticamente

// Llamar al método getProducts nuevamente, debe aparecer el producto agregado
console.log(pm.getProducts());

// Llamar al método getProductById y verificar que devuelva el producto correcto
const productById = pm.getProductById(productId);
console.log(productById); // debería imprimir el producto agregado

// Llamar al método updateProduct y actualizar un campo del producto
pm.updateProduct(productId, { price: 250 });
console.log(pm.getProductById(productId)); // debería imprimir el producto actualizado

// Llamar al método deleteProduct y verificar que el producto haya sido eliminado
pm.deleteProduct(productId);
console.log(pm.getProducts()); // debería devolver un arreglo vacío
