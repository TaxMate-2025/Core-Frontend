import Link from "next/link";
import Image from "next/image";
import LOGO from "../public/main_logo.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href={""} className="cursor-pointer hover:opacity-80 shrink-0">
        <Image src={LOGO} alt="TaxMate_Logo" width={140} height={140} />
      </Link>
    </div>
  );
}
