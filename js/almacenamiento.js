export const guardar = (clave, valor) => {
    localStorage.setItem(clave, valor)
    return true
}

export function obtener(clave) {
    return localStorage.getItem(clave)
}