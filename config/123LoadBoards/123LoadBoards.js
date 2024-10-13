// Retrieve loads
const fetch = require("node-fetch");

async function run() {
  const query = new URLSearchParams({
    offset: "0",
    limit: "50",
    page: "0",
    sortExpression: "Origin",
    sortDirection: "Ascending",
    onlineOnly: "false",
    byCompany: "false",
    filter: "string",
    fields: "all",
    byStatuses: "None",
  }).toString();

  const resp = await fetch(`https://api.dev.123loadboard.com/loads?${query}`, {
    method: "GET",
    headers: {
      "123LB-Api-Version": "1.3",
      "User-Agent": "string",
      "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
      Authorization: "Bearer TSIw67aehxj4earHoFTTi6MZ62eJT9ARFmmmERHQ",
    },
  });

  const data = await resp.text();
  console.log(data);
}

run();
