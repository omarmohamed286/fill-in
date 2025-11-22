import { useState, type FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@shared/firebaseConfig";

const AddLessonForm = () => {
  const [category, setCategory] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!category.trim() || !lessonName.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await addDoc(collection(db, `categories/${category}/lessons`), {
        name: lessonName,
        createdAt: new Date(),
      });

      setMessage("Lesson added successfully!");
      setCategory("");
      setLessonName("");
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
          Add New Lesson
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-light-cyan"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Enter category"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="lessonName"
              className="text-sm font-medium text-light-cyan"
            >
              Lesson Name
            </label>
            <input
              id="lessonName"
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="bg-primary border border-secondary/30 rounded-md px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Enter Lesson Name"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-secondary text-primary font-bold py-3 px-6 rounded-md hover:bg-light-cyan transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Lesson"}
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
};

export default AddLessonForm;
