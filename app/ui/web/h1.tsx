export default function H1({ children }: any) {
  return (
    <h1 
      style={{
        fontSize: "1.4rem",
        textTransform: "uppercase",
        lineHeight: "2rem",
        fontWeight: 700,
        color: "#178415",
        marginBottom: "0.8888889em",
      }}
    >
      {children}
    </h1>
  );
}