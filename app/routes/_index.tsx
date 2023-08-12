import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "My padel matches" },
    { name: "description", content: "Database for my padel matches" },
  ];
};

export default function Index() {
  return <div className="text-red-500">hoi</div>;
}
