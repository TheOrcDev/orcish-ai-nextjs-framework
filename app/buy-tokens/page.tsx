import { BuyTokens } from "@/components/features";
import { Header } from "@/components/ui/header";

export default async function BuyTokensPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-10 p-24">
        <BuyTokens />
      </div>
    </>
  );
}
