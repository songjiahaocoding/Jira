import { User } from "./searchPanel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

type PropsType = Omit<ListProps, "users">;
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Department",
          dataIndex: "organization",
        },
        {
          title: "Supervisor",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "None"}
              </span>
            );
          },
        },
        {
          title: "Create Time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "None"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
