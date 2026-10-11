async function inspectBottleModel() {
  const [{ existsSync, readFileSync }, { resolve }] = await Promise.all([
    import('node:fs'),
    import('node:path'),
  ]);
  const filePath = resolve(process.cwd(), 'public', 'models', 'bottle.glb');

  if (!existsSync(filePath)) {
    console.error(`Model not found: ${filePath}`);
    process.exitCode = 1;
    return;
  }

  const buffer = readFileSync(filePath);
  console.log(`Model found (${buffer.length.toLocaleString()} bytes).`);
  console.log(`GLB signature: ${buffer.toString('ascii', 0, 4)}`);
}

inspectBottleModel().catch((error) => {
  console.error('Could not inspect the bottle model:', error);
  process.exitCode = 1;
});
