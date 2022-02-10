import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { clearObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 500);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: clearObject(debounceParam) }).then(res => setList(res));
  }, [debounceParam]);

  useMount(() => {
    client("users", {}).then(res => setUsers(res));
  });
  return <Container>
    <h1>项目列表</h1>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list} users={users} />
  </Container>;
};
const Container = styled.div`
  padding: 3.2rem;
`;
