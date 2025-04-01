import baseURL from '@/apis';

export async function createReply(formData: FormData) {
  const content = formData.get('content');
  const id = formData.get('id');
  const endpoint = `${baseURL}/api/v1/insights/${id}/comments`;
  const token =
    localStorage.getItem('noneMemberAccessToken') ||
    localStorage.getItem('accessToken');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        Authorization: `Bearer ${token}`,
      }),

      credentials: 'include',
    });
    if (!response.ok) {
      console.log(response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export async function createNote(formData: FormData) {
  const sessionId = Number(formData.get('sessionId'));
  const memo = formData.get('memo');
  const isAnonymous = formData.get('isAnonymous') === '익명';
  const isPublic = formData.get('isPublic') === '공개';
  const isDraft = false;
  const endpoint = `${baseURL}/api/v1/insights`;
  const token =
    localStorage.getItem('noneMemberAccessToken') ||
    localStorage.getItem('accessToken');
  const payload = {
    sessionId: sessionId,
    memo: memo,
    isPublic: isPublic,
    isAnonymous: isAnonymous,
    isDraft: isDraft,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),

      credentials: 'include',
    });
    if (!response.ok) {
      console.log(response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
