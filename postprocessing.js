// https://stackoverflow.com/a/61710898/5976426

const p = Deno.run({
  cmd: ["pip", "install -r requirements.txt"],
  cmd: ["python3", "cve.py"],
});

await p.status();

p.close();
