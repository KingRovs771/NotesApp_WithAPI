import { fetchToken } from "./utils";
import { BASE_URL } from "./base_url";

export async function createNote(title, body) {
  try {
    const AddResponse = await fetchToken(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, body: body }), // Pastikan ini adalah objek
    });
    return AddResponse;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

export async function getAllNotes() {
  try {
    const NotesResponse = await fetchToken(`${BASE_URL}/notes`);
    return NotesResponse; // Pastikan mengembalikan seluruh objek respons
  } catch (error) {
    console.error("Error fetching all notes:", error);
    throw error;
  }
}

export async function getNoteById(id) {
  return fetchToken(`${BASE_URL}/notes/${id}`);
}

export async function deleteNote(id) {
  return fetchToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
}

export async function archiveNote(id) {
  return fetchToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
}

export async function unarchiveNote(id) {
  return fetchToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
}
