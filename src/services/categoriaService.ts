import http from "./http";

export interface Categoria {
  id: number;
  nombre: string;
}

export const categoriaService = {
  // OBTENER TODAS LAS CATEGORÍAS
  getAll() {
    return http.get<Categoria[]>("/categorias/")
      .then((r) => ({ success: true, data: r.data, message: null as string | null }))
      .catch((e) => ({ success: false, message: e.response?.data?.message as string | null, data: [] as Categoria[] }));
  },

  // OBTENER UNA CATEGORÍA POR ID
  getById(id: number) {
    return http.get<Categoria>(`/categorias/${id}`)
      .then((r) => ({ success: true, data: r.data }))
      .catch((e) => ({ success: false, message: e.response?.data?.message }));
  },
};
