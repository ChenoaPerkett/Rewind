import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/users';

export const getUserById = async (token, id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch user');
  }

  return await response.json();
}

export const updateUser = async (token, id, userData) => {
const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error updating profile');
  }

  return await response.json();
}

export async function getUserPosts(token, id) {
  const response = await fetch(`${API_URL}/${id}/playlist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
}

export async function getUserSavedPlaylists(token, id) {
  const response = await fetch(`${API_URL}/${id}/saved`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
}


export const deleteUser = async (token, id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error deleting profile');
  }
};
