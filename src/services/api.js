import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

export const getDashboardData = async (searchTerm = '') => {
  const [tracks, recommended, playlists, genres] = await Promise.all([
    api.get('/tracks', { params: { search: searchTerm } }),
    api.get('/tracks/recommended'),
    api.get('/playlists'),
    api.get('/genres'),
  ])

  return {
    tracks: tracks.data.data,
    recommended: recommended.data.data,
    playlists: playlists.data.data,
    genres: genres.data.data,
  }
}

export const toggleTrackLike = async (trackId) => {
  const response = await api.post(`/tracks/${trackId}/like`)
  return response.data.data
}

export const addTrackComment = async (trackId, payload) => {
  const response = await api.post(`/tracks/${trackId}/comments`, payload)
  return response.data.data
}

export const createPlaylist = async (payload) => {
  const response = await api.post('/playlists', payload)
  return response.data.data
}

export const addTrackToPlaylist = async (playlistId, trackId) => {
  const response = await api.post(`/playlists/${playlistId}/tracks`, { trackId })
  return response.data.data
}

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
  const response = await api.delete(`/playlists/${playlistId}/tracks/${trackId}`)
  return response.data.data
}

export const togglePlaylistLike = async (playlistId) => {
  const response = await api.post(`/playlists/${playlistId}/like`)
  return response.data.data
}
