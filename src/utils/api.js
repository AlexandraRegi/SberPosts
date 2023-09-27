const onResponse = (res) => {
  return res.json();
};

class Api {
  constructor(data, freshHeaders) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
    this.freshHeaders = freshHeaders;
  }

  getPostList() {
    return fetch(`${this.baseUrl}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  getUserInfo() {
    return fetch(`https://api.react-learning.ru/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  updateUserInfo(data) {
    return fetch(`https://api.react-learning.ru/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  updateUserAvatar(data) {
    return fetch(`https://api.react-learning.ru/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  changePostLike(postId, isLiked) {
    return fetch(`${this.baseUrl}/likes/${postId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  getPostById(id) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  addNewPost(data) {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  updatedPost(postId, data) {
    return fetch(`${this.baseUrl}/${postId}`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  deletePost(postId) {
    return fetch(`${this.baseUrl}/${postId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  addPostComment(postId, data) {
    return fetch(`${this.baseUrl}/comments/${postId}`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  deletePostComment(postId, commentId) {
    return fetch(`${this.baseUrl}/comments/${postId}/${commentId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  signin(data) {
    return fetch(`https://api.react-learning.ru/signin`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  signup(data) {
    return fetch(`https://api.react-learning.ru/signup`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  resetPass(data) {
    return fetch(`https://api.react-learning.ru/forgot-password`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }

  resetPassWithToken(token, data) {
    return fetch(`https://api.react-learning.ru/password-reset/${token}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse).catch((err) => alert("ERROR", err));
  }
}

const freshHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru/v2/group-12/posts",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRhNzlhZDhmYmM0NzNmYTg5ZWIyNjAiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyNjA0OTEyLCJleHAiOjE3MTQxNDA5MTJ9.5X9tNueAH1aKolFazhoNiyzDDL0EhPtpHqFYqKXddHo",
  },
};

export const api = new Api(config, freshHeaders);