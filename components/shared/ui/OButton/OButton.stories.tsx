import OButton from "./OButton";

export default {
  title: "Shared/UI/OButton",
  component: OButton,
};

export const OButtonPage = () => (
  <div className="flex justify-center items-center h-screen">
    <OButton>Button Text</OButton>
  </div>
);
