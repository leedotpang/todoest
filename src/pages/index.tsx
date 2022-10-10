import { Todo } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useQueryClient } from "react-query";
import { trpc } from "../utils/trpc";
import useTodoSession from "../utils/useTodoSession";

const byActive = (a: Todo, b: Todo) => (a.status > b.status ? 1 : -1);

const Home: NextPage = () => {
  const { userId, sendToLogout } = useTodoSession();
  const queryClient = useQueryClient();

  const updateOnSuccess = {
    onSuccess: () => {
      queryClient.invalidateQueries("todo.getAll");
    },
  };

  const createTodo = trpc.useMutation(
    "todo.create",
    updateOnSuccess
  ).mutateAsync;
  const updateTodo = trpc.useMutation(
    "todo.update",
    updateOnSuccess
  ).mutateAsync;
  const deleteTodo = trpc.useMutation(
    "todo.delete",
    updateOnSuccess
  ).mutateAsync;

  const todos = trpc.useQuery(["todo.getAll"]);

  const handleTodoAdd = async (input: HTMLInputElement) => {
    const description = input.value;

    try {
      await createTodo({
        description,
        userId,
      });
      input.value = "";
    } catch (e) {
      console.error(e);
      alert("There was an error adding the todo item.");
    }
  };

  return (
    <>
      <Head>
        <title>Todoest</title>
        <meta name="description" content="Lee's T3 Stack Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <button
          className="absolute top-5 right-10 p-2 bg-blue-500 rounded w-24"
          onClick={() => sendToLogout()}
        >
          Logout
        </button>
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-white mb-10">
          My <span className="text-slate-900">Todo</span> App
        </h1>
        <div className="border-2 border-gray-500 rounded shadow-xl w-96 mb-4">
          <input
            className="p-4 text-2xl text-slate-700 focus:outline-slate-500 w-full"
            placeholder="Add a new todo"
            onKeyDown={(e) =>
              e.key === "Enter" && handleTodoAdd(e.target as HTMLInputElement)
            }
          />
        </div>
        {todos.data?.sort(byActive).map(({ id, description, status }) => (
          <TodoItem
            todoId={id}
            description={description}
            key={`todo-${id}`}
            status={status}
            handleDelete={() => deleteTodo({ id })}
            handleUpdate={(updatedDescription) =>
              updateTodo({ id, description: updatedDescription })
            }
            toggleStatus={(updatedStatus) =>
              updateTodo({ id, status: updatedStatus })
            }
          />
        ))}
      </main>
    </>
  );
};

export default Home;

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
          status === "done" && "line-through"
        }`}
        defaultValue={description}
        onChange={(e) => handleUpdate(e.target.value)}
      />
      <button
        className="px-3  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        onClick={handleDelete}
      >
        ❌
      </button>
    </section>
  );
};
