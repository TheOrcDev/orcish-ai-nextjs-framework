import { PaymentSuccess } from "@/components/features";

export default async function BuyTokensPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-24">
      <h2>Congratulations!</h2>
      <PaymentSuccess />
    </div>
  );
}
