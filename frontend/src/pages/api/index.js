export default async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://satuberkas.vercel.app"
  );

  try {
    const response = await fetch(`http://localhost:8000/api${req.url}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}