// src/index.js
import { getAllNotes, createNote, deleteNote } from "./notes-api.js";
import { showLoading, hideLoading } from "./loading.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteListElement = document.getElementById("notes-list");
  const addNoteForm = document.getElementById("add-note-form");

  async function renderNotes() {
    showLoading();
    try {
      const response = await getAllNotes();
      console.log("Response FROM getAllNotes", response);
      const { status, message, data } = response;

      if (status !== "success") {
        throw new Error(message || "Failed to fetch notes");
      }

      noteListElement.innerHTML = "";
      data.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-item");
        listItem.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <button class="delete-button" data-id="${note.id}">Delete</button>
        `;
        noteListElement.appendChild(listItem);
      });
    } catch (error) {
      alert(`Failed to fetch notes: ${error.message}`);
    } finally {
      hideLoading();
    }
  }

  addNoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title && body) {
      showLoading();
      console.log(
        "Data yang dikirim :",
        JSON.stringify({ title: title, body: body }),
      );
      try {
        const response = await createNote(title, body);
        const { status, message, data } = response;

        if (status !== "success") {
          throw new Error(message || "Failed to add note");
        }

        titleInput.value = "";
        bodyInput.value = "";
        await renderNotes();
      } catch (error) {
        alert(`Failed to add note: ${error.message}`);
      } finally {
        hideLoading();
      }
    } else {
      alert("Title and body cannot be empty.");
    }
  });

  noteListElement.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
      const noteId = event.target.dataset.id;
      if (confirm("Are you sure you want to delete this note?")) {
        showLoading();
        try {
          const response = await deleteNote(noteId);
          const { status, message } = response;

          if (status !== "success") {
            throw new Error(message || "Failed to delete note");
          }

          await renderNotes();
        } catch (error) {
          alert(`Failed to delete note: ${error.message}`);
        } finally {
          hideLoading();
        }
      }
    }
  });

  renderNotes(); // Load notes on page load
});
