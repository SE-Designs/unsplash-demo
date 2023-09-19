export function addFavorite(id: string, photo: string) {
  const favorites = localStorage.getItem('favorites') || '[]'
  const favoritesArray = JSON.parse(favorites)

  const existingFavorite = favoritesArray.find((favorite: { id: string }) => favorite.id === id)
  if (!existingFavorite) {
    favoritesArray.push({ id, photo })
    localStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }
}

export function removeFavorite(id: string) {
  const favorites = localStorage.getItem('favorites') || '[]'
  const favoritesArray = JSON.parse(favorites)

  const newFavorites = favoritesArray.filter((favorite: { id: string }) => favorite.id !== id)

  localStorage.setItem('favorites', JSON.stringify(newFavorites))
}

export function getFavorites() {
  const favorites = localStorage.getItem('favorites') || '[]'
  return JSON.parse(favorites)
}
