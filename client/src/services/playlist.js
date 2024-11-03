import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/playlists';

export async function getPlaylists() {
  const token = Cookies.get('token');
  const id = JSON.parse(Cookies.get('user'))._id;

  const response = await fetch(`${API_URL}/${id}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch playlists');

  return response.json();
}

export async function getPlaylist(id) {
  const token = Cookies.get('token');
  console.log(token);

  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


  if (!response.ok) throw new Error('Failed to fetch playlist');

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

export async function updatePlaylist(id, updatedData) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) throw new Error('Failed to update playlist');

  return response.json();
}

export async function getComments(id) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch comments');

  return response.json();
}

export async function addComment(id, commentData) {
  const token = Cookies.get('token');

  const response = await fetch(`${API_URL}/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(commentData)
  });

  if (!response.ok) throw new Error('Failed to add comment');

  return response.json();
}