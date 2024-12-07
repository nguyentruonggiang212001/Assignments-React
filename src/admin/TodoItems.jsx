/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const TodoItems = ({ todo, onRemove }) => {
  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>
        <button
          style={{
            margin: '0px',
            backgroundColor: todo.status === 'done' ? 'green' : 'red', 
          }}
        >
          {todo.status === 'done' ? 'Done' : 'Doing'}
        </button>
      </td>
      <td>{todo.priority}</td>
      <td>
        <div className="action-buttons">
          <button
            style={{ background: 'red', margin: '0px' }}
            onClick={() => onRemove(todo.id)}
          >
            Remove
          </button>
          <Link to={`/admin/todos/update/${todo.id}`}>
            <button style={{ background: 'yellow', color: 'black', margin: '0px' }}>
              Update
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default TodoItems;
