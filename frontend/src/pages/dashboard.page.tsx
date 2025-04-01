import React, { FC, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";
import { RouteComponentProps } from "@reach/router";
import { UserCard } from "../components/users/user-card";
import { IUserProps } from "../dtos/user.dto";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [isLoding, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await backendClient.getAllUsers(page, query);
      console.log(result);
      setUsers(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const goToNextPage = () => {
    console.log("already clicked");
    setPage((prev) => prev + 1);
    console.log(page);
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isLoding ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <div>
            {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
          </div>
        )}
      </div>
      <button onClick={goToNextPage}>next page</button>
    </div>
  );
};
