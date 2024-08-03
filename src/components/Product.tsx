import { useState } from 'react';
import ProductForm from './ProductForm';

interface Product {
  id: number;
  name: string;
  price: number;
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-slate-50 font-bold underline mb-6">Products</h1>
      <ProductForm onSave={addProduct} />
      <div className="mt-6">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center w-full max-w-md p-4 bg-slate-700 mb-2 rounded">
            <div className="text-slate-50">{product.name} - ${product.price}</div>
            <div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSave={(updatedProduct: Product) => {
            updateProduct(updatedProduct);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
