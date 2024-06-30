import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotification } from "../contexts/notificationContext";

const AnecdoteForm = () => {
  const { dispatch: notificationDispatch } = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_ERROR",
        payload: error.response.data.error,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });
  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    if (content.length < 5) {
      notificationDispatch({
        type: "SET_ERROR",
        payload: "Anecdote must be at least 5 characters long",
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      return;
    }

    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `You created '${content}'`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
