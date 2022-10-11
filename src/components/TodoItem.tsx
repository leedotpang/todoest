type TodoItem = {
  handleDelete: () => void;
  handleUpdate: (d: string) => void;
  toggleStatus: (s: "done" | "active") => void;
  todoId: string;
  description: string;
  status: string;
};

const TodoItem = ({
  description,
  status,
  handleDelete,
  handleUpdate,
  toggleStatus,
}: TodoItem) => {
  return (
    <section className="flex justify-between duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 bg-white group">
      <div
        className="flex place-items-center p-3"
        onClick={() => toggleStatus(status === "done" ? "active" : "done")}
      >
        <span className="p-2 border-2 border-slate-500 cursor-pointer opacity-20 text-black relative">
          <span className="absolute left-0 -top-1">
            {status === "done" && "✔️"}
          </span>
        </span>
      </div>
      <input
        className={`p-4 text-2xl text-slate-700 focus:outline-slate-500 ${
          status === "done" ? "line-through" : ""
        }`}
        defaultValue={description}
        onChange={(e) => handleUpdate(e.target.value)}
      />
      <button
        className="px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        onClick={handleDelete}
      >
        ❌
      </button>
    </section>
  );
};

export default TodoItem;
