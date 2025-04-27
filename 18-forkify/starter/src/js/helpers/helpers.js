import { TIMEOUT_SEC } from '../config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //* El metodo json esta disponible en TODOS los objetos response, y esta promesa es uno de ellos
    const data = await res.json(); //*Que retorna OTRA promesa, que tenemos que esperar con await
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //* El metodo json esta disponible en TODOS los objetos response, y esta promesa es uno de ellos
    const data = await res.json(); //*Que retorna OTRA promesa, que tenemos que esperar con await
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
