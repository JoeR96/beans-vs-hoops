import HoopsAndBeans from "@/components/HoopsAndBeans";
import VoteContainer from "@/components/VoteContainer";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
      <HoopsAndBeans />
      <VoteContainer />
    </div>
  );
}
