let postData = async (url, data) => {
  // document.querySelector(".status").textContent = messages.loading;
  let res = await fetch(url, {
    method: "POST",
    body: data,
  });

  return await res.text();
};

let getResource = async (url) => {
  // document.querySelector(".status").textContent = messages.loading;
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} status ${res.status}`);
  }
  return await res.json();
};

export { postData, getResource };
