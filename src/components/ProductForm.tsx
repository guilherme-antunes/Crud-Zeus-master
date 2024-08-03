import { useState, useEffect, FormEvent } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
}

const ProductForm = ({ product, onSave }: ProductFormProps) => {
  const [formData, setFormData] = useState({ name: '', price: 0 });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? Number(value) : value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-slate-800 p-4 rounded">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="mb-2 p-2 rounded bg-slate-700 text-slate-50"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="mb-2 p-2 rounded bg-slate-700 text-slate-50"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {product ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
