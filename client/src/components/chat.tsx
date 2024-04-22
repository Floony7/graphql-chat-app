import { useQuery, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      user
      content
    }
  }
`;

export const Chat = () => {
  return (
    <section>
      <h1>I'm a Chat window</h1>
      <Messages currentUser="Fred" />
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
      {data.messages.map(
        ({
          id,
          user,
          content,
        }: {
          id: string;
          user: string;
          content: string;
        }) => (
          <div
            key={id}
            style={{
              display: "flex",
              justifyContent: currentUser === user ? "flex-end" : "flex-start",
            }}
          >
            <p>{content}</p>
          </div>
        )
      )}
    </>
  );
}
