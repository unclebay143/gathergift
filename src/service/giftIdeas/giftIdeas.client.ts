import type { GiftIdea } from "@/types/giftIdea";

const BASE_URL = "/api/giftIdeas";

export const addGiftIdea = async (giftIdeaData: GiftIdea) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(giftIdeaData),
  });
  if (!response.ok) {
    throw new Error("Error adding gift");
  }
  return response.json();
};

export const editGiftIdea = async (id: string, giftIdeaData: GiftIdea) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(giftIdeaData),
  });
  if (!response.ok) {
    throw new Error("Error updating gift idea");
  }
  return response.json();
};

export const deleteGiftIdea = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error deleting gift idea");
  }
  return response.json();
};
