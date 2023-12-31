export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://satuberkas.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, HEAD");


  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(
      `https://satuberkas-backend.my.id/public/${req.url}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server" });
  }
}
