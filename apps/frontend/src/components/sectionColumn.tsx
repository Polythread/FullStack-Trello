import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../api/issues";

export const SectionColumn = ({ section, index, sections, ws }) => {
  const issueQuery = useQuery({
    queryFn: () => getIssues(section.id),
    queryKey: ["issues", section.id],
  });

  const prevSection = sections[index - 1];
  const nextSection = sections[index + 1];

  const moveIssue = (issueId: string, toSectionId: string) => {
    ws?.send(
      JSON.stringify({
        event: "MOVE_ISSUE",
        data: { issueId, fromSectionId: section.id, toSectionId },
      }),
    );
  };

  return (
    <div className="flex-1">
      <h3>{section.titl}</h3>
      {issueQuery.data?.issues?.map((i) => (
        <div key={i.id}>
          <button
            className="border-2 px-0.5 mx-0.5"
            disabled={!prevSection}
            onClick={() => moveIssue(i.id, prevSection.id)}
          >
            &lArr
          </button>
          {i.title} - {i.description}
          <button
            className="border-2 px-0.5 mx-0.5"
            disabled={!nextSection}
            onClick={() => moveIssue(i.id, nextSection.id)}
          >
            &rArr
          </button>
        </div>
      ))}
    </div>
  );
};
