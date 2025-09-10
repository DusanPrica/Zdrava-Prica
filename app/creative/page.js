import Creative from "./Creative";
import CopyrightFooter from "../components/FooterCopyright";

export default function CreativePage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "40px", color: "#fff" }}></h1>
      <Creative />
      <CopyrightFooter />
    </div>
  );
}
