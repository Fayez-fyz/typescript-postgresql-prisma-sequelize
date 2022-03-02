"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Home = () => {
  const [listTodo, setListTodo] = react_1.default.useState([]);
  const [inputTodo, setInputTodo] = react_1.default.useState("");
  const [updateInput, setUpdateInput] = react_1.default.useState("");
  const [uptVisible, setUptVisible] = react_1.default.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setListTodo([...listTodo, inputTodo]);
    setInputTodo("");
    console.log(listTodo);
  };
  const fetchEdit = (i) => {
    setUptVisible(true);
    setUpdateInput(listTodo[i]);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setListTodo(
      listTodo.indexOf(updateInput) !== -1
        ? listTodo.map((item) => (item === updateInput ? updateInput : item))
        : [...listTodo, updateInput]
    );
  };
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>TODO APP</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {uptVisible ? (
            <>
              <form onSubmit={handleUpdate}>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Add your todo"
                    className="form-control"
                    value={updateInput}
                    onChange={(e) => setUpdateInput(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    UPDATE
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Add your todo"
                    className="form-control"
                    value={inputTodo}
                    onChange={(e) => setInputTodo(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    ADD
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ol className="list-group list-group-numbered w-50 my-2">
            {listTodo.map((todo, i) => (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{todo}</div>
                  </div>
                  <span
                    className="badge bg-primary rounded-pill mx-2"
                    onClick={() => fetchEdit(i)}
                  >
                    Edit
                  </span>
                  <span className="badge bg-danger rounded-pill">Delete</span>
                </li>
              </>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
exports.default = Home;
