import { Header } from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header activeTab="browse" onTabChange={() => {}} cartCount={0} />
    </main>
  );
}
