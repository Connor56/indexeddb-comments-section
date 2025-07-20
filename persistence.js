// Exported variables for interacting with the database in other modules
export let db;
export const storeName = "comments";

const dbName = "CommentsDB";

// Request to open the database
// The `window` part is not required, but it's good practice as it avoids aliasing,
// and keeps the namespace clean.
const request = window.indexedDB.open(dbName, 1);

// Handle database creation or version upgrade
request.onupgradeneeded = (event) => {
  console.log("Database upgrade needed.");
  db = event.target.result;

  // Create an object store if it doesn't already exist
  if (!db.objectStoreNames.contains(storeName)) {
    // We use 'id' as our keyPath and enable autoIncrement
    const objectStore = db.createObjectStore(storeName, {
      keyPath: "id",
      autoIncrement: true,
    });

    // You can create indexes here for faster searching
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("timestamp", "timestamp", { unique: false });

    console.log('Object store "comments" created!');
  }
};

// Handle errors
request.onerror = (event) => {
  console.error("Database error:", event.target.error);
};

// Handle success - this runs after onupgradeneeded (if it runs)
request.onsuccess = (event) => {
  console.log("Database opened successfully!");
  db = event.target.result;
  // We'll load the comments here later
};

// NEW: Function to add a comment to the DB
export function addComment(comment) {
  // Start a "readwrite" transaction
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);

  // Add the new comment object to the store
  const request = objectStore.add(comment);

  request.onsuccess = () => {
    console.log("Comment added to the database!");
    // We will refresh the displayed comments later
  };

  request.onerror = (event) => {
    console.error("Error adding comment:", event.target.error);
  };
}
