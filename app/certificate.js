// Script to download certitficate
const BASE_URL = "https://mcs-backend.up.railway.app";

const downloadCertificate = `${BASE_URL}/api/get_certificate`;

const image = document.querySelector("#certificate_image");

const downloadBtn = document.querySelector("#downloadBtn");

let params = new URLSearchParams(window.location.search);
let email = params.get("email");

// async function getCertificateRequest(email) {
//   try {
//     const request = await fetch(`${downloadCertificate}/${email}`);
//     // const response = await request;
//     return request;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function generateCertificate() {
  console.log(email);
  image.src = `${downloadCertificate}/${email}`;
  // Endpoint to download certificate
  //   const downloadLink = await getCertificateRequest(email);

  //   console.log(downloadLink);
}

downloadBtn.addEventListener("click", () => {
  window.location.href = `${downloadCertificate}/${email}`;
});

window.onload = generateCertificate();
