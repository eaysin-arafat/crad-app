/* eslint-disable react/prop-types */
export default function AddPost({
  title,
  body,
  setTitle,
  setBody,
  handleSubmit,
}) {
  return (
    <div>
      <h2>Add Post</h2>
      <form action="" className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input
            className="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="body">
          Body
          <textarea
            className="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
