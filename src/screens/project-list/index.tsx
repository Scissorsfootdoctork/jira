import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import qs from "qs";
import { clearObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

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
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list} users={users} />
  </div>;
};
