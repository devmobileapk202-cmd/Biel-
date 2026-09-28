import { useState } from 'react';
import { Link } from '@tanstack/react-router';

const getCardData = () => {
  const stored = localStorage.getItem('cardData');
  return stored ? JSON.parse(stored) : {
    name: 'João da Silva',
    number: '**** **** **** 1234',
    expiry: '12/28',
    limit: 5000,
    available: 2500,
  };
};

export default function Admin() {
  const [formData, setFormData] = useState(getCardData());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cardData', JSON.stringify(formData));
    window.dispatchEvent(new Event('cardDataUpdated'));
    alert('Dados do cartão atualizados com sucesso!');
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar para Início
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nome no Cartão</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Número do Cartão</label>
          <input name="number" value={formData.number} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Validade (MM/AA)</label>
          <input name="expiry" value={formData.expiry} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Limite Total (R$)</label>
          <input type="number" name="limit" value={formData.limit} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Limite Disponível (R$)</label>
          <input type="number" name="available" value={formData.available} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <button type="submit" className="w-full bg-black text-white p-3 rounded font-semibold hover:bg-gray-800 transition-colors mt-4">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
