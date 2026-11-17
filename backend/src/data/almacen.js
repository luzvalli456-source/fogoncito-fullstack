// Lee y escribe el archivo JSON con fs/promises (persistencia)
import { readFile, writeFile } from 'node:fs/promises';

const RUTA = new URL('./productos.json', import.meta.url);

export async function leerProductos() {
  const texto = await readFile(RUTA, 'utf-8');
  return JSON.parse(texto);
}

export async function guardarProductos(productos) {
  await writeFile(RUTA, JSON.stringify(productos, null, 2), 'utf-8');
}
