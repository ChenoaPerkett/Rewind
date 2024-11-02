import Cookies from 'js-cookie';
const API_URL = 'http://localhost:3000/users';

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error fetching profile');
  }

  return await response.json();
};

export const updateUser = async (token, email, userData) => {
  const response = await fetch(`${API_URL}?email=${email}`, {
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
