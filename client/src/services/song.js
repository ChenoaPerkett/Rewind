import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/songs';

export async function getSongs() {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch songs');

  return response.json();
}

export async function addSong(songData) {
  const token = Cookies.get('token');
  songData.addedBy = JSON.parse(Cookies.get('user'))._id;

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(songData)
  });

  if (!response.ok) throw new Error('Failed to add song');

  return response.json();
}

export async function deleteSong(id) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to delete song');

  return response.json();
}

export async function updateSong(id, updatedData) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) throw new Error('Failed to update song');

  return response.json();
}

export async function addToPlaylist(songId, playlistId) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${songId}/playlist/${playlistId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to add song to playlist');

  return response.json();
}

export async function removeFromPlaylist(songId, playlistId) {
  const token = Cookies.get('token');

  console.log(songId, playlistId);

  const response = await fetch(`${API_URL}/${songId}/playlist/${playlistId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to remove song from playlist');

  return response.json();
}