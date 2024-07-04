import axios from "axios";
// eslint-disable-next-line no-var
export var webserviceurlMain: string = "http://localhost:3000";
export interface CartItem {
  product: {
    _id: string;
  };
  qty: number;
}
export async function apiAuthRegister(params: string): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: webserviceurlMain + "/auth/register",
      data: params,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiAuthLogin(params: string): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: webserviceurlMain + "/auth/login",
      data: params,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiLogout(token: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: webserviceurlMain + "/auth/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetMe(token: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: webserviceurlMain + "/auth/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiUpdateUser(
  id: any,
  params: any,
  token: any
): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "put",
      url: webserviceurlMain + `/auth/users/${id}`,
      data: params,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiGetTags(): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: webserviceurlMain + "/api/tags",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetCategory(): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: webserviceurlMain + "/api/categories",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
// export async function apiGetProducts(): Promise<any> {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios({
//       method: "get",
//       url: webserviceurlMain + "/api/products",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
export async function apiGetProducts(
  category?: string,
  tag?: string,
  q?: string
): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    let url = webserviceurlMain + "/api/products";
    if (q) {
      url += `?q=${q}`;
    }
    if (category) {
      url += `${q ? "&" : "?"}category=${category}`;
    }
    if (tag) {
      url += `${category || q ? "&" : "?"}tags=${tag}`;
    }

    const response = await axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiInsertAdress(params: any, token: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: webserviceurlMain + "/api/delivery-addresses",
      data: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetAdress(token: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: webserviceurlMain + "/api/delivery-addresses",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetProvience(): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: "https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiGetRegencies(params: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: `https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${params}.json`,
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetDistricts(params: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: `https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${params}.json`,
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    throw error;
  }
}
export async function apiGetVillages(params: any): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: `https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${params}.json`,
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiUpdateCart(
  items: CartItem[],
  token: string
): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "put",
      url: `${webserviceurlMain}/api/carts`,
      data: { items },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiGetCart(token: string): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "get",
      url: `${webserviceurlMain}/api/carts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    throw error;
  }
}
