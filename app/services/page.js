import Services from "../service-page/ServicePage";
import FooterCopyright from "../components/FooterCopyright"
import FooterDefaultResponsive from "../components/FooterDefaultResponsive";

export default function ServicesPage() {
  const circles1 = [
    { icon: "/images/services-images/Concept_Development.png", description: "Concept Development" },
    { icon: "/images/services-images/Project_Planning.png", description: "Project Planning" },
    { icon: "/images/services-images/Creative_Consulting.png", description: "Creative Consulting" },
  ];

  const circles2 = [
    { icon: "/images/services-images/Directing.png", description: "Directing" },
    { icon: "/images/services-images/Cinematography.png", description: "Cinematography" },
    { icon: "/images/services-images/Green_Screen_Filming.png", description: "Studio/Chroma Key Filming" },
  ];

  const circles3 = [
    { icon: "/images/services-images/Visual_Effects.png", description: "Visual Effects" },
    { icon: "/images/services-images/CGI.png", description: "CGI" },
    { icon: "/images/services-images/Editing_Color.png", description: "Video Editing & Color Grading" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        gap: "50px"
      }}>
        <h1 className="servicesTitle" style={{
          fontSize: "48px",
          fontWeight: "normal",
          color: "#111",
          textAlign: "center",
          marginTop: "0",
        }}>
          Services
        </h1>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "1200px",
          width: "100%",
          flexWrap: "wrap"
        }}>
          <Services title="Pre-Production" circles={circles1} />
          <Services title="Production" circles={circles2} inverted />
          <Services title="Post-Production" circles={circles3} />
        </div>

        <p style={{
          maxWidth: "1000px",
          textAlign: "center",
          fontSize: "16px",
          fontStyle: "italic",
          color: "#111",
        }}>
          Zdrava Priča Creative Studio is a full-service video production company. We manage every stage of production, yet our true specialty lies in post-production, where our team enhances and refines every frame in order to ensure each project reaches its highest creative potential.
          <br/><br/>
          From pre-production to production, we provide comprehensive support ensuring a seamless process from idea to final footage.
        </p>
      </div>
      
      <FooterCopyright />
      <FooterDefaultResponsive />
    </div>
  );
}
