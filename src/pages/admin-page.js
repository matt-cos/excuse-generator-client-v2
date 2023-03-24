import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getAdminResource, addExcuse } from "../services/message.service";

export const AdminPage = () => {
  const [message, setMessage] = useState("");
  const [newExcuse, setNewExcuse] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getAdminResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  async function handleSubmit(e) {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();

    const { data, error } = await addExcuse(accessToken, {
      excuse: newExcuse,
      email: user.email,
    });

    if (error) {
      toast({
        title: "Uh oh.",
        description: "Something went wrong. Try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Thanks.",
      description: "Your excuse has been submitted.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Admin Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves an <strong>admin message</strong> from an
              external API.
            </span>
          </p>
          <form onSubmit={handleSubmit} action="/excuses/add">
            <label htmlFor="new-excuse">Submit your excuse:</label>
            <br />
            <textarea
              type="text"
              id="new-excuse"
              name="new-excuse"
              onChange={(e) => setNewExcuse(e.target.value)}
              value={newExcuse}
            />
            <br />
            <button>Submit</button>
          </form>
          <CodeSnippet title="Admin Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};
