import { useState, type FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@shared/firebaseConfig";

export default function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryImg.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await addDoc(collection(db, "categories"), {
        name: categoryName,
        image: categoryImg,
        createdAt: new Date(),
      });

      setMessage("Category added successfully!");
      setCategoryName("");
      setCategoryImg("");
    } catch (error) {
      setMessage("Error adding category: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex justify-center mt-10">
      <div className="w-full max-w-md bg-[#1a2332] rounded-lg shadow-2xl p-8 border border-secondary/20">
        <p className="text-2xl font-elms font-bold text-secondary mb-6">
          Add New Category
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-light-cyan"
            >
              Category Name
            </label>
            <input
              id="category"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Enter category name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="categoryImg"
              className="text-sm font-medium text-light-cyan"
            >
              Category Image URL
            </label>
            <input
              id="categoryImg"
              type="text"
              value={categoryImg}
              onChange={(e) => setCategoryImg(e.target.value)}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Enter image URL"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-secondary text-primary font-bold py-3 px-6 rounded-md hover:bg-light-cyan transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </button>

          {message && (
            <p
              className={`text-sm text-center ${
                message.includes("Error") ? "text-red-400" : "text-secondary"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
