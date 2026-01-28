 

export async function feApiCallPost<T>(
  path: string,
  params: object,
): Promise<T> {
    try {
        const res = await fetch(path, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(params),
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const resJson = await res.json();
        return resJson;
      } catch (error) {
          console.error("Failed call feApiCallPost", error);
          throw error;
      }
}


export async function feApiCallGet<T>(
  path: string,
): Promise<T> {
    try {
        const res = await fetch(path, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (error) {
          console.error("Failed call feApiCallPost", error);
          throw error;
      }
}


export async function feApiCallDel<T>(
   path: string,
   params: object,
): Promise<T> {
    try {
        const res = await fetch(path, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
           body: JSON.stringify(params),
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (error) {
          console.error("Failed call feApiCallPost", error);
          throw error;
      }
}