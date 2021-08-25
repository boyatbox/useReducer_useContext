import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default async function getData() {
  console.log('fetching data..');
  client.get("/comments")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function getDataAwait() {
  console.log('fetching data..');
  const res=await client.get("/comments");
  return res.data;
}


// export deafult getData;
