// api/index.js

export default async function handler(req, res) {
  // Proksi permintaan ke backend Laravel
  const response = await fetch(
    `http://localhost:8000/api${req.url}`
  );
  const data = await response.json();
  res.status(200).json(data);
}
