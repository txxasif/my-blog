import API from "./axios-base";

//Blogs End Point
export async function getAllBlogHelper(page) {
  const data = await API.get(`/api/blogs?page=${page}`).then(
    (res) => res.data.result
  );
  console.log(data);
  return data;
}
export async function getBlogDetailsHelper(id) {
  const data = await API.get(`/api/blogs/${id}`).then((res) => res.data.result);
  console.log(data);
  return data;
}
export async function createBlog(body) {
  try {
    await API.post("/api/blogs/create", body);
    return true;
  } catch (e) {
    console.log(e, "error");
    return false;
  }
}
export async function updateBlogHelper(id, body) {
  try {
    await API.put(`/api/blogs/update/${id}`, body);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function deleteBlogHelper(id) {
  try {
    await API.delete(`/api/blogs/delete/${id}`);
    return true;
  } catch (e) {
    console.log(e);
    console.log("error");
  }
}
//Comment End Point
export async function getCommentsHelper(id) {
  const data = await API.get(`/api/comments/${id}`).then(
    (res) => res.data.result
  );
  console.log(data);
  return data;
}
export async function addCommentHelper(body) {
  await API.post("/api/comments/add", body);
  return true;
}
export async function updateCommentHelper(id, body) {
  await API.put(`/api/comments/update/${id}`, body);
}
export async function deleteCommentHelper(id) {
  await API.delete(`/api/comments/delete/${id}`);
}
