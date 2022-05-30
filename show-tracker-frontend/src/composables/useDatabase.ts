import type { ShowRes } from "@/models";
import { ref, type Ref } from "vue";

export function useDatabase() {
  const baseUrl = "http://localhost:8080";
  async function getShows() {
    return await fetchData<ShowRes>(`${baseUrl}/shows`);
  }

  async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const json: T = await res.json();
    return json;
  }

  async function deleteShow(id: number) {
    const res = await fetch(`${baseUrl}/shows/${id}`, {
      method: "DELETE"
    });
    const json = await res.json();
    console.log("json:", json);
  }

  // async function 

  return { getShows, deleteShow };
}
