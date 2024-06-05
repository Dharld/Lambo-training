/* eslint-disable react/prop-types */
import Tab from "../Tab/Tab";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="container mx-auto py-2 border-b border-b-slate-100 flex justify-center">
      <ul className="flex gap-12 text-slate-500 text-lg">
        {tabs.map((tab) => (
          <Tab
            title={tab.title}
            key={tab.index}
            isActive={activeTab === tab.index}
          />
        ))}
      </ul>
    </div>
  );
}
