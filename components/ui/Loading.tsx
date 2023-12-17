import Image from "next/image";

export default function Loading() {
  return <Image src={"/loading.gif"} alt="Loading" width={200} height={200} />;
}
