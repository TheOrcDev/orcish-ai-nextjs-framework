import Image from "next/image";

export default function Loading() {
  return (
    <Image
      unoptimized
      src={"/loading.gif"}
      alt="Loading"
      width={80}
      height={80}
    />
  );
}
