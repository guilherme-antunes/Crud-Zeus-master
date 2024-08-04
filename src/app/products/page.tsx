// pages/index.tsx
'use client'
import { useState, useEffect } from "react";

interface Product {
  name: string;
  price: string;
  quantity: string;
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [dataEdit, setDataEdit] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>({ name: "", price: "", quantity: "" });

  useEffect(() => {
    const storedData = localStorage.getItem("cad_produto");
    const db_product = storedData ? JSON.parse(storedData) : [];
    setData(db_product);
  }, []);

  const handleRemove = (index: number) => {
    const newArray = data.filter((_, i) => i !== index);
    setData(newArray);
    localStorage.setItem("cad_produto", JSON.stringify(newArray));
  };

  const handleSave = () => {
    if (dataEdit) {
      const updatedData = data.map((item, index) =>
        index === data.indexOf(dataEdit) ? form : item
      );
      setData(updatedData);
      localStorage.setItem("cad_produto", JSON.stringify(updatedData));
    } else {
      const newData = [...data, form];
      setData(newData);
      localStorage.setItem("cad_produto", JSON.stringify(newData));
    }

    setForm({ name: "", price: "", quantity: "" });
    setDataEdit(null);
  };

  const handleEdit = (item: Product) => {
    setDataEdit(item);
    setForm(item);
  };

  return (
    <div className="flex items-center justify-center mt-20 text-white font-poppins">
      <div className="w-full max-w-3xl p-4">
        <div className="mb-4 ">
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-gray-700 text-white py-2 px-4 rounded mr-2 mb-2"
          />
          <input
            type="number"
            placeholder="Preço"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-gray-700 text-white py-2 px-4 rounded mr-2 mb-2"
          />
          <input
            type="text"
            placeholder="Quantidade"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="bg-gray-700 text-white py-2 px-4 rounded mr-2 mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
          >
            {dataEdit ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full bg-gray-900">
            <thead className="bg-cyan-700">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Nome
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Preço
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Quantidade
                </th>
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {data.map((item, index) => (
                <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                  <td className="py-3 px-4 truncate">{item.name}</td>
                  <td className="py-3 px-4 truncate">{item.price}</td>
                  <td className="py-3 px-4 truncate">{item.quantity}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-500 hover:text-blue-400"
                      onClick={() => handleEdit(item)}
                    >
                      {/* Ícone Editar */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 010 2.828l-9.829 9.829-4.292 1.071a1 1 0 01-1.213-1.213l1.071-4.292 9.829-9.829a2 2 0 012.828 0zM15.243 4l-9.829 9.829-1.243-.311.311-1.243L14 3.757 15.243 4z" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-red-500 hover:text-red-400"
                      onClick={() => handleRemove(index)}
                    >
                      {/* Ícone Deletar */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.707 10l-2.5-2.5a1 1 0 011.414-1.414L10 8.586l2.5-2.5a1 1 0 111.414 1.414L11.414 10l2.5 2.5a1 1 0 01-1.414 1.414L10 11.414l-2.5 2.5a1 1 0 01-1.414-1.414L8.707 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
