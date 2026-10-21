import { Portfolio } from "@/components/Portfolio";
import { CurrentYear } from "@/components/CurrentYear";

export default function Page() {
  return <Portfolio year={<CurrentYear />} />;
}
