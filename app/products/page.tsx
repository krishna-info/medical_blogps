export const metadata = {
  title: 'Products | Medical Insights',
  description: 'Recommended health supplements and clinic merchandise.',
};

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Premium Multivitamin Complex', price: '₹1490', category: 'Supplements' },
    { id: 2, name: 'Ergonomic Posture Corrector', price: '₹999', category: 'Wellness' },
    { id: 3, name: 'Digital Blood Pressure Monitor', price: '₹2450', category: 'Medical Device' },
    { id: 4, name: 'Clinic Branded Yoga Mat', price: '₹850', category: 'Merchandise' },
  ];

  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">Recommended Products</h1>
      <p className="text-gray-600 mb-12 border-b pb-4">Curated wellness products and medical devices approved by our clinic.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition bg-white flex flex-col">
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-6">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">Image</div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs text-medical-teal font-semibold tracking-wider uppercase mb-1">{product.category}</span>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-xl font-serif mt-auto text-medical-blue font-bold">{product.price}</p>
              <button className="mt-4 w-full py-2 border-2 border-medical-blue text-medical-blue font-bold rounded-lg hover:bg-medical-blue hover:text-white transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
