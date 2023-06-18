import dynamic from "next/dynamic";
import DynamicHome from "./home_ssr";

export default dynamic(() => Promise.resolve({ default: DynamicHome }), {
  ssr: false,
});
