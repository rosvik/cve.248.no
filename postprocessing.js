// https://stackoverflow.com/a/61710898/5976426

const p = Deno.run({
  cmd: ["./install.sh"],
});

await p.status();

p.close();
