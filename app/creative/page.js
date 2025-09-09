import Creative from "./Creative";
import FooterDefaultResponsive from "../components/FooterDefaultResponsive";

export default function CreativePage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "40px", color: "#fff" }}></h1>
      <Creative />

      <FooterDefaultResponsive />
    </div>
  );
}
