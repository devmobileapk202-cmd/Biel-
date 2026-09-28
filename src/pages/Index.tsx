import { useState, useEffect } from 'react';
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

export default function Index() {
  const [cardData, setCardData] = useState(getCardData());

  useEffect(() => {
    const handleUpdate = () => {
      setCardData(getCardData());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cardDataUpdated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cardDataUpdated', handleUpdate);
    };
  }, []);

  const limitNumber = Number(cardData.limit) || 1;
  const availableNumber = Number(cardData.available) || 0;
  const percentage = Math.min(100, Math.max(0, (availableNumber / limitNumber) * 100));

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meu Cartão</h1>
        <Link to="/admin" className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 font-medium">
          Admin
        </Link>
      </div>

      <div className="bg-gradient-to-tr from-gray-900 to-gray-700 text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div className="text-2xl font-bold italic tracking-wider">VISA</div>
          <div className="w-12 h-8 bg-yellow-200 rounded opacity-80"></div>
        </div>
        <div className="text-2xl tracking-[0.2em] mb-4 font-mono relative z-10">{cardData.number}</div>
        <div className="flex justify-between text-sm text-gray-300 font-mono relative z-10">
          <span className="uppercase">{cardData.name}</span>
          <span>{cardData.expiry}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">Resumo de Limites</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
            <span className="text-gray-500">Limite Total</span>
            <span className="font-semibold text-gray-800">R$ {limitNumber.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Limite Disponível</span>
            <span className="font-bold text-green-600 text-lg">R$ {availableNumber.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-5 w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
