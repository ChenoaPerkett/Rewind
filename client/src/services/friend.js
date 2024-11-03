const API_URL = 'http://localhost:3000/friends';

export const getFriends = async (token, userId) => {
    const response = await fetch(`${API_URL}/${userId}/friends`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.json();
};

export const getFollowStatus = async (token, follower, followee) => {
    const response = await fetch(`${API_URL}/${followee}/follow-status?follower=${follower}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.json();
};

export const followUser = async (token, follower, followee) => {
    const response = await fetch(`${API_URL}/${followee}/follow`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({follower})
    });

    return response.json();
};

export const unfollowUser = async (token, follower, followee) => {
    const response = await fetch(`${API_URL}/${followee}/unfollow`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({follower})
    });

    return response.json();
};