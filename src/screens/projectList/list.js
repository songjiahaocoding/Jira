export const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Supervisor</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "None"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
