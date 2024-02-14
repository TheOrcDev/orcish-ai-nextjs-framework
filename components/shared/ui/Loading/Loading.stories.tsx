import Loading from "./Loading";

export default {
  title: "Shared/UI/Loading",
  component: Loading,
};

export const LoadingPage = () => (
  <div className="flex justify-center items-center h-screen">
    <Loading />
  </div>
);
