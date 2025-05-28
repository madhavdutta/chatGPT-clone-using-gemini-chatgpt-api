import { FiImage, FiEdit, FiFileText, FiUsers } from 'react-icons/fi';

const FeatureButtons = () => {
  return (
    <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
      <FeatureButton icon={<FiImage />} label="Create Images" />
      <FeatureButton icon={<FiEdit />} label="Edit Image" />
      <FeatureButton icon={<FiFileText />} label="Latest News" />
      <FeatureButton icon={<FiUsers />} label="Personas" />
      <FeatureButton icon={<FiUsers />} label="Workspaces" isNew />
    </div>
  );
};

const FeatureButton = ({ icon, label, isNew = false }) => {
  return (
    <button className="flex items-center px-3 py-2 bg-input border border-divider rounded-lg hover:bg-hover transition-colors whitespace-nowrap">
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
      {isNew && (
        <span className="ml-1 text-xs bg-primary-color text-white px-1.5 rounded-full">
          New
        </span>
      )}
    </button>
  );
};

export default FeatureButtons;
