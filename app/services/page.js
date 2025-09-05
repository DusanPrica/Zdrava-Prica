import Services from "./Services";

export default function Home() {
  const circles1 = [
    { label: "1", description: "Concept Development" },
    { label: "2", description: "Project Planning" },
    { label: "3", description: "Creative Consulting" },
  ];

  const circles2 = [
    { label: "A", description: "Directing" },
    { label: "B", description: "Cinematography" },
    { label: "C", description: "Studio/Chroma Key Filming" },
  ];

  const circles3 = [
    { label: "X", description: "Visual Effects" },
    { label: "Y", description: "CGI" },
    { label: "Z", description: "Video Editing & Color Grading" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        gap: "50px"
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "normal",
          color: "#111",
          textAlign: "center"
        }}
      >
        Services
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap"
        }}
      >
        
        <Services title="Pre-Production" circles={circles1} />
        <Services title="Production" circles={circles2} inverted />
        <Services title="Post-Production" circles={circles3} />
      </div>

      <p
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          fontSize: "16px",
          fontStyle: "italic",
          letterSpacing: "2px",
          color: "#111",
        }}
      >
      Zdrava Priča Creative Studio is a full-service video production company. We manage every stage of production, yet our true specialty lies in post-production, where our team enhances and refines every frame in order to ensure each project reaches its highest creative potential. 
      <br/>
      <br/>
      From pre-production to production, we provide comprehensive support ensuring a seamless process from idea to final footage.
      </p>


    </div>
  );
}
