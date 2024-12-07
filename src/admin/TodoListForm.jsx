import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { createNew, getById, updateById } from "../services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaAddTodo } from "../schemas/addtodolistShema";



const TodoListForm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schemaAddTodo),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getById("/todos", id);
        // console.log(data);
        reset(data);
      })();
    }
  }, [id]);

  const handleAddTodo = async (todo) => {
    console.log(1);
    // console.log(todo);
    let confirmMessage = "";

    if (id) {
      // Logic cập nhật công việc
      confirmMessage = "Bạn có chắc chắn muốn cập nhật công việc này?";
      const data = await updateById("/todos", id, todo);
      console.log(data);
    } else {
      // Logic thêm mới công việc
      confirmMessage = "Bạn có chắc chắn muốn thêm mới công việc này?";
      const data = await createNew("/todos", todo);
      console.log(data);
    }
    if (confirm(confirmMessage)) {
      nav("/admin/todos");
    } else {
      reset();
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn reset form này ko ?")) {
      reset();
    }
  };

  return (
    <div className="form-update">
      <h1 className="header-update">
        {id ? "Cập nhật" : "Thêm mới"} Công Việc
      </h1>
      <form onSubmit={handleSubmit(handleAddTodo)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title?.message}</p>}

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          {...register("description")}
          rows="5"
        ></textarea>

         <label htmlFor="status">Status</label>
         <select name="status" id="status" {...register("status")} defaultValue="doing">
         <option value="doing">Doing</option>
        <option value="done">Done</option>
         </select>

         <label htmlFor="priority">Priority</label>
         <select name="priority" id="todos" {...register("priority")} defaultValue="Low">
         <option value="Low">Low</option>
         <option value="Medium">Medium</option>
         <option value="High">High</option>
         </select>

        <div className="button-group" style={{textAlign:"left"}}>
          <button style={{ backgroundColor: "green",margin:"0px",marginRight:"5px" }} type="submit" onClick={handleSubmit}>
            {id ? "Update" : "Add"}
          </button>
          <button
          type="button"
            style={{ backgroundColor: "gray",margin:"0px"  }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoListForm;
