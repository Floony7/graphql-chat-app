import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

type MessageType = {
  id: string;
  user: string;
  content: string;
};

type NewMessageType = Omit<MessageType, "id">;

export const Chat = () => {
  const [messageState, setMessageState] = useState<NewMessageType>({
    user: "Fred",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const handleSendMessage = () => {
    if (messageState.content.length > 0) {
      postMessage({ variables: messageState });
    }
    setMessageState({ ...messageState, content: "" });
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-4xl mb-6">I'm a Chat window</h1>
      <div className="flex w-9/12 justify-center">
        <input
          className="rounded p-3 me-4 w-2/12 text-black"
          name="user"
          value={messageState.user}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageState({ ...messageState, user: e.target.value })
          }
        />
        <input
          className="rounded p-3 w-8/12 min-w-60 text-black"
          name="user"
          value={messageState.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageState({ ...messageState, content: e.target.value })
          }
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
        />
      </div>
      <Messages currentUser={messageState.user} />
    </section>
  );
};

function Messages({ currentUser }: { currentUser: string }) {
  const { data } = useQuery(GET_MESSAGES);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user, content }: MessageType) => (
        <div
          key={id}
          style={{
            display: "flex",
            justifyContent: currentUser === user ? "flex-end" : "flex-start",
          }}
        >
          {user !== currentUser && (
            <div className="chatbox__circle">
              {user.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === currentUser ? "green" : "crimson",
              color: "white",
              padding: "0.5rem",
              borderRadius: "1rem",
              maxWidth: "60%",
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
}
