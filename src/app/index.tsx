import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="scroll-container">
        <section className="chapter">📜 Chapter I: Welcome to the Realm</section>
        <section className="chapter">🔮 Chapter II: Discover Relics</section>
        <section className="chapter">⚒️ Chapter III: Forge Your Own</section>
      </main>
    </>
  );
}