type Relic = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function RelicCard({ relic }: { relic: Relic }) {
  return (
    <div className="relic-card">
      <img src={relic.image} alt={relic.title} />
      <h3>{relic.title}</h3>
      <p>{relic.description}</p>
      <span>{relic.price} gold</span>
    </div>
  );
}