// src/loading.js
export function showLoading() {
  return new Promise(resolve  =>{
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading-indicator";
  loadingElement.textContent = "Loading...";
  // Tambahkan styling untuk indikator loading di sini atau melalui CSS terpisah
  loadingElement.style.position = "fixed";
  loadingElement.style.top = "50%";
  loadingElement.style.left = "50%";
  loadingElement.style.transform = "translate(-50%, -50%)";
  loadingElement.style.padding = "20px";
  loadingElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  loadingElement.style.color = "white";
  loadingElement.style.borderRadius = "5px";
  loadingElement.style.zIndex = "1000";
  document.body.appendChild(loadingElement);

  setTimeout( () => {
    resolve();
  }, 1000);
  })
}

export function hideLoading() {
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.remove();
  }
}
