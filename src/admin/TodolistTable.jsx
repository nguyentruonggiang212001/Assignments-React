import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { deleteById, fetchProducts } from "../services"; 
import TodoItems from "./TodoItems";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchProducts("/todos"); 
      setTodoList(data);
    })();
  }, []);
  async function handleRemove(id) {
    if (confirm("Bạn có chắc muốn xóa công việc này không?")) {
      const res = await deleteById("/todos", id);
      if (res.status === 200) {
        const updatedTodos = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodos);
      } else {
        console.log("Error!");
      }
    }
  }
  const todoListsCount = todoList.filter((todo) => todo.status === "doing").length;
  return (
    <div>
      <h2 style={{ marginTop: "100px" }}>Quản Lý Công Việc</h2>
      <p>Công việc chưa hoàn thành: {todoListsCount}</p>
      <div>
        <Link to={`/admin/todos/add`}>
          <button>Thêm công việc mới</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {todoList.length ? (todoList.map((todo) => (
           <TodoItems key={todo.id} todo={todo} onRemove={handleRemove} />
          ))) : (<tr>
            <td colSpan={6}>Todo is empty!!!</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
