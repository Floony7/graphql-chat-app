import { useQuery, gql } from "@apollo/client";
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

  return (
    <section>
      <h1>I'm a Chat window</h1>
      <input
        className="chatbox__user-form"
        name="user"
        value={messageState.user}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessageState({ ...messageState, user: e.target.value })
        }
      />
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
