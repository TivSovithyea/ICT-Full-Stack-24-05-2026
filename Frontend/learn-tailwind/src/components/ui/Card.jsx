export default function Card({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}