import Image from "next/image";

export default function Loading() {
  return <Image src={"/loading.gif"} alt="Loading" width={80} height={80} />;
}
