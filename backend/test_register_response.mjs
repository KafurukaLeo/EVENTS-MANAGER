async function run() {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      names: "kafuruka leo",
      email: "kevin_test@gmail.com",
      password: "leo@ABC2025!!"
    })
  });
  
  console.log("Status:", res.status);
  console.log("Headers:", [...res.headers.entries()]);
  const text = await res.text();
  console.log("Body:", text);
}

run().catch(console.error);
