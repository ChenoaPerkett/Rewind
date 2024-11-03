import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/playlists';

export async function getPlaylists() {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch playlists');

  return response.json();
}

export async function addPlaylist(playlistData) {
  const token = Cookies.get('token');
  playlistData.creator = JSON.parse(Cookies.get('user'))._id;

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(playlistData)
  });

  if (!response.ok) throw new Error('Failed to add playlist');

  return response.json();
}

export async function deletePlaylist(id) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to delete playlist');

  return response.json();
}